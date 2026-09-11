'use client';

import { heroConfig, socialLinks } from '@/config/Hero';
import Image from 'next/image';
import Link from 'next/link';
import Container from '../common/Container';

export default function Hero() {
  return (
    <Container className="hero-section">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
            <Image
              src={heroConfig.avatar}
              alt={`${heroConfig.name} portrait`}
              width={52}
              height={52}
              priority
              className="size-12 rounded-full border border-border object-cover"
            />
          <div>
            <p className="text-base font-medium text-foreground">
              {heroConfig.name} Sharma <span className="text-muted-foreground">aka Anurag</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Design engineer &amp; full-stack developer</p>
          </div>
        </div>
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">
          I build interactive web apps with a focus on clean UI, useful
          experiences, and a keen eye for detail. I&apos;m enthusiastic about
          open source, thoughtful products, and learning in public.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target={social.name === 'Email' ? undefined : '_blank'}
              rel={social.name === 'Email' ? undefined : 'noreferrer'}
              className="social-link"
            >
              {social.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
