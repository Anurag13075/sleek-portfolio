import Blog from '@/components/landing/Blog';
import Experience from '@/components/landing/Experience';
import Hero from '@/components/landing/Hero';
import Projects from '@/components/landing/Projects';
import Container from '@/components/common/Container';
import { about } from '@/config/About';

export default function Page() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Container className="home-about">
        <p className="eyebrow">About me</p>
        <div className="about-copy">
          <p>{about.description}</p>
          <p>
            I enjoy turning rough ideas into clear, useful interfaces and
            building the systems behind them. My current toolkit includes
            React, Next.js, TypeScript, Node.js, and PostgreSQL.
          </p>
        </div>
      </Container>
      <Projects />
      <Experience />
      <Blog />
    </main>
  );
}
