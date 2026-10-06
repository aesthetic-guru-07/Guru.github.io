import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiArrowRight, HiCode } from 'react-icons/hi';
import GlowCard from './GlowCard';
import TiltCard from './TiltCard';
import './Projects.css';

interface Project {
  title: string;
  type: string;
  description: string;
  tags: string[];
  accent: string;
  index: string;
  url: string;
  source: string;
}

const PROJECTS: Project[] = [
  { title: 'Product Experience Lab', type: 'Web app', description: 'A research-driven product workspace that turns customer insights into prioritized product decisions.', tags: ['React', 'TypeScript', 'Data Viz'], accent: '#59f3ff', index: '01', url: '#', source: '#contact' },
  { title: 'Signal Commerce', type: 'E-commerce', description: 'A conversion-focused commerce experience with dynamic storefronts, personalized journeys, and resilient checkout flows.', tags: ['React', 'Node.js', 'Stripe'], accent: '#b18cff', index: '02', url: '#', source: '#contact' },
  { title: 'Flowboard', type: 'Dashboard', description: 'A collaborative operational dashboard designed to make complex workflow intelligence instantly actionable.', tags: ['Next.js', 'PostgreSQL', 'UX'], accent: '#7ef7c3', index: '03', url: '#', source: '#contact' },
];

const SIDE_PROJECTS = [
  { title: 'Motion System Kit', summary: 'Reusable interface animation primitives.', href: '#contact' },
  { title: 'Portfolio Builder', summary: 'Flexible presentation framework for creative teams.', href: '#contact' },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects__container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-header__label">Selected work</span>
          <h2 className="section-header__title">Products shaped for <span className="gradient-text">clarity, momentum, and growth.</span></h2>
        </motion.div>

        <p className="projects__intro">Each project blends strategy, interface design, and engineering to create experiences that feel premium and perform under real-world pressure.</p>

        <div className="projects__featured">
          {PROJECTS.map((project, index) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: index * 0.09 }}>
              <TiltCard maxTilt={8} scale={1.025}>
                <GlowCard className="projects__card interactive" glowColor={`${project.accent}40`}>
                  <div className="projects__card-visual" style={{ background: `linear-gradient(135deg, ${project.accent}14, rgba(9,13,23,0.96) 55%, rgba(177,140,255,0.12))` }}>
                    <span className="projects__card-number">{project.index}</span>
                    <div className="projects__card-graphic"><HiCode /></div>
                  </div>

                  <div className="projects__card-body">
                    <div className="projects__card-header">
                      <h3 className="projects__card-title">{project.title}</h3>
                      <span className="projects__card-type">{project.type}</span>
                    </div>
                    <p className="projects__card-description">{project.description}</p>

                    <div className="projects__card-tags">
                      {project.tags.map((tag) => <span key={tag} className="projects__card-tag">{tag}</span>)}
                    </div>

                    <div className="projects__card-actions">
                      <a href={project.url} className="projects__card-link projects__card-link--primary interactive" aria-label={`View ${project.title}`}>
                        View project <HiArrowRight />
                      </a>
                      <a href={project.source} className="projects__card-link interactive" aria-label={`Request source for ${project.title}`}>
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </GlowCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="projects__compact">
          {SIDE_PROJECTS.map((project, index) => (
            <motion.a key={project.title} href={project.href} className="projects__compact-card interactive" initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.35 + index * 0.08 }}>
              <div className="projects__compact-meta">
                <h3 className="projects__compact-name">{project.title}</h3>
                <p className="projects__compact-summary">{project.summary}</p>
              </div>
              <HiArrowRight className="projects__compact-icon" size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}