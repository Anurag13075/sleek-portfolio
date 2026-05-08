'use client';
import { about, mySkills } from '@/config/About';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function About() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="About" heading="Me" />
      {/* About me */}
      <div className="mt-12 flex flex-col gap-10 md:flex-row items-center md:items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group shrink-0"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-2xl rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
          <Image
            src="/assets/Anurag.png"
            alt="About"
            width={240}
            height={240}
            className="relative size-60 rounded-2xl object-cover shadow-xl transition-transform duration-500 group-hover:-translate-y-2 bg-blue-300 dark:bg-yellow-300"
          />
        </motion.div>
        
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-3xl font-bold tracking-tight">{about.name}</h3>
          <p className="text-secondary mt-4 text-lg leading-relaxed">{about.description}</p>
          <p className="text-foreground mt-8 font-semibold tracking-wide uppercase text-sm">Tech Stack</p>
          <div className="flex flex-wrap gap-3 mt-4">
            {mySkills.map((skill, i) => (
              <Tooltip key={skill.key}>
                <TooltipTrigger asChild>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i + 0.3 }}
                    className="size-12 p-2.5 flex items-center justify-center rounded-xl bg-accent/30 border border-border/50 hover:bg-accent hover:border-primary hover:scale-110 transition-all cursor-pointer shadow-sm"
                  >
                    {skill}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>{skill.key}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
