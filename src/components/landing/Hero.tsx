'use client';
import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';
import { motion } from 'motion/react';
import MagneticWrapper from '../animations/MagneticWrapper';

import Container from '../common/Container';
import Skill from '../common/Skill';
import CV from '../svgs/CV';
import Chat from '../svgs/Chat';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
  CV: CV,
  Chat: Chat,
};

export default function Hero() {
  const { name, title, avatar, skills, description, buttons } = heroConfig;

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="text-primary whitespace-pre-wrap">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container className="mx-auto max-w-5xl flex flex-col items-center justify-center text-center min-h-[85vh] py-20 relative">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Image */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <Image
          src={avatar}
          alt="hero"
          width={180}
          height={180}
          className="size-36 md:size-44 rounded-full border-[6px] border-background shadow-xl bg-blue-300 dark:bg-yellow-300 object-cover"
        />
      </motion.div>

      {/* Text Area */}
      <motion.div 
        className="mt-10 flex flex-col items-center gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Hi, I&apos;m <span className="text-primary">{name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-secondary font-medium">
          {title}
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-lg md:text-xl max-w-3xl text-neutral-500 leading-relaxed">
          {renderDescription()}
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div 
        className="mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {buttons.map((button, index) => {
          const IconComponent =
            buttonIcons[button.icon as keyof typeof buttonIcons];
          return (
            <MagneticWrapper key={index}>
              <Button
                size="lg"
                variant={button.variant as 'outline' | 'default'}
                className="text-base rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {IconComponent && <IconComponent />}
                <Link href={button.href}>{button.text}</Link>
              </Button>
            </MagneticWrapper>
          );
        })}
      </motion.div>

      {/* Social Links */}
      <motion.div 
        className="mt-12 flex items-center justify-center gap-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {socialLinks.map((link) => (
          <MagneticWrapper key={link.name}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className="text-secondary hover:text-primary flex items-center justify-center size-12 rounded-full bg-accent/30 backdrop-blur-md transition-all duration-300 hover:bg-accent shadow-sm"
                >
                  <span className="size-5">{link.icon}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          </MagneticWrapper>
        ))}
      </motion.div>
    </Container>
  );
}
