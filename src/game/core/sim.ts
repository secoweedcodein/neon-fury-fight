// Simulación determinista de movimiento (FASE 1).
// Tick fijo, sin acceso a DOM ni a Three.js: reutilizable en el servidor.

import { getCharacter } from "../data/characters";
import {
  EMPTY_INTENT,
  STAGE_BOUNDS,
  TICK_DT,
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
  };
}

export function createMatchState(charA: string, charB: string): MatchState {
  return {
    tick: 0,
    fighters: [createFighter("p1", charA, -4), createFighter("p2", charB, 4)],
  };
}

const DODGE_TICKS = 16;
const DODGE_COOLDOWN_TICKS = 34;
const STAMINA_REGEN_PER_SEC = 18;

function damp(value: number, k: number, dt: number) {
  return value * Math.exp(-k * dt);
}

function stepFighter(f: FighterState, intent: InputIntent, opponent: FighterState) {
  const { movement: m, maxStamina } = getCharacter(f.characterId);

  // Orientación de combate: siempre mirando al rival mientras se está en suelo.
  if (f.grounded && Math.abs(opponent.x - f.x) > 0.15) {
    f.facing = opponent.x > f.x ? 1 : -1;
  }

  if (f.dodgeCooldown > 0) f.dodgeCooldown--;
  if (f.dodgeTicks > 0) f.dodgeTicks--;

  f.crouching = intent.crouch && f.grounded && f.dodgeTicks === 0;

  // Esquiva: impulso corto en la dirección de entrada, cuesta stamina.
  const canDodge =
    intent.dodge && f.grounded && f.dodgeTicks === 0 && f.dodgeCooldown === 0 && f.stamina >= m.dodgeStamina;
  if (canDodge) {
    const dirX = intent.forward !== 0 ? Math.sign(intent.forward) * f.facing : -f.facing;
    const dirZ = Math.sign(intent.lateral);
    f.vx = dirX * m.dodgeImpulse * (dirZ !== 0 ? 0.6 : 1);
    f.vz = dirZ * m.dodgeImpulse * 0.7;
    f.stamina -= m.dodgeStamina;
    f.dodgeTicks = DODGE_TICKS;
    f.dodgeCooldown = DODGE_COOLDOWN_TICKS;
  }

  const locked = f.dodgeTicks > 0;
  const speedScale = f.crouching ? 0.45 : 1;

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
    f.vx = damp(f.vx, 5.5, TICK_DT);
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
  if (!canDodge) {
    f.stamina = Math.min(maxStamina, f.stamina + STAMINA_REGEN_PER_SEC * TICK_DT);
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

export function stepMatch(state: MatchState, intents: [InputIntent, InputIntent]) {
  const [a, b] = state.fighters;
  stepFighter(a, intents[0] ?? EMPTY_INTENT, b);
  stepFighter(b, intents[1] ?? EMPTY_INTENT, a);
  resolveOverlap(a, b);
  state.tick++;
  return state;
}
