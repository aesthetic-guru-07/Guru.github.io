import { useRef, useState, type ReactNode } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SiCss, SiDocker, SiFigma, SiFirebase, SiGit, SiHtml5, SiJavascript, SiMongodb, SiNextdotjs, SiNodedotjs, SiPostgresql, SiPython, SiReact, SiTailwindcss, SiTypescript, SiVite } from 'react-icons/si';
import TiltCard from './TiltCard';
import './Skills.css';

interface Skill {
  name: string;
  icon: ReactNode;
  level: number;
  category: 'Frontend' | 'Backend' | 'Design' | 'Tools';
  color: string;
}

const SKILLS: Skill[] = [
  { name: 'React', icon: <SiReact />, level: 95, category: 'Frontend', color: '#61dafb' },
  { name: 'TypeScript', icon: <SiTypescript />, level: 92, category: 'Frontend', color: '#3178c6' },
  { name: 'JavaScript', icon: <SiJavascript />, level: 94, category: 'Frontend', color: '#f7df1e' },
  { name: 'Next.js', icon: <SiNextdotjs />, level: 88, category: 'Frontend', color: '#ffffff' },
  { name: 'HTML5', icon: <SiHtml5 />, level: 96, category: 'Frontend', color: '#e34f26' },
  { name: 'CSS3', icon: <SiCss />, level: 93, category: 'Frontend', color: '#1572b6' },
  { name: 'Tailwind', icon: <SiTailwindcss />, level: 90, category: 'Frontend', color: '#06b6d4' },
  { name: 'Vite', icon: <SiVite />, level: 87, category: 'Frontend', color: '#646cff' },
  { name: 'Node.js', icon: <SiNodedotjs />, level: 86, category: 'Backend', color: '#3c873a' },
  { name: 'Python', icon: <SiPython />, level: 83, category: 'Backend', color: '#3776ab' },
  { name: 'MongoDB', icon: <SiMongodb />, level: 80, category: 'Backend', color: '#4db33d' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, level: 76, category: 'Backend', color: '#336791' },
  { name: 'Firebase', icon: <SiFirebase />, level: 78, category: 'Backend', color: '#ffca28' },
  { name: 'Figma', icon: <SiFigma />, level: 87, category: 'Design', color: '#f24e1e' },
  { name: 'Git', icon: <SiGit />, level: 90, category: 'Tools', color: '#f05032' },
  { name: 'Docker', icon: <SiDocker />, level: 74, category: 'Tools', color: '#2496ed' },
];

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Design', 'Tools'] as const;

type Category = (typeof CATEGORIES)[number];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = activeCategory === 'All' ? SKILLS : SKILLS.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="skills__container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-header__label">Capabilities</span>
          <h2 className="section-header__title">The tools behind <span className="gradient-text">high-converting experiences.</span></h2>
        </motion.div>

        <div className="skills__filters">
          {CATEGORIES.map((category) => (
            <motion.button key={category} type="button" className={`skills__filter-btn interactive ${activeCategory === category ? 'skills__filter-btn--active' : ''}`} onClick={() => setActiveCategory(category)} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              {category}
            </motion.button>
          ))}
        </div>

        <motion.div className="skills__grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, index) => (
              <motion.div key={skill.name} initial={{ opacity: 0, y: 18, scale: 0.92 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35, delay: index * 0.03 }} layout>
                <TiltCard maxTilt={8} scale={1.035}>
                  <motion.div className="skills__card glass" whileHover={{ y: -6 }} style={{ borderColor: `${skill.color}35` }}>
                    <div className="skills__card-icon" style={{ color: skill.color, boxShadow: `inset 0 0 0 1px ${skill.color}20` }}>{skill.icon}</div>
                    <h3 className="skills__card-name">{skill.name}</h3>
                    <div className="skills__card-bar">
                      <motion.div className="skills__card-fill" initial={{ width: 0 }} animate={isInView ? { width: `${skill.level}%` } : { width: 0 }} transition={{ duration: 0.9, delay: 0.15 + index * 0.04 }} style={{ background: `linear-gradient(90deg, ${skill.color}, rgba(255,255,255,0.9))` }} />
                    </div>
                    <div className="skills__card-meta"><span>{skill.category}</span><strong>{skill.level}%</strong></div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}