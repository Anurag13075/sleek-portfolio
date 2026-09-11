'use client';

import { type Project } from '@/types/project';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { LinkPreview } from '../ui/link-preview';

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
            className="text-foreground hover:text-primary text-base font-medium transition-colors"
          >
            {project.title}
          </Link>
          <span className="text-muted-foreground text-xs">
            {project.technologies
              .slice(0, 3)
              .map((technology) => technology.name)
              .join(' · ')}
          </span>
        </div>
        <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-6">
          {project.description}
        </p>
      </div>
      <LinkPreview
        url={project.live ?? project.link}
        imageSrc={project.image}
        isStatic
        className="row-arrow"
      >
        <span aria-label={`Visit ${project.title}`}>
          <ArrowUpRight className="size-4" />
        </span>
      </LinkPreview>
    </article>
  );
}
