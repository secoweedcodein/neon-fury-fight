// HUD de la FASE 1: vida (placeholder), stamina real y estado de depuración.

import { useEffect, useRef, useState } from "react";
import type { MatchState } from "../../game/core/types";
import { getCharacter } from "../../game/data/characters";

function Bar({
  value,
  max,
  mirrored,
  tone,
}: {
  value: number;
  max: number;
  mirrored?: boolean;
  tone: "health" | "stamina";
}) {
  const pct = Math.max(0, Math.min(1, value / max)) * 100;
  return (
    <div
      className={`h-full w-full overflow-hidden border border-border bg-muted ${
        tone === "health" ? "shadow-neon" : ""
      }`}
    >
      <div
        className={`h-full transition-[width] duration-150 ${
          tone === "health" ? "bg-hud-health" : "bg-hud-stamina"
        }`}
        style={{ width: `${pct}%`, marginLeft: mirrored ? `${100 - pct}%` : undefined }}
      />
    </div>
  );
}

export function CoreHud({ match }: { match: React.RefObject<MatchState> }) {
  const [, force] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    let mounted = true;
    const loop = () => {
      if (!mounted) return;
      force((n) => (n + 1) % 1000);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const m = match.current;
  if (!m) return null;
  const [p1, p2] = m.fighters;
  const c1 = getCharacter(p1.characterId);
  const c2 = getCharacter(p2.characterId);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">
      <div className="flex items-start justify-between gap-4 p-4 md:p-6">
        <div className="w-[38%] max-w-md">
          <div className="mb-1 font-display text-sm tracking-[0.25em] text-foreground">
            {c1.name}
          </div>
          <div className="h-4">
            <Bar value={p1.health} max={c1.maxHealth} tone="health" />
          </div>
          <div className="mt-1 h-2">
            <Bar value={p1.stamina} max={c1.maxStamina} tone="stamina" />
          </div>
        </div>

        <div className="text-center">
          <div className="font-display text-3xl leading-none text-hud-timer md:text-4xl">99</div>
          <div className="mt-1 text-[0.65rem] tracking-[0.35em] text-muted-foreground">ROUND 1</div>
        </div>

        <div className="w-[38%] max-w-md text-right">
          <div className="mb-1 font-display text-sm tracking-[0.25em] text-foreground">
            {c2.name}
          </div>
          <div className="h-4">
            <Bar value={p2.health} max={c2.maxHealth} tone="health" mirrored />
          </div>
          <div className="mt-1 h-2">
            <Bar value={p2.stamina} max={c2.maxStamina} tone="stamina" mirrored />
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded border border-border bg-card/70 px-4 py-2 text-center text-[0.7rem] tracking-[0.2em] text-muted-foreground backdrop-blur">
        W/S AVANZAR · A/D LATERAL · SPACE SALTO · SHIFT ESQUIVA · CTRL AGACHARSE
      </div>
    </div>
  );
}
