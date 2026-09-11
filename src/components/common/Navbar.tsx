import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  return (
    <Container className="border-border/80 bg-background/90 sticky top-0 z-20 border-b py-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <Link href="/" aria-label="Anurag Sharma home">
            <Image
              src={navbarConfig.logo.src}
              alt={navbarConfig.logo.alt}
              width={28}
              height={28}
              className="size-7 rounded-md object-cover"
            />
          </Link>
          <p className="truncate text-sm font-medium tracking-tight">
            Anurag Sharma{' '}
            <span className="text-muted-foreground font-normal">
              aka Anurag
            </span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            {navbarConfig.navItems.map((item) => (
              <Link
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                key={item.label}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggleButton variant="circle" start="top-right" blur />
          </div>
        </div>
      </div>
    </Container>
  );
}
