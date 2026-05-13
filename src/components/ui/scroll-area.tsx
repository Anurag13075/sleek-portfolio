'use client';

import { cn } from '@/lib/utils';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import type Lenis from 'lenis';
import * as React from 'react';

type WindowWithLenis = { lenis?: Lenis };

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [lenisInstance, setLenisInstance] = React.useState<Lenis | null>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as WindowWithLenis).lenis) {
      setLenisInstance((window as unknown as WindowWithLenis).lenis ?? null);
    }
  }, []);

  const onMouseEnter = () => {
    if (lenisInstance) {
      lenisInstance.stop();
    }
  };

  const onMouseLeave = () => {
    if (lenisInstance) {
      lenisInstance.start();
    }
  };

  const onWheelCapture = (e: React.WheelEvent) => {
    if (viewportRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = viewportRef.current;
      const delta = e.deltaY;
      const canScrollUp = scrollTop > 0;
      const canScrollDown = scrollTop + clientHeight < scrollHeight;

      if ((delta < 0 && canScrollUp) || (delta > 0 && canScrollDown)) {
        e.stopPropagation();
      }
    }
  };

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative overscroll-contain', className)}
      {...props}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        ref={viewportRef}
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
        style={{ overflowY: 'auto', scrollBehavior: 'smooth' }}
        onWheelCapture={onWheelCapture}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };