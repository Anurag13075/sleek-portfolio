'use client';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useEffect, useState, useRef, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfigOuter = { damping: 18, stiffness: 220, mass: 0.8 };
  const springConfigInner = { damping: 28, stiffness: 600, mass: 0.3 };
  const springConfigAura  = { damping: 12, stiffness: 100, mass: 1.2 };

  const outerX = useSpring(cursorX, springConfigOuter);
  const outerY = useSpring(cursorY, springConfigOuter);
  const innerX = useSpring(cursorX, springConfigInner);
  const innerY = useSpring(cursorY, springConfigInner);
  const auraX  = useSpring(cursorX, springConfigAura);
  const auraY  = useSpring(cursorY, springConfigAura);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');

  const particleIdRef = useRef(0);
  const trailIdRef    = useRef(0);
  const lastTrailPos  = useRef({ x: -100, y: -100 });
  const animFrameRef  = useRef<number | null>(null);
  const rawX = useRef(-100);
  const rawY = useRef(-100);

  const spawnParticles = useCallback((x: number, y: number, count = 8) => {
    const burst: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: particleIdRef.current++,
      x,
      y,
      angle: (i / count) * 360 + Math.random() * 20,
      distance: 30 + Math.random() * 40,
    }));
    setParticles(prev => [...prev, ...burst]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !burst.some(b => b.id === p.id)));
    }, 700);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      rawX.current = x;
      rawY.current = y;

      cursorX.set(x - 16);
      cursorY.set(y - 16);

      const dx = x - lastTrailPos.current.x;
      const dy = y - lastTrailPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) > 12) {
        lastTrailPos.current = { x, y };
        const pt: TrailPoint = {
          id: trailIdRef.current++,
          x,
          y,
          opacity: 1,
        };
        setTrail(prev => [...prev.slice(-10), pt]);
        setTimeout(() => {
          setTrail(prev => prev.filter(t => t.id !== pt.id));
        }, 500);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('button, a, input, select, textarea, [role="button"], label');
      if (interactive) {
        if (!isHovering) spawnParticles(rawX.current, rawY.current, 6);
        setIsHovering(true);
        const text =
          (interactive as HTMLElement).getAttribute('aria-label') ||
          (interactive as HTMLElement).getAttribute('title') ||
          (interactive as HTMLButtonElement).textContent?.trim().slice(0, 16) ||
          '';
        setHoverLabel(text);
      } else {
        setIsHovering(false);
        setHoverLabel('');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      spawnParticles(e.clientX, e.clientY, 12);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [cursorX, cursorY, isHovering, spawnParticles]);

  const ringVariants = {
    idle:     { scale: 1,   opacity: 1,    borderWidth: '1.5px' },
    hovering: { scale: 2.2, opacity: 1,    borderWidth: '1px'   },
    clicking: { scale: 0.7, opacity: 0.8,  borderWidth: '2.5px' },
  };

  const dotVariants = {
    idle:     { scale: 1,   opacity: 1 },
    hovering: { scale: 0,   opacity: 0 },
    clicking: { scale: 2.5, opacity: 0.6 },
  };

  const currentState = isClicking ? 'clicking' : isHovering ? 'hovering' : 'idle';

  return (
    <>
      {/* Ambient aura — slowest, largest, subtlest */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9990] hidden md:block"
        style={{ x: auraX, y: auraY }}
      >
        <motion.div
          style={{
            width: 64,
            height: 64,
            marginLeft: -16,
            marginTop: -16,
            borderRadius: '50%',
          }}
          animate={{
            opacity: isHovering ? 0.18 : 0.06,
            scale: isHovering ? 1.8 : 1,
            background: isHovering
              ? 'radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)',
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Trail dots */}
      <div className="fixed top-0 left-0 pointer-events-none z-[9991] hidden md:block">
        <AnimatePresence>
          {trail.map((pt, i) => (
            <motion.div
              key={pt.id}
              className="absolute rounded-full bg-primary"
              style={{
                left: pt.x - 3,
                top: pt.y - 3,
                width: 6,
                height: 6,
              }}
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.012 }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Click/hover particle burst */}
      <div className="fixed top-0 left-0 pointer-events-none z-[9992] hidden md:block">
        <AnimatePresence>
          {particles.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const tx = Math.cos(rad) * p.distance;
            const ty = Math.sin(rad) * p.distance;
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-primary"
                style={{ left: p.x, top: p.y, width: 4, height: 4, marginLeft: -2, marginTop: -2 }}
                initial={{ opacity: 0.9, x: 0, y: 0, scale: 1 }}
                animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.4, 1] }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Outer ring — slow spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9994] hidden md:flex items-center justify-center"
        style={{ x: outerX, y: outerY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1.5px solid hsl(var(--primary) / 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          variants={ringVariants}
          animate={currentState}
          transition={{
            scale:       { type: 'spring', stiffness: 260, damping: 22 },
            opacity:     { duration: 0.2 },
            borderWidth: { duration: 0.15 },
          }}
        />
      </motion.div>

      {/* Inner dot — fast spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995] hidden md:flex items-center justify-center"
        style={{ x: innerX, y: innerY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      >
        <motion.div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'hsl(var(--primary))',
              boxShadow: '0 0 10px 2px hsl(var(--primary) / 0.6), 0 0 20px 4px hsl(var(--primary) / 0.3)',
            }}
            variants={dotVariants}
            animate={currentState}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          />
        </motion.div>
      </motion.div>

      {/* Hover label */}
      <AnimatePresence>
        {isHovering && hoverLabel && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9996] hidden md:block"
            style={{ x: outerX, y: outerY }}
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div
              style={{
                marginLeft: 28,
                marginTop: -4,
                background: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                padding: '3px 8px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              {hoverLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click shockwave ring */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            key="shockwave"
            className="fixed top-0 left-0 pointer-events-none z-[9993] hidden md:block"
            style={{ x: innerX, y: innerY }}
          >
            <motion.div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '2px solid hsl(var(--primary) / 0.7)',
              }}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
