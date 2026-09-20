import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import MagneticButton from './MagneticButton';
import FloatingElement from './FloatingElement';
import TextReveal from './TextReveal';
import './Hero.css';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const orb1Y = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const orb2Y = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const orb3Y = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const codeBlockY = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

  return (
    <section id="home" className="hero">
      {/* Aurora Borealis Effect */}
      <div className="hero__aurora">
        <div className="hero__aurora-blob hero__aurora-blob--1" />
        <div className="hero__aurora-blob hero__aurora-blob--2" />
        <div className="hero__aurora-blob hero__aurora-blob--3" />
      </div>

      {/* Floating orbs with scroll parallax */}
      <motion.div className="hero__orb hero__orb--1" style={{ y: orb1Y }} />
      <motion.div className="hero__orb hero__orb--2" style={{ y: orb2Y }} />
      <motion.div className="hero__orb hero__orb--3" style={{ y: orb3Y }} />

      <motion.div
        className="hero__container"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Badge */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 200 }}
        >
          <span className="hero__badge-dot" />
          <span>Available for freelance work</span>
        </motion.div>

        {/* Main heading — char-by-char reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="hero__title">
            <TextReveal text="Hi, I'm" mode="char" delay={0.7} staggerDelay={0.04} />
            <TextReveal text="Guru" mode="char" delay={1.0} staggerDelay={0.06} gradient className="hero__title-name" />
          </h1>
        </motion.div>

        {/* Typing subtitle */}
        <motion.div
          className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="hero__subtitle-prefix">{'>'} </span>
          <TypeAnimation
            sequence={[
              'Full Stack Developer',
              2000,
              'React Specialist',
              2000,
              'UI/UX Enthusiast',
              2000,
              'Problem Solver',
              2000,
              'Open Source Contributor',
              2000,
            ]}
            wrapper="span"
            speed={40}
            repeat={Infinity}
            cursor={true}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          I craft elegant, scalable digital experiences with modern web technologies.
          <br />
          Turning complex problems into beautiful, intuitive solutions.
        </motion.p>

        {/* CTA Buttons — Magnetic */}
        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          <MagneticButton strength={0.25} radius={120}>
            <motion.a
              href="#projects"
              className="hero__btn hero__btn--primary interactive"
              whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(139,69,255,0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
              <span className="hero__btn-glow" />
              <span className="hero__btn-shine" />
            </motion.a>
          </MagneticButton>

          <MagneticButton strength={0.25} radius={120}>
            <motion.a
              href="#contact"
              className="hero__btn hero__btn--outline interactive"
              whileHover={{ scale: 1.05, borderColor: 'rgba(139,69,255,0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </motion.a>
          </MagneticButton>
        </motion.div>

        {/* Social links — spring bounce */}
        <motion.div
          className="hero__socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {[
            { icon: <FaGithub size={20} />, href: 'https://github.com', label: 'GitHub' },
            { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: <FaTwitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
          ].map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link interactive"
              aria-label={social.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3 + i * 0.1, type: 'spring', stiffness: 300 }}
              whileHover={{ y: -5, scale: 1.15, color: '#a876ff' }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <HiArrowDown size={20} />
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>

      {/* Code decoration — 3D floating with parallax */}
      <FloatingElement amplitude={8} duration={5} delay={0.5}>
        <motion.div
          className="hero__code-block"
          initial={{ opacity: 0, x: 80, rotateY: -15 }}
          animate={{ opacity: 0.2, x: 0, rotateY: 0 }}
          transition={{ delay: 2, duration: 1.2 }}
          style={{ y: codeBlockY }}
        >
          <pre>
{`const guru = {
  role: "Full Stack Dev",
  passion: "Building UIs",
  stack: [
    "React", "TypeScript",
    "Node.js", "Python"
  ],
  motto: "Code with 💜"
};`}
          </pre>
        </motion.div>
      </FloatingElement>
    </section>
  );
}
