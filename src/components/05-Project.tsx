import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import TiltCard from './TiltCard';
import GlowCard from './GlowCard';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl: string;
  codeUrl: string;
  featured: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'A full-featured online store with real-time inventory, cart system, Stripe payments, and admin dashboard built with React + Node.js.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'AI Chat Application',
    description:
      'Real-time messaging app with AI-powered responses, speech-to-text, and multi-language support. WebSocket-based architecture.',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'WebSocket'],
    image: '',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Task Management Dashboard',
    description:
      'Kanban-style project management tool with drag-and-drop, real-time collaboration, and analytics dashboard.',
    tags: ['React', 'Firebase', 'Tailwind', 'DnD'],
    image: '',
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'Portfolio Generator',
    description:
      'A no-code portfolio builder that lets developers create stunning portfolios from a JSON config file.',
    tags: ['TypeScript', 'Vite', 'CSS3'],
    image: '',
    liveUrl: '#',
    codeUrl: '#',
    featured: false,
  },
  {
    id: 5,
    title: 'Weather Analytics',
    description:
      'Real-time weather data visualization with interactive charts, city comparison, and 7-day forecasts.',
    tags: ['React', 'D3.js', 'API', 'Python'],
    image: '',
    liveUrl: '#',
    codeUrl: '#',
    featured: false,
  },
  {
    id: 6,
    title: 'Dev Blog Platform',
    description:
      'Full-stack blog with MDX support, syntax highlighting, search, comments, and SEO optimization.',
    tags: ['Next.js', 'MDX', 'PostgreSQL', 'Vercel'],
    image: '',
    liveUrl: '#',
    codeUrl: '#',
    featured: false,
  },
];

/* Dynamic gradient backgrounds for project cards */
const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [flippedId, setFlippedId] = useState<number | null>(null);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects__container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span className="section-header__label" whileHover={{ scale: 1.05 }}>
            Portfolio
          </motion.span>
          <h2 className="section-header__title">
            Featured
            <br />
            <span className="gradient-text">projects</span>
          </h2>
        </motion.div>

        {/* Featured Projects — 3D Flip Cards */}
        <div className="projects__featured">
          {PROJECTS.filter((p) => p.featured).map((project, i) => (
            <motion.div
              key={project.id}
              className="projects__flip-container"
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, type: 'spring', stiffness: 100 }}
            >
              <TiltCard maxTilt={8} scale={1.02}>
                <GlowCard className="projects__featured-card glass interactive">
                  <motion.div
                    className="projects__card-flipper"
                    animate={{ rotateY: flippedId === project.id ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front */}
                    <div
                      className="projects__card-front"
                      onMouseEnter={() => setHoveredId(project.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Card Image/Gradient */}
                      <div className="projects__featured-image" style={{ background: GRADIENTS[i] }}>
                        <div className="projects__featured-image-overlay">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                          >
                            <HiCode size={48} />
                          </motion.div>
                        </div>
                        {/* Hover links */}
                        <AnimatePresence>
                          {hoveredId === project.id && (
                            <motion.div
                              className="projects__featured-links"
                              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.a
                                href={project.liveUrl}
                                className="projects__link-btn interactive"
                                aria-label="Live demo"
                                whileHover={{ scale: 1.15, background: 'var(--primary-500)' }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.05 }}
                              >
                                <HiExternalLink size={18} />
                              </motion.a>
                              <motion.a
                                href={project.codeUrl}
                                className="projects__link-btn interactive"
                                aria-label="Source code"
                                whileHover={{ scale: 1.15, background: 'var(--primary-500)' }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                              >
                                <FaGithub size={18} />
                              </motion.a>
                              <motion.button
                                className="projects__link-btn projects__flip-btn interactive"
                                onClick={(e) => { e.stopPropagation(); setFlippedId(project.id); }}
                                whileHover={{ scale: 1.15, background: 'var(--accent-500)' }}
                                whileTap={{ scale: 0.9 }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.15 }}
                                aria-label="More info"
                              >
                                ↻
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Card Body */}
                      <div className="projects__featured-body">
                        <h3 className="projects__featured-title">{project.title}</h3>
                        <p className="projects__featured-desc">{project.description}</p>
                        <div className="projects__featured-tags">
                          {project.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              className="projects__tag"
                              whileHover={{ scale: 1.1, background: 'rgba(139,69,255,0.2)' }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="projects__card-back">
                      <div className="projects__card-back-content">
                        <h3 className="projects__featured-title">{project.title}</h3>
                        <p className="projects__card-back-desc">{project.description}</p>
                        <div className="projects__card-back-links">
                          <a href={project.liveUrl} className="hero__btn hero__btn--primary interactive">
                            Live Demo <HiExternalLink />
                          </a>
                          <a href={project.codeUrl} className="hero__btn hero__btn--outline interactive">
                            Source <FaGithub />
                          </a>
                        </div>
                        <motion.button
                          className="projects__flip-back interactive"
                          onClick={() => setFlippedId(null)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          ← Back
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </GlowCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.h3
          className="projects__other-title"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          Other noteworthy projects
        </motion.h3>

        <div className="projects__other-grid">
          {PROJECTS.filter((p) => !p.featured).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.1, type: 'spring' }}
            >
              <TiltCard maxTilt={10} scale={1.03}>
                <GlowCard className="projects__other-card glass interactive">
                  <div className="projects__other-header">
                    <motion.div
                      className="projects__other-folder"
                      style={{ background: GRADIENTS[i + 3] }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    />
                    <div className="projects__other-links">
                      <motion.a
                        href={project.liveUrl}
                        className="projects__other-link interactive"
                        aria-label="Live demo"
                        whileHover={{ y: -3, color: '#a876ff' }}
                      >
                        <HiExternalLink size={18} />
                      </motion.a>
                      <motion.a
                        href={project.codeUrl}
                        className="projects__other-link interactive"
                        aria-label="Source code"
                        whileHover={{ y: -3, color: '#a876ff' }}
                      >
                        <FaGithub size={18} />
                      </motion.a>
                    </div>
                  </div>
                  <h4 className="projects__other-name">{project.title}</h4>
                  <p className="projects__other-desc">{project.description}</p>
                  <div className="projects__featured-tags">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="projects__tag"
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </GlowCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
