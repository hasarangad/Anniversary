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

function App() {
  const [appState, setAppState] = useState('locked'); // 'locked', 'main', 'countdown'
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // When appState changes to 'main', start auto scrolling
  useEffect(() => {
    if (appState === 'main') {
      setIsAutoScrolling(true);
    }
  }, [appState]);

  // Auto-scroll logic
  useEffect(() => {
    let animationFrameId;

    const scrollStep = () => {
      if (isAutoScrolling) {
        window.scrollBy(0, 1); // Scroll down 1 pixel per frame
        animationFrameId = requestAnimationFrame(scrollStep);
      }
    };

    if (isAutoScrolling) {
      animationFrameId = requestAnimationFrame(scrollStep);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoScrolling]);

  // Stop auto-scroll on user interaction
  useEffect(() => {
    const stopScrolling = () => {
      if (isAutoScrolling) {
        setIsAutoScrolling(false);
      }
    };

    if (appState === 'main') {
      window.addEventListener('wheel', stopScrolling);
      window.addEventListener('touchstart', stopScrolling);
      window.addEventListener('mousedown', stopScrolling);
      window.addEventListener('keydown', stopScrolling);

      return () => {
        window.removeEventListener('wheel', stopScrolling);
        window.removeEventListener('touchstart', stopScrolling);
        window.removeEventListener('mousedown', stopScrolling);
        window.removeEventListener('keydown', stopScrolling);
      };
    }
  }, [appState, isAutoScrolling]);

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

  if (appState === 'locked') {
    return <LockScreen onUnlock={(state) => setAppState(state)} />;
  }

  if (appState === 'countdown') {
    return <WaitingPage />;
  }

  return (
    <>
      <CursorTrail />
      <FloatingHearts />
      <Hero />
      <TimeTogether />
      <Gallery />
      <Reasons />
      <LoveLetter />
    </>
  )
}

export default App
