'use client';

import { socialLinks } from '@/config/Hero';
import Link from 'next/link';
import Container from '../common/Container';
import { LinkPreview } from '../ui/link-preview';

export default function Hero() {
  return (
    <Container className="hero-section">
      <div className="space-y-6">
        <p className="eyebrow">Hello, I&apos;m Anurag</p>
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">
          I build interactive web apps with a focus on clean UI, useful
          experiences, and a keen eye for detail. I&apos;m enthusiastic about
          open source, thoughtful products, and learning in public.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
          {socialLinks.map((social) => (
            {social.name === 'Email' ? (
              <Link
                href={social.href}
                className="social-link"
              >
                {social.name}
              </Link>
            ) : (
              <LinkPreview key={social.name} url={social.href}>
                <span className="social-link">{social.name}</span>
              </LinkPreview>
            )}
          ))}
        </div>
      </div>
    </Container>
  );
}
