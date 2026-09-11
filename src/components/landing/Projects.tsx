'use client';

import { projects } from '@/config/Projects';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ProjectList } from '../projects/ProjectList';
import { Button } from '../ui/button';

export default function Projects() {
  return (
    <Container className="home-section">
      <SectionHeading subHeading="Things I do" heading="Selected projects" />

      <ProjectList className="mt-6" projects={projects.slice(0, 4)} />
      <div className="mt-5">
        <Button className="px-0 text-sm" variant="ghost">
          <Link href="/projects">Show all projects</Link>
        </Button>
      </div>
    </Container>
  );
}
