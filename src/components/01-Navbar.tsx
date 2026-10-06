import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let current = activeSection;

      for (let index = NAV_ITEMS.length - 1; index >= 0; index -= 1) {
        const item = NAV_ITEMS[index];
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPosition) {
          current = item.id;
          break;
        }
      }

      setActiveSection((previous) => (previous !== current ? current : previous));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  useEffect(() => {
    const index = NAV_ITEMS.findIndex((item) => item.id === activeSection);
    const link = navLinksRef.current[index];
    if (link && indicatorRef.current) {
      indicatorRef.current.style.left = `${link.offsetLeft}px`;
      indicatorRef.current.style.width = `${link.offsetWidth}px`;
    }
  }, [activeSection]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <div className="navbar__inner">
        <MagneticButton strength={0.18} radius={90}>
          <motion.a
            href="#home"
            className="navbar__logo interactive"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('home');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className="navbar__logo-bracket">&lt;</span>
            <span className="navbar__logo-name">Guru</span>
            <span className="navbar__logo-bracket">/&gt;</span>
          </motion.a>
        </MagneticButton>

        <div className="navbar__links">
          <div ref={indicatorRef} className="navbar__indicator" />
          {NAV_ITEMS.map((item, index) => (
            <MagneticButton key={item.id} strength={0.12} radius={70}>
              <a
                ref={(element) => {
                  navLinksRef.current[index] = element;
                }}
                href={`#${item.id}`}
                className={`navbar__link interactive ${activeSection === item.id ? 'navbar__link--active' : ''}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(item.id);
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span className="navbar__link-glow" layoutId="navGlow" transition={{ type: 'spring', stiffness: 300, damping: 24 }} />
                )}
              </a>
            </MagneticButton>
          ))}
        </div>

        <MagneticButton strength={0.22} radius={100}>
          <motion.a
            href="#contact"
            className="navbar__cta interactive"
            onClick={(event) => {
              event.preventDefault();
              scrollTo('contact');
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>Start a Project</span>
            <span className="navbar__cta-glow" />
          </motion.a>
        </MagneticButton>

        <motion.button
          type="button"
          className="navbar__hamburger interactive"
          onClick={() => setMobileOpen((previous) => !previous)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <HiX size={20} />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <HiMenu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0, y: -14 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_ITEMS.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar__mobile-link ${activeSection === item.id ? 'navbar__mobile-link--active' : ''}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(item.id);
                }}
                initial={{ x: -18, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.04 }}
              >
                <span className="navbar__mobile-num">{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}