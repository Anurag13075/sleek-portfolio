import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    company: 'Heva AI',
    position: 'Full Stack Developer Intern',
    location: 'Remote',
    image: '/Heva.png',
    description: [
      '*Developed* and maintained full-stack AI applications using Next.js and React',
      '*Built* responsive web interfaces with TypeScript and Tailwind CSS',
      '*Implemented* backend APIs with Node.js and Express.js',
      '*Collaborated* with team to integrate AI models and optimize performance',
      "*Demonstrated* dedication and contributed to Civilization's productivity mission",
    ],
    startDate: 'Jan 2026',
    endDate: 'Aug 2026',
    website: 'https://www.heva-ai.com',
    linkedin: 'https://www.linkedin.com/company/heva-ai/',
    technologies: [
      { name: 'Next.js', href: 'https://nextjs.org', icon: <NextJs /> },
      { name: 'React', href: 'https://react.dev', icon: <ReactIcon /> },
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org',
        icon: <TypeScript />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com',
        icon: <TailwindCss />,
      },
      { name: 'Node.js', href: 'https://nodejs.org', icon: <NodeJs /> },
      {
        name: 'PostgreSQL',
        href: 'https://www.postgresql.org',
        icon: <PostgreSQL />,
      },
    ],
    isCurrent: false,
  },
  {
    company: 'Kestra',
    position: 'Open Source Contributor',
    location: 'Remote, India',
    image: '/kestra.png',
    description: [
      '*Contributed* to Kestra open-source project frontend development',
      '*Developed* responsive UI components using Vue.js and TypeScript',
      '*Implemented* features for workflow orchestration platform',
      '*Collaborated* with community and maintained code quality standards',
      '*Enhanced* user experience through modern web technologies',
    ],
    startDate: 'Oct 2025',
    endDate: 'Nov 2025',
    website: 'https://kestra.io',
    github: 'https://github.com/kestra-io/kestra',
    technologies: [
      {
        name: 'TypeScript',
        href: 'https://www.typescriptlang.org',
        icon: <TypeScript />,
      },
      { name: 'Next.js', href: 'https://nextjs.org', icon: <NextJs /> },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com',
        icon: <TailwindCss />,
      },
      { name: 'Node.js', href: 'https://nodejs.org', icon: <NodeJs /> },
    ],
    isCurrent: false,
  },
];
