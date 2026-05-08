import NextJs from '@/components/technologies/NextJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Breeze',
    description: 'A modern web application.',
    image: '/project/Breeze.png',
    link: 'https://breeze-ochre.vercel.app/',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    live: 'https://breeze-ochre.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/breeze',
    isWorking: true,
  },
  {
    title: 'Pencil Sketchpad',
    description: 'An interactive drawing application.',
    image: '/project/pencil.png',
    link: 'https://pencil-sketchpad.vercel.app/',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    live: 'https://pencil-sketchpad.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/pencil-sketchpad',
    isWorking: true,
  },
  {
    title: 'Git Explorer',
    description: 'A tool to explore GitHub repositories.',
    image: '/project/git-explorer.png',
    link: 'https://git-explorer-eta.vercel.app/',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    live: 'https://git-explorer-eta.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/git-explorer',
    isWorking: true,
  },
];
