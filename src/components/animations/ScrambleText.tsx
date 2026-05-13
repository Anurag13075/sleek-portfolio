'use client';
import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()<>?/|";

interface CharState {
  char: string;
  settled: boolean;
  scrambleIntensity: number;
}

export default function ScrambleText({
  text,
  className = '',
  speed = 1,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const [chars, setChars] = useState<CharState[]>([]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef  = useRef<ReturnType<typeof setTimeout>  | null>(null);

  useEffect(() => {
    if (!isInView) return;

    // Reset
    setChars(
      text.split('').map(() => ({
        char: text.replace(/[^ ]/g, () => LETTERS[Math.floor(Math.random() * LETTERS.length)]).charAt(0),
        settled: false,
        scrambleIntensity: 1,
      }))
    );

    timeoutRef.current = setTimeout(() => {
      let iteration = 0;
      const ticksPerChar = 3 / speed;

      intervalRef.current = setInterval(() => {
        const progress = iteration / ticksPerChar;

        setChars(
          text.split('').map((letter, index) => {
            if (letter === ' ') return { char: ' ', settled: true, scrambleIntensity: 0 };

            const isSettled = index < progress;
            const distanceFromFront = index - progress;
            // Characters near the "wave front" scramble faster
            const intensity = isSettled ? 0 : Math.max(0, 1 - distanceFromFront * 0.15);

            return {
              char: isSettled
                ? text[index]
                : LETTERS[Math.floor(Math.random() * LETTERS.length)],
              settled: isSettled,
              scrambleIntensity: intensity,
            };
          })
        );

        iteration += 1;

        if (progress >= text.length) {
          clearInterval(intervalRef.current!);
          setChars(
            text.split('').map((letter) => ({
              char: letter,
              settled: true,
              scrambleIntensity: 0,
            }))
          );
        }
      }, 30 / speed);
    }, delay);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current)  clearTimeout(timeoutRef.current);
    };
  }, [text, isInView, speed, delay]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
      style={{ display: 'inline-block', whiteSpace: 'pre' }}
    >
      {chars.length === 0
        ? text.replace(/[^ ]/g, '\u00A0')
        : chars.map((c, i) => (
            <motion.span
              key={i}
              animate={{
                opacity: c.scrambleIntensity > 0.6 ? [1, 0.4, 1] : 1,
                color: c.settled
                  ? 'hsl(var(--foreground))'
                  : `hsl(var(--primary) / ${0.5 + c.scrambleIntensity * 0.5})`,
                textShadow: c.settled
                  ? 'none'
                  : `0 0 ${8 * c.scrambleIntensity}px hsl(var(--primary) / ${c.scrambleIntensity * 0.8})`,
                y: c.settled ? 0 : c.scrambleIntensity * -3,
              }}
              transition={{
                duration: 0.06,
                opacity: { repeat: c.scrambleIntensity > 0.6 ? Infinity : 0, duration: 0.12 },
              }}
              style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}
            >
              {c.char}
            </motion.span>
          ))}
    </motion.span>
  );
}
