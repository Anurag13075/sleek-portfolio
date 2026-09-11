import { navbarConfig } from '@/config/Navbar';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';

export default function Navbar() {
  return (
    <Container className="sticky top-0 z-20 border-b border-border/80 bg-background/90 py-4 backdrop-blur-md">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          AS<span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5">
            {navbarConfig.navItems.map((item) => (
              <Link
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                key={item.label}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </div>
    </Container>
  );
}
