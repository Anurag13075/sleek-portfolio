'use client';

import { type Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-row group">
      <div className="project-thumb">
        <Image
          src={project.image}
          alt={project.title}
          width={160}
          height={100}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link
            href={project.projectDetailsPageSlug}
            className="text-base font-medium text-foreground transition-colors hover:text-primary"
          >
            {project.title}
          </Link>
          <span className="text-xs text-muted-foreground">
            {project.technologies
              .slice(0, 3)
              .map((technology) => technology.name)
              .join(' · ')}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>
      </div>
      <Link
        href={project.live ?? project.link}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${project.title}`}
        className="row-arrow"
      >
        <ArrowUpRight className="size-4" />
      </Link>
    </article>
  );
}
