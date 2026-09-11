import React from 'react';

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{subHeading}</p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight">{heading}</h2>
    </div>
  );
}
