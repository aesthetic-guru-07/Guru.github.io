import { useRef, useState, useEffect } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { HiCode, HiLightningBolt, HiGlobe, HiAcademicCap } from 'react-icons/hi';
import AnimatedCounter from './AnimatedCounter';
import TiltCard from './TiltCard';
import GlowCard from './GlowCard';
import './About.css';

const STATS = [
  { value: '3+', label: 'Years Experience', icon: <HiAcademicCap /> },
  { value: '20+', label: 'Projects Completed', icon: <HiCode /> },
  { value: '15+', label: 'Technologies', icon: <HiLightningBolt /> },
  { value: '100%', label: 'Client Satisfaction', icon: <HiGlobe /> },
];

const TIMELINE = [
  {
    year: '2024',
    title: 'Full Stack Developer',
    description: 'Building scalable web applications with React, Node.js, and cloud services.',
  },
  {
    year: '2023',
    title: 'Frontend Specialist',
    description: 'Mastered React ecosystem, TypeScript, and modern CSS architecture.',
  },
  {
    year: '2022',
    title: 'Started Coding Journey',
    description: 'Began learning web development with HTML, CSS, JavaScript, and Python.',
  },
];

const TERMINAL_LINES = [
  { delay: 300, text: 'guru@ubuntu:~$ ', cls: 't-green', inline: true },
  { delay: 0, text: 'whoami', cls: 't-white', inline: true },
  { delay: 500, text: 'guru', cls: 't-cyan', inline: false },
  { delay: 250, text: 'guru@ubuntu:~$ ', cls: 't-green', inline: true },
  { delay: 0, text: 'cat about_me.txt', cls: 't-white', inline: true },
  { delay: 300, text: 'Full Stack Developer', cls: 't-dim', inline: false },
  { delay: 250, text: 'Building elegant digital experiences', cls: 't-dim', inline: false },
  { delay: 250, text: 'React • TypeScript • Node.js • UX', cls: 't-dim', inline: false },
  { delay: 250, text: 'Turning ideas into scalable, human-centered products.', cls: 't-dim', inline: false },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [terminalLines, setTerminalLines] = useState<number>(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Typing terminal effect
  useEffect(() => {
    if (!isInView) return;
    let timeout: ReturnType<typeof setTimeout>;
    let current = 0;
    const totalDelay = () => {
      if (current >= TERMINAL_LINES.length) return;
      const line = TERMINAL_LINES[current];
      timeout = setTimeout(() => {
        current++;
        setTerminalLines(current);
        totalDelay();
      }, line.delay);
    };
    const startDelay = setTimeout(totalDelay, 800);
    return () => {
      clearTimeout(timeout);
      clearTimeout(startDelay);
    };
  }, [isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about__container">
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="section-header__label"
            whileHover={{ scale: 1.05 }}
          >
            About Me
          </motion.span>
          <h2 className="section-header__title">
            Passionate about creating
            <br />
            <span className="gradient-text">digital excellence</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="about__grid">
          {/* Left — Text with word-by-word reveal */}
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              className="about__paragraph"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              I'm a <strong>Full Stack Developer</strong> who thrives at the intersection of 
              design and technology. With a keen eye for detail and a passion for clean code, 
              I build web applications that are not only functional but genuinely delightful to use.
            </motion.p>
            <motion.p
              className="about__paragraph"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              My approach combines deep technical knowledge with creative problem-solving. 
              I believe that great software should feel effortless — every interaction considered, 
              every animation purposeful, every line of code maintainable.
            </motion.p>
            <motion.p
              className="about__paragraph"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open source, or diving into the latest design trends. I'm always looking for 
              opportunities to learn and grow.
            </motion.p>

            {/* Animated Terminal */}
            <motion.div
              className="about__terminal"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              ref={terminalRef}
            >
              <div className="about__terminal-header about__terminal-header--windows">
                <span className="about__terminal-title">Linux Ubuntu</span>
                <div className="about__terminal-controls" aria-hidden="true">
                  <span className="about__terminal-control about__terminal-control--minimize">—</span>
                  <span className="about__terminal-control about__terminal-control--maximize">□</span>
                  <span className="about__terminal-control about__terminal-control--close">✕</span>
                </div>
              </div>
              <div className="about__terminal-body">
                <code>
                  {TERMINAL_LINES.slice(0, terminalLines).map((line, i) => (
                    <span key={i}>
                      <span className={line.cls}>{line.text}</span>
                      {!line.inline && <br />}
                    </span>
                  ))}
                  <span className="about__terminal-cursor">▊</span>
                </code>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Timeline */}
          <motion.div
            className="about__right"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="about__timeline">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  className="about__timeline-item"
                  variants={itemVariants}
                  whileHover={{ x: 6 }}
                >
                  <div className="about__timeline-marker">
                    <motion.span
                      className="about__timeline-dot"
                      animate={isInView ? {
                        boxShadow: [
                          '0 0 0 2px rgba(139,69,255,0.5)',
                          '0 0 0 6px rgba(139,69,255,0.2)',
                          '0 0 0 2px rgba(139,69,255,0.5)',
                        ],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    {i < TIMELINE.length - 1 && (
                      <motion.span
                        className="about__timeline-line"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ delay: 0.5 + i * 0.3, duration: 0.8 }}
                        style={{ transformOrigin: 'top' }}
                      />
                    )}
                  </div>
                  <div className="about__timeline-content">
                    <span className="about__timeline-year">{item.year}</span>
                    <h3 className="about__timeline-title">{item.title}</h3>
                    <p className="about__timeline-desc">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats — Animated Counters + Tilt + Glow */}
        <motion.div
          className="about__stats"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {STATS.map((stat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <TiltCard maxTilt={12} scale={1.04}>
                <GlowCard className="about__stat-card glass">
                  <div className="about__stat-icon">{stat.icon}</div>
                  <AnimatedCounter
                    target={stat.value}
                    className="about__stat-value gradient-text"
                    duration={2}
                    delay={0.3 + i * 0.15}
                  />
                  <span className="about__stat-label">{stat.label}</span>
                </GlowCard>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
