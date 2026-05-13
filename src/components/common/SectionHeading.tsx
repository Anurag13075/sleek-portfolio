'use client';

import React from 'react';
import { motion } from 'motion/react';
import ScrambleText from '../animations/ScrambleText';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
}\

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
      <div className="absolute left-0 top-1 h-full w-1.5 rounded-full bg-primary/60" />
      <p className="text-primary tracking-[0.2em] uppercase text-xs font-bold mb-2">
        <ScrambleText text={subHeading} />
      </p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
        <ScrambleText text={heading} />
      </h2>
    </motion.div>
  );
}
