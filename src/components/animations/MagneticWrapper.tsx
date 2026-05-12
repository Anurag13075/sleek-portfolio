'use client';
import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function MagneticWrapper({
  children,
  className = '',
  strength = 0.4,
  radius = 1.2,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const middleX = clientX - centerX;
    const middleY = clientY - centerY;

    const distance = Math.sqrt(middleX ** 2 + middleY ** 2);
    const maxDist  = Math.max(width, height) * radius;
    const pull     = Math.max(0, 1 - distance / maxDist);

    setIsNear(true);
    setPosition({ x: middleX * strength * pull, y: middleY * strength * pull });

    // 3-D tilt — max ±12 degrees
    const tiltX = -(middleY / (height / 2)) * 12 * pull;
    const tiltY =  (middleX / (width  / 2)) * 12 * pull;
    setTilt({ rotateX: tiltX, rotateY: tiltY });

    // Glow follows cursor within element
    const relX = ((clientX - left) / width)  * 100;
    const relY = ((clientY - top)  / height) * 100;
    setGlowPos({ x: relX, y: relY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlowPos({ x: 50, y: 50 });
    setIsNear(false);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{
        x: position.x,
        y: position.y,
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: isNear ? 1.06 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 14,
        mass: 0.08,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 600,
        position: 'relative',
        display: 'inline-block',
      }}
      whileTap={{ scale: 0.94 }}
    >
      {/* Radial glow that tracks the cursor */}
      <motion.div
        aria-hidden
        animate={{
          opacity: isNear ? 1 : 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, hsl(var(--primary) / 0.25) 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Shimmer border ring */}
      <motion.div
        aria-hidden
        animate={{
          opacity: isNear ? 1 : 0,
          background: `conic-gradient(from ${glowPos.x * 3.6}deg, hsl(var(--primary) / 0.6), transparent 40%, hsl(var(--primary) / 0.3) 60%, transparent 80%)`,
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: 'inherit',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Children sit on top */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
}
