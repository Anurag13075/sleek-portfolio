'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import React from 'react';

interface LinkPreviewProps {
  children: React.ReactNode;
  url: string;
  imageSrc?: string;
  className?: string;
}

export function LinkPreview({
  children,
  url,
  imageSrc,
  className,
}: LinkPreviewProps) {
  return (
    <span className={`link-preview ${className ?? ''}`}>
      <Link href={url} target="_blank" rel="noreferrer">
        {children}
      </Link>
      {imageSrc && (
        <motion.span
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="link-preview-card"
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="220px"
            className="object-cover"
          />
        </motion.span>
      )}
    </span>
  );
}
