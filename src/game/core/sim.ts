// Simulación determinista de movimiento, combate y rounds (FASES 1-3).
// Tick fijo, sin acceso a DOM ni a Three.js: reutilizable en el servidor.

import { getCharacter } from "../data/characters";
import { startAttack, stepCombat } from "../combat/resolve";
import {
  EMPTY_INTENT,
  INTRO_TICKS,
  ROUND_END_TICKS,
  ROUND_SECONDS,
  ROUNDS_TO_WIN,
  STAGE_BOUNDS,
  TICK_DT,
  TICK_RATE,
  type FighterState,
  type InputIntent,
  type MatchState,
} from "./types";

export function createFighter(id: string, characterId: string, x: number): FighterState {
  const char = getCharacter(characterId);
  return {
    id,
    characterId,
    x,
    z: 0,
    y: 0,
    vx: 0,
    vz: 0,
    vy: 0,
    facing: x <= 0 ? 1 : -1,
    grounded: true,
    crouching: false,
    dodgeTicks: 0,
    dodgeCooldown: 0,
    health: char.maxHealth,
    stamina: char.maxStamina,
    action: null,
    hitstun: 0,
    blockstun: 0,
    blocking: false,
    guardBroken: 0,
    comboCount: 0,
    comboTimer: 0,
    flash: 0,
    attackBuffer: null,
    bufferTicks: 0,
  };
}

export function createMatchState(charA: string, charB: string): MatchState {
  return {
    tick: 0,
    fighters: [createFighter("p1", charA, -4), createFighter("p2", charB, 4)],
    phase: "intro",
    phaseTicks: INTRO_TICKS,
    round: 1,
    wins: [0, 0],
    timer: ROUND_SECONDS * TICK_RATE,
    lastRoundWinner: -1,
    announce: "ROUND 1",
    events: [],
  };
}

const DODGE_TICKS = 16;
const DODGE_COOLDOWN_TICKS = 34;
const STAMINA_REGEN_PER_SEC = 18;
const BUFFER_TICKS = 12;

function damp(value: number, k: number, dt: number) {
  return value * Math.exp(-k * dt);
}

function pickAttack(intent: InputIntent): string | null {
  if (intent.heavy) return "heavy";
  if (intent.kick) return "kick";
  if (intent.grab) return "grab";
  if (intent.light) return "light";
  return null;
}

function stepFighter(f: FighterState, intent: InputIntent, opponent: FighterState, canAct: boolean) {
  const { movement: m, maxStamina } = getCharacter(f.characterId);

  // Orientación de combate: siempre mirando al rival mientras se está en suelo.
  if (f.grounded && Math.abs(opponent.x - f.x) > 0.15) {
    f.facing = opponent.x > f.x ? 1 : -1;
  }

  if (f.dodgeCooldown > 0) f.dodgeCooldown--;
  if (f.dodgeTicks > 0) f.dodgeTicks--;
  if (f.hitstun > 0) f.hitstun--;
  if (f.blockstun > 0) f.blockstun--;
  if (f.guardBroken > 0) f.guardBroken--;
  if (f.bufferTicks > 0) {
    f.bufferTicks--;
    if (f.bufferTicks === 0) f.attackBuffer = null;
  }
  if (f.comboTimer > 0) {
    f.comboTimer--;
    if (f.comboTimer === 0) f.comboCount = 0;
  }
  if (f.flash > 0) f.flash--;

  const stunned = f.hitstun > 0 || f.blockstun > 0;
  const busy = !canAct || stunned || f.action !== null;

  // Buffer de ataque
  const wanted = pickAttack(intent);
  if (wanted && canAct && !stunned) {
    if (!f.action) {
      startAttack(f, wanted);
    } else {
      f.attackBuffer = wanted;
      f.bufferTicks = BUFFER_TICKS;
    }
  }

  f.crouching = !busy && intent.crouch && f.grounded && f.dodgeTicks === 0;

  // Bloqueo: retroceder sin atacar en el suelo.
  f.blocking = !busy && f.grounded && intent.forward < 0 && f.dodgeTicks === 0;

  // Esquiva: impulso corto en la dirección de entrada, cuesta stamina.
  const canDodge =
    !busy &&
    intent.dodge &&
    f.grounded &&
    f.dodgeTicks === 0 &&
    f.dodgeCooldown === 0 &&
    f.stamina >= m.dodgeStamina;
  if (canDodge) {
    const dirX = intent.forward !== 0 ? Math.sign(intent.forward) * f.facing : -f.facing;
    const dirZ = Math.sign(intent.lateral);
    f.vx = dirX * m.dodgeImpulse * (dirZ !== 0 ? 0.6 : 1);
    f.vz = dirZ * m.dodgeImpulse * 0.7;
    f.stamina -= m.dodgeStamina;
    f.dodgeTicks = DODGE_TICKS;
    f.dodgeCooldown = DODGE_COOLDOWN_TICKS;
  }

  const locked = f.dodgeTicks > 0 || busy;
  const speedScale = f.crouching ? 0.45 : f.blocking ? 0.6 : 1;

  if (!locked) {
    // Aceleración: adelante = hacia el rival.
    const wishX = intent.forward * f.facing;
    const maxX = (intent.forward >= 0 ? m.maxForward : m.maxBackward) * speedScale;
    if (wishX !== 0) {
      f.vx += wishX * m.accel * TICK_DT;
      f.vx = Math.max(-maxX, Math.min(maxX, f.vx));
    } else {
      f.vx = damp(f.vx, m.drag, TICK_DT);
    }

    if (intent.lateral !== 0) {
      f.vz += intent.lateral * m.accel * 0.7 * TICK_DT;
      const maxZ = m.maxLateral * speedScale;
      f.vz = Math.max(-maxZ, Math.min(maxZ, f.vz));
    } else {
      f.vz = damp(f.vz, m.drag, TICK_DT);
    }

    if (intent.jump && f.grounded && !f.crouching) {
      f.vy = m.jumpVelocity;
      f.grounded = false;
    }
  } else {
    f.vx = damp(f.vx, stunned ? 7 : 5.5, TICK_DT);
    f.vz = damp(f.vz, 5.5, TICK_DT);
  }

  // Gravedad / caída
  if (!f.grounded) {
    f.vy -= m.gravity * TICK_DT;
  }

  f.x += f.vx * TICK_DT;
  f.z += f.vz * TICK_DT;
  f.y += f.vy * TICK_DT;

  if (f.y <= 0) {
    f.y = 0;
    f.vy = 0;
    f.grounded = true;
  }

  // Límites del escenario
  f.x = Math.max(-STAGE_BOUNDS.x, Math.min(STAGE_BOUNDS.x, f.x));
  f.z = Math.max(-STAGE_BOUNDS.z, Math.min(STAGE_BOUNDS.z, f.z));

  // Regeneración de stamina al no gastar
  if (!canDodge && !f.action) {
    const rate = f.blocking ? STAMINA_REGEN_PER_SEC * 0.4 : STAMINA_REGEN_PER_SEC;
    f.stamina = Math.min(maxStamina, f.stamina + rate * TICK_DT);
  }
}

/** Empuje suave para que los luchadores no se solapen. */
function resolveOverlap(a: FighterState, b: FighterState) {
  const minDist = 1.1;
  const d = b.x - a.x;
  const dist = Math.abs(d);
  if (dist < minDist && Math.abs(a.y - b.y) < 1.4) {
    const push = (minDist - dist) / 2;
    const dir = d === 0 ? 1 : Math.sign(d);
    a.x -= dir * push;
    b.x += dir * push;
  }
}

function resetForRound(state: MatchState) {
  const [a, b] = state.fighters;
  const na = createFighter(a.id, a.characterId, -4);
  const nb = createFighter(b.id, b.characterId, 4);
  Object.assign(a, na);
  Object.assign(b, nb);
  state.timer = ROUND_SECONDS * TICK_RATE;
  state.events.length = 0;
}

function endRound(state: MatchState, winner: number, reason: string) {
  state.lastRoundWinner = winner;
  if (winner === 0 || winner === 1) {
    state.wins[winner]++;
  }
  state.announce = winner === -1 ? "DRAW" : reason;
  const matchOver = state.wins[0] >= ROUNDS_TO_WIN || state.wins[1] >= ROUNDS_TO_WIN;
  state.phase = matchOver ? "matchEnd" : "roundEnd";
  state.phaseTicks = ROUND_END_TICKS;
}

export function stepMatch(state: MatchState, intents: [InputIntent, InputIntent]) {
  const [a, b] = state.fighters;
  state.events.length = 0;

  if (state.phase === "intro") {
    state.phaseTicks--;
    stepFighter(a, EMPTY_INTENT, b, false);
    stepFighter(b, EMPTY_INTENT, a, false);
    if (state.phaseTicks <= 0) {
      state.phase = "fight";
      state.announce = "FIGHT!";
      state.phaseTicks = TICK_RATE;
    }
    state.tick++;
    return state;
  }

  if (state.phase === "roundEnd" || state.phase === "matchEnd") {
    state.phaseTicks--;
    stepFighter(a, EMPTY_INTENT, b, false);
    stepFighter(b, EMPTY_INTENT, a, false);
    if (state.phaseTicks <= 0 && state.phase === "roundEnd") {
      state.round++;
      resetForRound(state);
      state.phase = "intro";
      state.phaseTicks = INTRO_TICKS;
      state.announce = `ROUND ${state.round}`;
    }
    state.tick++;
    return state;
  }

  // fight
  if (state.phaseTicks > 0) state.phaseTicks--; // desvanece el "FIGHT!"
  stepFighter(a, intents[0] ?? EMPTY_INTENT, b, true);
  stepFighter(b, intents[1] ?? EMPTY_INTENT, a, true);

  for (const e of stepCombat(state, a, b)) state.events.push(e);
  for (const e of stepCombat(state, b, a)) state.events.push(e);

  resolveOverlap(a, b);

  if (state.timer > 0) state.timer--;

  const aDead = a.health <= 0;
  const bDead = b.health <= 0;
  if (aDead || bDead) {
    endRound(state, aDead && bDead ? -1 : aDead ? 1 : 0, "K.O.");
  } else if (state.timer <= 0) {
    const winner = a.health === b.health ? -1 : a.health > b.health ? 0 : 1;
    endRound(state, winner, "TIME UP");
  }

  state.tick++;
  return state;
}
