import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaDribbble, FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiCheck, HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi';
import MagneticButton from './MagneticButton';
import './Contact.css';

const CONTACT_INFO = [
  { icon: <HiMail />, label: 'Email', value: 'guruthedeveloper@gmail.com', href: 'mailto:guruthedeveloper@gmail.com' },
  { icon: <HiLocationMarker />, label: 'Location', value: 'India', href: '#contact' },
  { icon: <HiPhone />, label: 'Phone', value: '+91 XXXXX XXX98', href: 'tel:+91 XXXXX XXX98' },
];

const SOCIALS = [
  { icon: <FaGithub />, label: 'GitHub', href: '#contact' },
  { icon: <FaLinkedin />, label: 'LinkedIn', href: '#contact' },
  { icon: <FaDribbble />, label: 'Dribbble', href: '#contact' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    window.setTimeout(() => setSubmitted(false), 2400);
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="section-header__label">Contact</span>
          <h2 className="section-header__title">Have a bold idea? <span className="gradient-text">Let&apos;s build it.</span></h2>
        </motion.div>

        <p className="contact__subtitle">Tell me what you&apos;re creating, where it&apos;s getting stuck, or what momentum you want to unlock. I&apos;ll help you shape the next step.</p>

        <div className="contact__grid">
          <motion.form className="contact__form" initial={{ opacity: 0, x: -25 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} onSubmit={handleSubmit}>
            <div className="contact__field">
              <label htmlFor="contact-name" className="contact__label">Your name</label>
              <input id="contact-name" className="contact__input" type="text" placeholder="What should I call you?" value={formState.name} onChange={(event) => setFormState((previous) => ({ ...previous, name: event.target.value }))} required />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-email" className="contact__label">Email</label>
              <input id="contact-email" className="contact__input" type="email" placeholder="you@example.com" value={formState.email} onChange={(event) => setFormState((previous) => ({ ...previous, email: event.target.value }))} required />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message" className="contact__label">Project details</label>
              <textarea id="contact-message" className="contact__textarea" placeholder="Tell me about your vision, goals, timeline, or the challenge you need solved." value={formState.message} onChange={(event) => setFormState((previous) => ({ ...previous, message: event.target.value }))} required />
            </div>

            <MagneticButton strength={0.18} radius={90}>
              <motion.button type="submit" className="contact__submit interactive" whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }}>
                <span className="contact__submit-glow" />
                <span>{submitted ? 'Message received' : 'Send inquiry'}</span>
              </motion.button>
            </MagneticButton>

            <AnimatePresence mode="wait">
              {submitted && (
                <motion.p className="contact__form-note" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <HiCheck /> Thanks! Your message is ready for the next step.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.div className="contact__panel" initial={{ opacity: 0, x: 25 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <span className="contact__panel-heading">Let&apos;s connect</span>
            <h3 className="contact__panel-title">Strategy. Design. Code. Launch.</h3>

            <div className="contact__contact-list">
              {CONTACT_INFO.map((info) => (
                <a key={info.label} href={info.href} className="contact__info-card interactive">
                  <span className="contact__info-icon">{info.icon}</span>
                  <span>
                    <span className="contact__info-label">{info.label}</span>
                    <span className="contact__info-value">{info.value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div>
              <span className="contact__panel-heading">Follow the process</span>
              <div className="contact__socials">
                {SOCIALS.map((social) => (
                  <a key={social.label} href={social.href} className="contact__social-btn interactive" aria-label={social.label} >{social.icon}</a>
                ))}
              </div>
            </div>

            <span className="contact__status"><span className="contact__status-dot" /> Response time: usually within 24 hours</span>
          </motion.div>
        </div>
      </div>

      <footer className="contact__footer">
        <span>{new Date().getFullYear()} © All rights reserved.</span>
        <span>Developed by Guru</span>
      </footer>
    </section>
  );
}