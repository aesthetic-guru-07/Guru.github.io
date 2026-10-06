import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiAcademicCap, HiCode, HiGlobe, HiLightningBolt, HiSparkles } from 'react-icons/hi';
import AnimatedCounter from './AnimatedCounter';
import './About.css';

const STATS = [
  { value: '3+', label: 'Years building', icon: <HiAcademicCap /> },
  { value: '20+', label: 'Products shipped', icon: <HiCode /> },
  { value: '15+', label: 'Tools mastered', icon: <HiLightningBolt /> },
  { value: '100%', label: 'Curiosity', icon: <HiGlobe /> },
];

const TERMINAL_LINES = [
  { text: 'guru@portfolio:~$ whoami', className: 'about__terminal-line--command' },
  { text: 'Guru • Creative Developer', className: 'about__terminal-line--accent' },
  { text: 'guru@portfolio:~$ cat profile.md', className: 'about__terminal-line--command' },
  { text: 'Designing systems • Engineering interfaces • Shipping clarity', className: 'about__terminal-line' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' });
  const [linesVisible, setLinesVisible] = useState(0);

  useEffect(() => {
    if (!isInView || linesVisible >= TERMINAL_LINES.length) return;
    const timer = window.setTimeout(() => setLinesVisible((previous) => previous + 1), 420);
    return () => window.clearTimeout(timer);
  }, [isInView, linesVisible]);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-header__label">About</span>
          <h2 className="section-header__title">Building thoughtful experiences from <span className="gradient-text">idea to launch.</span></h2>
        </motion.div>

        <div className="about__grid">
          <motion.div className="about__text" initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, delay: 0.12 }}>
            <p className="about__eyebrow">My approach</p>
            <p className="about__paragraph">I&apos;m a developer who believes great digital products feel effortless because every detail has been considered — motion, hierarchy, performance, and clarity.</p>
            <p className="about__paragraph">I work across the full product journey, from understanding the problem to transforming it into a polished interface that feels fast, intuitive, and unmistakably human.</p>
            <p className="about__paragraph">Whether I&apos;m refining a user flow or architecting a scalable front end, I focus on outcomes that are measurable, maintainable, and memorable.</p>

            <div className="about__signature">
              <span className="about__signature-mark"><HiSparkles /></span>
              <span className="about__signature-text"><strong>Designing with purpose</strong> Crafting digital experiences that work beautifully.</span>
            </div>
          </motion.div>

          <motion.div className="about__story" initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75, delay: 0.2 }}>
            <div className="about__story-header">
              <span className="about__story-title">ubuntu terminal</span>
              <span className="about__story-status"><span className="about__story-status-dot" /> online</span>
            </div>
            <div className="about__terminal" role="img" aria-label="Linux terminal showing the developer profile">
              <div className="about__terminal-header">
                <span className="about__terminal-title">guru@linux: ~/workspace</span>
                <div className="about__terminal-controls" aria-hidden="true">
                  <span className="about__terminal-control about__terminal-control--minimize" aria-label="Minimize" />
                  <span className="about__terminal-control about__terminal-control--maximize" aria-label="Maximize" />
                  <span className="about__terminal-control about__terminal-control--close" aria-label="Close" />
                </div>
              </div>
              <div className="about__terminal-body">
                {TERMINAL_LINES.map((line, index) => (
                  <span key={`${line.text}-${index}`} className={`about__terminal-line ${index < linesVisible ? 'about__terminal-line--visible' : ''} ${line.className}`}>
                    {line.text}
                  </span>
                ))}
                <span className="about__terminal-cursor" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="about__stats" initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}>
          {STATS.map((stat, index) => (
            <div key={stat.label} className="about__stat">
              <span className="about__stat-icon">{stat.icon}</span>
              <AnimatedCounter target={stat.value} className="about__stat-value" duration={1.6} delay={0.2 + index * 0.12} />
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}