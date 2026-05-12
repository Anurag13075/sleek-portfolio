'use client';
import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue,
  useAnimationControls,
  AnimatePresence,
} from 'motion/react';
import MagneticWrapper from '../animations/MagneticWrapper';
import Container from '../common/Container';
import Skill from '../common/Skill';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

// ─── Animation Variants ────────────────────────────────────────────────────────

const STAGGER_CONTAINER = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 80, damping: 18 },
  },
};

const FADE_UP_FAST = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
};

const SCALE_IN = {
  hidden: { scale: 0.6, opacity: 0, filter: 'blur(16px)' },
  show: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 90, damping: 20, delay: 0.05 },
  },
};

const ICON_POP = {
  hidden: { scale: 0, opacity: 0, rotate: -20 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 16,
      delay: 0.55 + i * 0.07,
    },
  }),
};

// ─── Animated Avatar Ring ──────────────────────────────────────────────────────

function AvatarRing({ src, alt }: { src: string; alt: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-60, 60], [12, -12]), {
    stiffness: 200, damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-60, 60], [-12, 12]), {
    stiffness: 200, damping: 20,
  });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      variants={SCALE_IN}
      onMouseMove={handleMouse}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative"
    >
      {/* Spinning dashed ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
        style={{ inset: '-10px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      {/* Slower counter-spinning ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-primary/15"
        style={{ inset: '-20px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      />
      {/* Glow pulse */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Image
        src={src}
        alt={alt}
        width={180}
        height={180}
        className="size-36 md:size-44 rounded-full border-[5px] border-background shadow-2xl bg-blue-300 dark:bg-yellow-300 object-cover relative z-10"
        priority
      />
    </motion.div>
  );
}

// ─── Floating Orbit Dots ───────────────────────────────────────────────────────

function OrbitDots() {
  const dots = [
    { r: 90,  delay: 0,    dur: 6,  size: 6,  color: 'bg-primary' },
    { r: 115, delay: 2,    dur: 9,  size: 4,  color: 'bg-primary/60' },
    { r: 75,  delay: 1.2,  dur: 7,  size: 3,  color: 'bg-primary/40' },
  ];
  return (
    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: d.dur, repeat: Infinity, ease: 'linear', delay: d.delay }}
        >
          <div
            className={`absolute rounded-full ${d.color} shadow-lg`}
            style={{
              width: d.size,
              height: d.size,
              top: '50%',
              left: '50%',
              marginTop: -d.r,
              marginLeft: -d.size / 2,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Animated Gradient Title ───────────────────────────────────────────────────

function GradientName({ name }: { name: string }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const gradX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 60, damping: 15 });
  const gradY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 60, damping: 15 });
  const background = useMotionTemplate`radial-gradient(ellipse at ${gradX}% ${gradY}%, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.5) 60%, transparent 100%)`;

  return (
    <motion.span
      style={{ background, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); }}
    >
      {name}
    </motion.span>
  );
}

// ─── Animated Underline Title ──────────────────────────────────────────────────

function AnimatedTitle({ title }: { title: string }) {
  const controls = useAnimationControls();
  return (
    <motion.h2
      variants={FADE_UP}
      className="text-2xl md:text-3xl text-secondary font-medium relative inline-block cursor-default"
      onHoverStart={() => controls.start({ scaleX: 1, transition: { type: 'spring', stiffness: 200, damping: 18 } })}
      onHoverEnd={() => controls.start({ scaleX: 0, transition: { duration: 0.25 } })}
    >
      {title}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-px bg-primary origin-left"
        initial={{ scaleX: 0 }}
        animate={controls}
      />
    </motion.h2>
  );
}

// ─── Button with ripple ────────────────────────────────────────────────────────

function RippleButton({ button, index, IconComponent }: {
  button: { href: string; text: string; variant: string; icon: string };
  index: number;
  IconComponent: React.ComponentType | undefined;
}) {
  const [ripples, setRipples] = React.useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600);
  };

  return (
    <motion.div variants={FADE_UP_FAST} custom={index}>
      <MagneticWrapper>
        <Button
          size="lg"
          variant={button.variant as 'outline' | 'default'}
          className="text-base rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl relative overflow-hidden"
          onClick={handleClick}
        >
          <AnimatePresence>
            {ripples.map(r => (
              <motion.span
                key={r.id}
                className="absolute rounded-full bg-white/20 pointer-events-none"
                style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
                initial={{ width: 0, height: 0, opacity: 0.5 }}
                animate={{ width: 200, height: 200, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            ))}
          </AnimatePresence>
          {IconComponent && <IconComponent />}
          <Link href={button.href}>{button.text}</Link>
        </Button>
      </MagneticWrapper>
    </motion.div>
  );
}

// ─── Scroll fade-out ───────────────────────────────────────────────────────────

function useScrollFade() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y       = useTransform(scrollY, [0, 300], [0, -40]);
  return { opacity, y };
}

// ─── Main Hero ─────────────────────────────────────────────────────────────────

const buttonIcons = { CV, Chat };

export default function Hero() {
  const { name, title, avatar, skills, description, buttons } = heroConfig;
  const { opacity: scrollOpacity, y: scrollY } = useScrollFade();

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);
    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent = skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <motion.span key={part.key} variants={FADE_UP_FAST}>
            <Skill name={part.skill.name} href={part.skill.href}>
              <SkillComponent />
            </Skill>
          </motion.span>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <motion.b key={part.key} variants={FADE_UP_FAST} className="text-primary whitespace-pre-wrap">
            {part.text}
          </motion.b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <motion.span key={part.key} variants={FADE_UP_FAST} className="whitespace-pre-wrap">
            {part.text}
          </motion.span>
        );
      }
      return null;
    });
  };

  return (
    <motion.div style={{ opacity: scrollOpacity, y: scrollY }}>
      <Container
        className="mx-auto max-w-5xl flex flex-col items-center justify-center text-center min-h-[85vh] py-20 relative"
      >
        {/* Ambient background glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full pointer-events-none -z-10 bg-primary/5"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(120px)' }}
        />

        {/* ── Orchestrated stagger container ── */}
        <motion.div
          className="flex flex-col items-center gap-0 w-full"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="show"
        >
          {/* Avatar */}
          <motion.div variants={SCALE_IN} className="relative mb-10">
            <OrbitDots />
            <AvatarRing src={avatar} alt="hero" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={FADE_UP}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
          >
            Hi, I&apos;m <GradientName name={name} />
          </motion.h1>

          {/* Title with underline */}
          <AnimatedTitle title={title} />

          {/* Description */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-lg md:text-xl max-w-3xl text-neutral-500 leading-relaxed"
            variants={STAGGER_CONTAINER}
          >
            {renderDescription()}
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-6"
            variants={STAGGER_CONTAINER}
          >
            {buttons.map((button, index) => {
              const IconComponent = buttonIcons[button.icon as keyof typeof buttonIcons];
              return (
                <RippleButton key={index} button={button} index={index} IconComponent={IconComponent} />
              );
            })}
          </motion.div>

          {/* Social links */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            variants={STAGGER_CONTAINER}
          >
            {socialLinks.map((link, i) => (
              <motion.div key={link.name} variants={ICON_POP} custom={i}>
                <MagneticWrapper>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.href}
                        className="text-secondary hover:text-primary flex items-center justify-center size-12 rounded-full bg-accent/30 backdrop-blur-md transition-all duration-300 hover:bg-accent shadow-sm"
                      >
                        <span className="size-5">{link.icon}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent><p>{link.name}</p></TooltipContent>
                  </Tooltip>
                </MagneticWrapper>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </motion.div>
  );
}
