import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaDribbble } from 'react-icons/fa';
import MagneticButton from './MagneticButton';
import GlowCard from './GlowCard';
import TiltCard from './TiltCard';
import './Contact.css';

const CONTACT_INFO = [
  { icon: <HiMail />, label: 'Email', value: 'guru@example.com', href: 'mailto:guru@example.com' },
  { icon: <HiLocationMarker />, label: 'Location', value: 'India', href: '#' },
  { icon: <HiPhone />, label: 'Phone', value: '+91 XXXXX XXXXX', href: '#' },
];

const SOCIALS = [
  { icon: <FaGithub size={20} />, href: 'https://github.com', label: 'GitHub' },
  { icon: <FaLinkedin size={20} />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <FaTwitter size={20} />, href: 'https://twitter.com', label: 'Twitter' },
  { icon: <FaDribbble size={20} />, href: 'https://dribbble.com', label: 'Dribbble' },
];

// Confetti particle
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  rotation: number;
  targetRotation: number;
  scale: number;
  duration: number;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const spawnConfetti = () => {
    const colors = ['#a876ff', '#22d3ee', '#f59e0b', '#10b981', '#f093fb', '#667eea'];
    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        id: Date.now() + i,
        x: 50 + (Math.random() - 0.5) * 60,
        y: 50,
        targetX: (Math.random() - 0.5) * 300,
        targetY: -200 - Math.random() * 200,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        targetRotation: Math.random() * 720,
        scale: 0.5 + Math.random() * 1,
        duration: 1.5 + Math.random(),
      });
    }
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    spawnConfetti();
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      {/* Background decoration */}
      <div className="contact__glow" />

      {/* Confetti overlay */}
      <AnimatePresence>
        {confetti.length > 0 && (
          <div className="contact__confetti">
            {confetti.map((p) => (
              <motion.div
                key={p.id}
                className="contact__confetti-particle"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  background: p.color,
                  width: 8 * p.scale,
                  height: 8 * p.scale,
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: [0, p.targetY],
                  x: [p.targetX],
                  opacity: [1, 0],
                  rotate: p.rotation + p.targetRotation,
                }}
                transition={{ duration: p.duration, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="contact__container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span className="section-header__label" whileHover={{ scale: 1.05 }}>
            Contact
          </motion.span>
          <h2 className="section-header__title">
            Let's build something
            <br />
            <span className="gradient-text">amazing together</span>
          </h2>
          <p className="contact__subtitle">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Left — Form with enhanced inputs */}
          <motion.form
            className="contact__form glass glow-border"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={`contact__field ${focusedField === 'name' ? 'contact__field--focused' : ''}`}>
              <label htmlFor="contact-name" className="contact__label">
                <motion.span
                  animate={focusedField === 'name' || formState.name ? { y: -2, scale: 0.9, color: '#a876ff' } : {}}
                >
                  Name
                </motion.span>
              </label>
              <input
                id="contact-name"
                type="text"
                className="contact__input interactive"
                placeholder="Your full name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>
            <div className={`contact__field ${focusedField === 'email' ? 'contact__field--focused' : ''}`}>
              <label htmlFor="contact-email" className="contact__label">
                <motion.span
                  animate={focusedField === 'email' || formState.email ? { y: -2, scale: 0.9, color: '#a876ff' } : {}}
                >
                  Email
                </motion.span>
              </label>
              <input
                id="contact-email"
                type="email"
                className="contact__input interactive"
                placeholder="you@example.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>
            <div className={`contact__field ${focusedField === 'message' ? 'contact__field--focused' : ''}`}>
              <label htmlFor="contact-message" className="contact__label">
                <motion.span
                  animate={focusedField === 'message' || formState.message ? { y: -2, scale: 0.9, color: '#a876ff' } : {}}
                >
                  Message
                </motion.span>
              </label>
              <textarea
                id="contact-message"
                className="contact__textarea interactive"
                placeholder="Tell me about your project..."
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>
            <MagneticButton strength={0.2} radius={100}>
              <motion.button
                type="submit"
                className="contact__submit interactive"
                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(139,69,255,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.span
                      key="success"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      ✓ Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="contact__submit-glow" />
              </motion.button>
            </MagneticButton>
          </motion.form>

          {/* Right — Info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Contact cards with glow */}
            <div className="contact__info-cards">
              {CONTACT_INFO.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <TiltCard maxTilt={8} scale={1.02}>
                    <GlowCard className="contact__info-card glass interactive" style={{ display: 'block' }}>
                      <a href={info.href} style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
                        <motion.div
                          className="contact__info-icon"
                          whileHover={{ scale: 1.15, rotate: 10 }}
                        >
                          {info.icon}
                        </motion.div>
                        <div>
                          <span className="contact__info-label">{info.label}</span>
                          <span className="contact__info-value">{info.value}</span>
                        </div>
                      </a>
                    </GlowCard>
                  </TiltCard>
                </motion.div>
              ))}
            </div>

            {/* Socials — spring pop */}
            <div className="contact__socials-section">
              <h3 className="contact__socials-title">Follow me</h3>
              <div className="contact__socials">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact__social-btn interactive"
                    aria-label={s.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 400, damping: 15 }}
                    whileHover={{
                      y: -6,
                      scale: 1.15,
                      boxShadow: '0 10px 30px rgba(139,69,255,0.3)',
                      borderColor: 'rgba(139,69,255,0.5)',
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Animated Map decoration */}
            <div className="contact__map-decoration glass">
              <div className="contact__map-grid">
                {Array.from({ length: 25 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="contact__map-dot"
                    animate={{
                      opacity: [0.15, 0.4, 0.15],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.08,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
              <div className="contact__map-ping" />
              <span className="contact__map-label">📍 Based in India</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer with wave separator */}
      <div className="contact__wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="rgba(139,69,255,0.05)" />
        </svg>
      </div>

      <motion.footer
        className="contact__footer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        <div className="contact__footer-inner">
          <p className="contact__footer-text">
            Designed & Built{' '}
            <motion.span
              className="contact__footer-heart"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              
            </motion.span>{' '}
            by <span className="gradient-text">Guru</span>
          </p>
          <p className="contact__footer-copyright">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </motion.footer>
    </section>
  );
}
