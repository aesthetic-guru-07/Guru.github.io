import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import './App.css';
import ParticleBackground from './components/ParticleBackground';
import GridBackground from './components/GridBackground';
import MouseGlow from './components/MouseGlow';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/01-Navbar';
import Hero from './components/02-Hero';
import About from './components/03-About';
import Skills from './components/04-Skills';
import Projects from './components/05-Project';
import Contact from './components/06-Contact';

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          window.clearInterval(timer);
          window.setTimeout(onComplete, 250);
          return 100;
        }
        return value + 2;
      });
    }, 28);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="splash__orb splash__orb--one" />
      <div className="splash__orb splash__orb--two" />
      <motion.div
        className="splash__brand"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <span className="splash__bracket">&lt;</span>
        <span className="splash__name">Guru</span>
        <span className="splash__bracket">/&gt;</span>
      </motion.div>
      <div className="splash__meta">
        <span>Creative Developer</span>
        <span>{progress}%</span>
      </div>
      <div className="splash__track" aria-hidden="true">
        <motion.div className="splash__bar" animate={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => setShowSplash(false), []);

  useEffect(() => {
    document.body.style.overflow = showSplash ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash]);

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen onComplete={handleSplashComplete} />}</AnimatePresence>
      {!showSplash && (
        <>
          <div className="app-shell">
            <GridBackground />
            <ParticleBackground />
            <MouseGlow />
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
          </div>
        </>
      )}
    </>
  );
}