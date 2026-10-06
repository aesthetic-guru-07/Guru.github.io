import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiArrowRight, HiCode } from 'react-icons/hi';
import MagneticButton from './MagneticButton';
import './Hero.css';

const SOCIALS = [
  { icon: <FaGithub size={18} />, label: 'GitHub', href: '#contact' },
  { icon: <FaLinkedin size={18} />, label: 'LinkedIn', href: '#contact' },
  { icon: <FaTwitter size={18} />, label: 'X / Twitter', href: '#contact' },
];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.25], [0, -80]);
  const panelY = useTransform(scrollYProgress, [0, 0.25], [0, 60]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero__backdrop" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--one" />
        <div className="hero__orb hero__orb--two" />
        <div className="hero__orb hero__orb--three" />
      </div>

      <div className="hero__container">
        <div className="hero__inner">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <span className="hero__eyebrow">Available for selected projects</span>
            <h1 className="hero__title">
              <span className="hero__title-line">I design and build</span>
              <span className="hero__title-line hero__title-line--offset gradient-text">impactful digital products.</span>
            </h1>
            <p className="hero__description">
              I turn complex ideas into elegant, scalable experiences through thoughtful design,
              clean engineering, and performance-focused development.
            </p>

            <div className="hero__actions">
              <MagneticButton strength={0.24} radius={110}>
                <motion.button type="button" className="hero__button hero__button--primary interactive" onClick={() => scrollTo('projects')} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Explore work
                  <span className="hero__button__shine" />
                  <HiArrowRight size={18} />
                </motion.button>
              </MagneticButton>

              <MagneticButton strength={0.2} radius={90}>
                <motion.button type="button" className="hero__button hero__button--secondary interactive" onClick={() => scrollTo('contact')} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  Let&apos;s talk
                </motion.button>
              </MagneticButton>
            </div>

            <div className="hero__socials" aria-label="Social links">
              {SOCIALS.map((social) => (
                <motion.a key={social.label} href={social.href} className="hero__social-link interactive" aria-label={social.label} whileHover={{ y: -4, color: '#59f3ff' }} whileTap={{ scale: 0.9 }}>
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <span className="hero__availability"><span className="hero__availability-dot" /> Currently booking Q1 collaborations</span>
          </motion.div>

          <motion.div className="hero__visual" style={{ y }} initial={{ opacity: 0, scale: 0.94, rotateY: -8 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
            <motion.div className="hero__panel" style={{ y: panelY }}>
              <div className="hero__panel-top">
                <span className="hero__panel-id">guru@linux: ~/workspace</span>
                <div className="hero__window-controls" aria-label="Window controls">
                  <span className="hero__window-control hero__window-control--minimize" aria-hidden="true" />
                  <span className="hero__window-control hero__window-control--maximize" aria-hidden="true" />
                  <span className="hero__window-control hero__window-control--close" aria-hidden="true" />
                </div>
              </div>

              <div className="hero__code" aria-label="Developer workspace preview">
                <span className="hero__code-line hero__code-line--comment">// build the next experience</span>
                <span className="hero__code-line"><span className="hero__code-line--key">const</span> <span className="hero__code-line--pink">focus</span> = <span className="hero__code-line--purple">['UX', 'Code', 'Performance']</span>;</span>
                <span className="hero__code-line"><span className="hero__code-line--key">const</span> <span className="hero__code-line--pink">flow</span> = <span className="hero__code-line--value">&apos;strategy → design → build&apos;</span>;</span>
                <span className="hero__code-line"><span className="hero__code-line--key">function</span> <span className="hero__code-line--pink">ship</span>() {'{'}</span>
                <span className="hero__code-line">  <span className="hero__code-line--key">return</span> <span className="hero__code-line--value">&apos;beautifully&apos;</span>;</span>
                <span className="hero__code-line">{'}'}</span>
              </div>

              <div className="hero__stats">
                <div className="hero__stat">
                  <strong>3+</strong>
                  <span>Years</span>
                </div>
                <div className="hero__stat">
                  <strong>20+</strong>
                  <span>Projects</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="hero__floating-icon" aria-hidden="true"><HiCode size={32} /></div>
    </section>
  );
}