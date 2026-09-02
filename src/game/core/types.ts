// Tipos base de la simulación. Sin dependencias de render: esta capa puede
// ejecutarse igual en el cliente (predicción) y en el servidor (autoridad).

export type Facing = 1 | -1;

export interface InputIntent {
  /** -1 atrás, +1 adelante (relativo al enfrentamiento) */
  forward: number;
  /** -1 / +1 desplazamiento lateral en profundidad */
  lateral: number;
  jump: boolean;
  dodge: boolean;
  crouch: boolean;
}

export const EMPTY_INTENT: InputIntent = {
  forward: 0,
  lateral: 0,
  jump: false,
  dodge: false,
  crouch: false,
};

export interface FighterState {
  id: string;
  characterId: string;
  /** eje principal del combate (izquierda/derecha en cámara lateral) */
  x: number;
  /** profundidad (movimiento lateral corto) */
  z: number;
  /** altura */
  y: number;
  vx: number;
  vz: number;
  vy: number;
  facing: Facing;
  grounded: boolean;
  crouching: boolean;
  /** ticks restantes de i-frames / desplazamiento de esquiva */
  dodgeTicks: number;
  dodgeCooldown: number;
  health: number;
  stamina: number;
}

export interface MatchState {
  tick: number;
  fighters: [FighterState, FighterState];
}

export const TICK_RATE = 60;
export const TICK_DT = 1 / TICK_RATE;

/** Límites del área jugable (se sobreescriben por mapa en la FASE 5). */
export const STAGE_BOUNDS = { x: 13, z: 2.6 };
