import NavBar from '@/components/NavBar';
import ProfileCard from '@/components/ProfileCard';
import MagneticFieldPattern from '@/components/MagneticFieldPattern';
import PortfolioToggle from '@/components/PortfolioToggle';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

import FooterCTA from '@/components/FooterCTA';
import NameBanner from '@/components/NameBanner';

export default function Home() {
  return (
    <main className="w-full bg-white overflow-x-hidden">
      {/* SECTION 1 - Hero */}
      <section className="relative w-[100vw] h-[100vh] overflow-hidden bg-[#F7F7F8]">
        <MagneticFieldPattern />
        <NavBar />
        <ProfileCard />
      </section>

      {/* SECTION 2 - Projects */}
      <section className="w-[100vw] flex justify-center bg-white pt-[48px] pb-[64px] relative z-10">
        <div className="w-full max-w-[1112px] px-[24px]">
          <PortfolioToggle />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[28px]">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 - Footer (CTA + NameBanner) */}
      <section className="w-[100vw] overflow-hidden bg-white">
        <FooterCTA />
        <NameBanner />
      </section>
    </main>
  );
}
