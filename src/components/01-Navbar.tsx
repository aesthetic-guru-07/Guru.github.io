import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import MagneticButton from './MagneticButton';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate the indicator pill
  useEffect(() => {
    const idx = NAV_ITEMS.findIndex((item) => item.id === activeSection);
    const el = navLinksRef.current[idx];
    if (el && indicatorRef.current) {
      indicatorRef.current.style.left = el.offsetLeft + 'px';
      indicatorRef.current.style.width = el.offsetWidth + 'px';
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <MagneticButton strength={0.2} radius={100}>
          <motion.a
            href="#home"
            className="navbar__logo interactive"
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="navbar__logo-bracket">&lt;</span>
            <span className="navbar__logo-name">Guru</span>
            <span className="navbar__logo-bracket">/&gt;</span>
          </motion.a>
        </MagneticButton>

        {/* Desktop Links */}
        <div className="navbar__links">
          <div ref={indicatorRef} className="navbar__indicator" />
          {NAV_ITEMS.map((item, i) => (
            <MagneticButton key={item.id} strength={0.15} radius={60}>
              <a
                ref={(el) => { navLinksRef.current[i] = el; }}
                href={`#${item.id}`}
                className={`navbar__link interactive ${activeSection === item.id ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    className="navbar__link-glow"
                    layoutId="navGlow"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </a>
            </MagneticButton>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton strength={0.3} radius={100}>
          <motion.a
            href="#contact"
            className="navbar__cta interactive"
            onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(139,69,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="navbar__cta-text">Let's Talk</span>
            <span className="navbar__cta-glow" />
          </motion.a>
        </MagneticButton>

        {/* Mobile toggle */}
        <motion.button
          className="navbar__hamburger interactive"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          whileTap={{ scale: 0.85 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <HiX size={24} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <HiMenu size={24} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
            exit={{ opacity: 0, height: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar__mobile-link ${activeSection === item.id ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                initial={{ x: -30, opacity: 0, filter: 'blur(5px)' }}
                animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
              >
                <span className="navbar__mobile-num">0{i + 1}.</span>
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
