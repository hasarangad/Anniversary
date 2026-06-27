import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import TimeTogether from './components/TimeTogether'
import Gallery from './components/Gallery'
import Reasons from './components/Reasons'
import LoveLetter from './components/LoveLetter'
import FloatingHearts from './components/FloatingHearts'
import CursorTrail from './components/CursorTrail'
import LockScreen from './components/LockScreen'
import WaitingPage from './components/WaitingPage'
import backgroundMusic from './assets/audio/Ed Sheeran - Perfect (Official Music Video).mp3'

function App() {
  const [appState, setAppState] = useState('locked'); // 'locked', 'main', 'countdown'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playAudio, setPlayAudio] = useState(false);
  const [viewMode, setViewMode] = useState('presentation'); // 'presentation' or 'website'
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (playAudio && audioRef.current) {
      audioRef.current.currentTime = 20; // Skip first 20 seconds
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    } else if (!playAudio && audioRef.current) {
      audioRef.current.pause();
    }
  }, [playAudio]);

  useEffect(() => {
    const checkTime = () => {
      const hours = new Date().getHours();
      // Night mode between 18:00 (6 PM) and 05:59 (before 6 AM)
      if (hours >= 18 || hours < 6) {
        document.body.classList.add('night-mode');
      } else {
        document.body.classList.remove('night-mode');
      }
    };

    checkTime(); // Check immediately on mount
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (viewMode === 'website') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { threshold: 0.15 });

      // Use a small timeout to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
          observer.observe(el);
        });
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }
  }, [viewMode]);

  const handleUnlock = (state, shouldPlayAudio, mode) => {
    setAppState(state);
    setPlayAudio(shouldPlayAudio);
    setViewMode(mode || 'presentation');
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, 4));
  };

  if (appState === 'locked') {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  if (appState === 'countdown') {
    return <WaitingPage />;
  }

  if (viewMode === 'website') {
    return (
      <div className="website-container">
        <audio ref={audioRef} src={backgroundMusic} loop />
        <CursorTrail />
        <FloatingHearts />
        <Hero viewMode="website" />
        <TimeTogether viewMode="website" />
        <Gallery viewMode="website" />
        <Reasons viewMode="website" />
        <LoveLetter viewMode="website" />
      </div>
    );
  }

  return (
    <div className="slideshow-container">
      <audio ref={audioRef} src={backgroundMusic} loop />
      <CursorTrail />
      <FloatingHearts />
      {currentSlide === 0 && <Hero onComplete={nextSlide} />}
      {currentSlide === 1 && <TimeTogether onComplete={nextSlide} />}
      {currentSlide === 2 && <Gallery onComplete={nextSlide} />}
      {currentSlide === 3 && <Reasons onComplete={nextSlide} />}
      {currentSlide === 4 && <LoveLetter />}
    </div>
  )
}

export default App
