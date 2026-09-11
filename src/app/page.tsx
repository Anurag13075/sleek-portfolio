import Blog from '@/components/landing/Blog';
import Experience from '@/components/landing/Experience';
import Hero from '@/components/landing/Hero';
import Projects from '@/components/landing/Projects';

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Experience />
      <Blog />
    </main>
  );
}
