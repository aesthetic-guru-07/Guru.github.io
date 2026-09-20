import { useRef, useState, type ReactNode } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  SiReact, SiTypescript, SiJavascript, SiNodedotjs,
  SiPython, SiHtml5, SiCss, SiGit,
  SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql,
  SiDocker, SiFigma, SiFirebase, SiVite,
} from 'react-icons/si';
import TiltCard from './TiltCard';
import GlowCard from './GlowCard';
import './Skills.css';

interface Skill {
  name: string;
  icon: ReactNode;
  level: number;       // 0-100
  category: string;
  color: string;
}

const SKILLS: Skill[] = [
  { name: 'React', icon: <SiReact />, level: 92, category: 'Frontend', color: '#61dafb' },
  { name: 'TypeScript', icon: <SiTypescript />, level: 88, category: 'Frontend', color: '#3178c6' },
  { name: 'JavaScript', icon: <SiJavascript />, level: 95, category: 'Frontend', color: '#f7df1e' },
  { name: 'Next.js', icon: <SiNextdotjs />, level: 80, category: 'Frontend', color: '#ffffff' },
  { name: 'HTML5', icon: <SiHtml5 />, level: 96, category: 'Frontend', color: '#e34f26' },
  { name: 'CSS3', icon: <SiCss />, level: 93, category: 'Frontend', color: '#1572b6' },
  { name: 'Tailwind', icon: <SiTailwindcss />, level: 87, category: 'Frontend', color: '#06b6d4' },
  { name: 'Vite', icon: <SiVite />, level: 85, category: 'Frontend', color: '#646cff' },
  { name: 'Node.js', icon: <SiNodedotjs />, level: 85, category: 'Backend', color: '#339933' },
  { name: 'Python', icon: <SiPython />, level: 82, category: 'Backend', color: '#3776ab' },
  { name: 'MongoDB', icon: <SiMongodb />, level: 78, category: 'Backend', color: '#47a248' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, level: 75, category: 'Backend', color: '#4169e1' },
  { name: 'Firebase', icon: <SiFirebase />, level: 80, category: 'Backend', color: '#ffca28' },
  { name: 'Git', icon: <SiGit />, level: 90, category: 'Tools', color: '#f05032' },
  { name: 'Docker', icon: <SiDocker />, level: 70, category: 'Tools', color: '#2496ed' },
  { name: 'Figma', icon: <SiFigma />, level: 75, category: 'Tools', color: '#f24e1e' },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Tools'];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills__container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span className="section-header__label" whileHover={{ scale: 1.05 }}>
            Skills & Tech
          </motion.span>
          <h2 className="section-header__title">
            My technology
            <br />
            <span className="gradient-text">arsenal</span>
          </h2>
        </motion.div>

        {/* Category Filter — with animated indicator */}
        <motion.div
          className="skills__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              className={`skills__filter-btn interactive ${activeCategory === cat ? 'skills__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  className="skills__filter-indicator"
                  layoutId="skillFilter"
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid — 3D Tilt + Glow */}
        <motion.div className="skills__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30, scale: 0.8, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.04, type: 'spring', stiffness: 200 }}
                layout
              >
                <TiltCard maxTilt={15} scale={1.06}>
                  <GlowCard
                    className="skills__card glass interactive"
                    glowColor={skill.color + '60'}
                  >
                    <motion.div
                      className="skills__card-icon"
                      style={{ color: skill.color }}
                      whileHover={{
                        scale: 1.3,
                        rotate: [0, -10, 10, 0],
                        filter: `drop-shadow(0 0 12px ${skill.color}80)`,
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      {skill.icon}
                    </motion.div>
                    <h3 className="skills__card-name">{skill.name}</h3>
                    <div className="skills__card-bar">
                      <motion.div
                        className="skills__card-fill"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}60, ${skill.color})`,
                          boxShadow: `0 0 12px ${skill.color}40`,
                        }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.2, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <span className="skills__card-level">{skill.level}%</span>
                  </GlowCard>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
