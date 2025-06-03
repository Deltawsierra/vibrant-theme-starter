
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import { useThreeD } from '../context/ThreeDContext';
import * as THREE from 'three';

interface FloatingObjectProps {
  position: [number, number, number];
  type: 'card' | 'pod' | 'island';
  id: string;
}

const FloatingObject: React.FC<FloatingObjectProps> = ({ position, type, id }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { highlightObject, selectObject } = useThreeD();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      if (hovered) {
        mesh.current.scale.setScalar(1.1);
      } else {
        mesh.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = () => {
    selectObject(id);
    console.log(`Selected ${type}: ${id}`);
  };

  const handlePointerOver = () => {
    setHovered(true);
    highlightObject(id);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  return (
    <group position={position}>
      {type === 'card' && (
        <Box
          ref={mesh}
          args={[2, 3, 0.1]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial color={hovered ? '#60a5fa' : '#3b82f6'} />
        </Box>
      )}
      {type === 'pod' && (
        <Sphere
          ref={mesh}
          args={[1.5, 32, 32]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial color={hovered ? '#34d399' : '#10b981'} />
        </Sphere>
      )}
      {type === 'island' && (
        <Box
          ref={mesh}
          args={[4, 1, 4]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <meshStandardMaterial color={hovered ? '#fbbf24' : '#f59e0b'} />
        </Box>
      )}
      <Text
        position={[0, type === 'island' ? 1.5 : 2.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {type.toUpperCase()}
      </Text>
    </group>
  );
};

const Scene: React.FC = () => {
  const { addInteractiveObject } = useThreeD();

  React.useEffect(() => {
    // Add demo objects to context
    addInteractiveObject({
      id: 'card-1',
      name: 'Portfolio Card',
      position: { x: -5, y: 0, z: 0 }
    });
    addInteractiveObject({
      id: 'pod-1',
      name: 'Interactive Pod',
      position: { x: 0, y: 2, z: -3 }
    });
    addInteractiveObject({
      id: 'island-1',
      name: 'Content Island',
      position: { x: 5, y: -1, z: 2 }
    });
  }, [addInteractiveObject]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingObject position={[-5, 0, 0]} type="card" id="card-1" />
      <FloatingObject position={[0, 2, -3]} type="pod" id="pod-1" />
      <FloatingObject position={[5, -1, 2]} type="island" id="island-1" />
    </>
  );
};

interface ThreeDViewportProps {
  onReady?: () => void;
}

const ThreeDViewport: React.FC<ThreeDViewportProps> = ({ onReady }) => {
  const { resetCamera } = useThreeD();

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      if (onReady) onReady();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onReady]);

  return (
    <div className="w-full h-full bg-slate-900">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
      >
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={20}
          maxPolarAngle={Math.PI}
        />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDViewport;
