// Luchador PLACEHOLDER procedural (FASE 1).
// Se sustituye por un modelo humanoide CC0 riggeado en la FASE 4 (ver ASSETS_TODO.md).

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { FighterState } from "../core/types";
import { getCharacter } from "../data/characters";

interface Props {
  state: React.RefObject<FighterState>;
}

export function Fighter({ state }: Props) {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Mesh>(null);
  const armR = useRef<THREE.Mesh>(null);
  const char = getCharacter(state.current.characterId);
  const t = useRef(0);

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const s = state.current;
    if (!group.current || !body.current || !s) return;
    t.current += delta;

    group.current.position.set(s.x, s.y, s.z);
    const targetYaw = s.facing === 1 ? Math.PI / 2 : -Math.PI / 2;
    group.current.rotation.y +=
      (targetYaw - group.current.rotation.y) * (1 - Math.exp(-14 * delta));

    // Postura: agachado, esquiva, guardia idle
    const crouch = s.crouching ? 0.62 : 1;
    const dodgeTilt = s.dodgeTicks > 0 ? 0.35 : 0;
    body.current.scale.y += (crouch - body.current.scale.y) * (1 - Math.exp(-18 * delta));
    body.current.rotation.x += (dodgeTilt - body.current.rotation.x) * (1 - Math.exp(-14 * delta));

    const bob = Math.sin(t.current * 6) * 0.03 + Math.abs(s.vx) * 0.012;
    body.current.position.y = bob;

    const guard = Math.sin(t.current * 6) * 0.08;
    if (armL.current) armL.current.rotation.x = -1.1 + guard;
    if (armR.current) armR.current.rotation.x = -1.15 - guard;
  });

  return (
    <group ref={group}>
      <group ref={body}>
        {/* torso */}
        <mesh position={[0, 1.18, 0]} castShadow>
          <capsuleGeometry args={[0.28, 0.6, 6, 14]} />
          <meshStandardMaterial
            color={char.colors.suit}
            emissive={char.colors.suit}
            emissiveIntensity={0.35}
            roughness={0.55}
            metalness={0.25}
          />
        </mesh>
        {/* banda de neón del implante */}
        <mesh position={[0, 1.32, 0.2]} castShadow>
          <boxGeometry args={[0.34, 0.06, 0.14]} />
          <meshStandardMaterial
            color={char.colors.accent}
            emissive={char.colors.accent}
            emissiveIntensity={2.2}
          />
        </mesh>
        {/* cabeza */}
        <mesh position={[0, 1.72, 0]} castShadow>
          <sphereGeometry args={[0.21, 18, 16]} />
          <meshStandardMaterial color={char.colors.skin} roughness={0.75} />
        </mesh>
        {/* visor */}
        <mesh position={[0, 1.75, 0.17]}>
          <boxGeometry args={[0.3, 0.07, 0.08]} />
          <meshStandardMaterial
            color={char.colors.accent}
            emissive={char.colors.accent}
            emissiveIntensity={1.6}
          />
        </mesh>
        {/* brazos */}
        <mesh ref={armL} position={[-0.34, 1.32, 0.05]} castShadow>
          <capsuleGeometry args={[0.09, 0.42, 4, 8]} />
          <meshStandardMaterial color={char.colors.suit} roughness={0.6} metalness={0.3} />
        </mesh>
        <mesh ref={armR} position={[0.34, 1.32, 0.05]} castShadow>
          <capsuleGeometry args={[0.09, 0.42, 4, 8]} />
          <meshStandardMaterial color={char.colors.suit} roughness={0.6} metalness={0.3} />
        </mesh>
        {/* piernas */}
        <mesh position={[-0.15, 0.44, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
          <meshStandardMaterial color="#2a3040" emissive="#1a2030" emissiveIntensity={0.5} roughness={0.7} />
        </mesh>
        <mesh position={[0.15, 0.44, 0]} castShadow>
          <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
          <meshStandardMaterial color="#2a3040" emissive="#1a2030" emissiveIntensity={0.5} roughness={0.7} />
        </mesh>
      </group>
      {/* sombra de contacto barata */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.42, 20]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
