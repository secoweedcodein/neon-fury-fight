// IA dummy para poder probar el combate en local (FASE 2/3).
// Sencilla y determinista salvo por un RNG con semilla propia.

import type { FighterState, InputIntent } from "../core/types";
import { EMPTY_INTENT } from "../core/types";

export type AiLevel = "idle" | "easy" | "normal";

export class DummyAI {
  private seed = 1337;
  private cooldown = 0;

  constructor(private level: AiLevel = "normal") {}

  private rand() {
    this.seed = (this.seed * 1664525 + 1013904223) >>> 0;
    return this.seed / 0xffffffff;
  }

  think(self: FighterState, foe: FighterState): InputIntent {
    if (this.level === "idle") return EMPTY_INTENT;
    const intent: InputIntent = { ...EMPTY_INTENT };
    const dist = Math.abs(foe.x - self.x);

    if (self.hitstun > 0 || self.action) return intent;
    if (this.cooldown > 0) this.cooldown--;

    // Acercarse / mantener distancia
    if (dist > 1.9) intent.forward = 1;
    else if (dist < 1.0) intent.forward = -1;

    const r = this.rand();
    const aggression = this.level === "easy" ? 0.015 : 0.038;

    if (dist < 1.8 && this.cooldown === 0 && r < aggression) {
      if (r < aggression * 0.4) intent.light = true;
      else if (r < aggression * 0.7) intent.kick = true;
      else if (r < aggression * 0.9) intent.heavy = true;
      else intent.grab = true;
      this.cooldown = this.level === "easy" ? 80 : 42;
    } else if (dist < 2.4 && r > 0.72) {
      // Guardia pasiva
      intent.forward = -1;
    }

    if (r > 0.995 && dist < 2.2) intent.dodge = true;

    return intent;
  }
}
