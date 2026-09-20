import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import './App.css';

// Background layers
import ParticleBackground from './components/ParticleBackground';
import GridBackground from './components/GridBackground';
import MouseGlow from './components/MouseGlow';
import CustomCursor from './components/CustomCursor';

// Sections
import Navbar from './components/01-Navbar';
import Hero from './components/02-Hero';
import About from './components/03-About';
import Skills from './components/04-Skills';
import Projects from './components/05-Project';
import Contact from './components/06-Contact';

/* ─────────────────── Splash Screen Component ─────────────────── */
function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="splash"
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="splash__logo"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <span className="splash__bracket gradient-text">&lt;</span>
        <span className="splash__name gradient-text">Guru</span>
        <span className="splash__bracket gradient-text">/&gt;</span>
      </motion.div>
      <motion.div
        className="splash__bar"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        style={{ maxWidth: '220px' }}
        transition={{ ease: 'linear' }}
      />
      <motion.span
        className="splash__text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}
      >
        loading experience...
      </motion.span>
    </motion.div>
  );
}

/* ─────────────────── Scroll Progress Bar ─────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div className="scroll-progress" style={{ scaleX }} />
  );
}

/* ─────────────────── Main App ─────────────────── */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Prevent scroll during splash
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showSplash]);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          {/* Global effects layer */}
          <GridBackground />
          <ParticleBackground />
          <MouseGlow />
          <CustomCursor />
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />

          {/* Page content */}
          <main ref={mainRef}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
