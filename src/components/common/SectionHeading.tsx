'use client';

import { motion } from 'motion/react';
import React from 'react';

import ScrambleText from '../animations/ScrambleText';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative mb-10 pl-6"
    >
      <div className="bg-primary/60 absolute top-1 left-0 h-full w-1.5 rounded-full" />
      <p className="text-primary mb-2 text-xs font-bold tracking-[0.2em] uppercase">
        <ScrambleText text={subHeading} />
      </p>
      <h2 className="text-foreground text-4xl font-extrabold tracking-tight md:text-5xl">
        <ScrambleText text={heading} />
      </h2>
    </motion.div>
  );
}
