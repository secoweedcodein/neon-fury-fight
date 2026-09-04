// Bucle principal: tick fijo 60 Hz, input -> simulación -> render.

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { createMatchState, stepMatch } from "../core/sim";
import { EMPTY_INTENT, TICK_DT, type MatchState } from "../core/types";
import { KeyboardInput } from "../systems/input";
import { DummyAI } from "../systems/ai";
import { Fighter } from "./Fighter";
import { HitSparks } from "./HitSparks";
import { SideCamera } from "./SideCamera";
import { TestStage } from "./TestStage";
import { CoreHud } from "../../components/hud/CoreHud";

function Simulation({
  match,
  input,
  ai,
}: {
  match: React.RefObject<MatchState>;
  input: React.RefObject<KeyboardInput>;
  ai: React.RefObject<DummyAI>;
}) {
  const accumulator = useRef(0);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.1);
    accumulator.current += delta;
    let steps = 0;
    while (accumulator.current >= TICK_DT && steps < 6) {
      const m = match.current;
      const intent = input.current?.readIntent() ?? EMPTY_INTENT;
      const foe = ai.current?.think(m.fighters[1], m.fighters[0]) ?? EMPTY_INTENT;
      stepMatch(m, [intent, foe]);
      accumulator.current -= TICK_DT;
      steps++;
    }
    if (steps === 6) accumulator.current = 0;
  });

  return null;
}

export function GameCanvas({
  playerCharacter = "ash",
  opponentCharacter = "vulcan",
}: {
  playerCharacter?: string;
  opponentCharacter?: string;
}) {
  const match = useRef<MatchState>(createMatchState(playerCharacter, opponentCharacter));
  const input = useRef<KeyboardInput>(new KeyboardInput());
  const ai = useRef<DummyAI>(new DummyAI("normal"));
  const p1 = useRef(match.current.fighters[0]);
  const p2 = useRef(match.current.fighters[1]);

  useEffect(() => {
    const kb = input.current;
    kb.attach(window);
    return () => kb.dispose();
  }, []);

  return (
    <div className="fixed inset-0 bg-background">
      <Canvas shadows dpr={[1, 1.75]} camera={{ position: [0, 2.4, 12], fov: 52 }}>
        <TestStage />
        <Simulation match={match} input={input} ai={ai} />
        <SideCamera match={match} />
        <Fighter state={p1} />
        <Fighter state={p2} />
        <HitSparks match={match} />
      </Canvas>
      <CoreHud match={match} />
    </div>
  );
}
