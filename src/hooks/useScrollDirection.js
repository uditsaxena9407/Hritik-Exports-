// src/hooks/useScrollDirection.js
import { useState, useEffect } from 'react';

const SCROLL_UP = 'up';
const SCROLL_DOWN = 'down';
const THRESHOLD = 50; // Distance in pixels to scroll before changing state

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState(SCROLL_UP);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollDirection = () => {
      // Don't update if we are near the top of the page
      if (window.scrollY < THRESHOLD) {
        setScrollDirection(SCROLL_UP);
        setLastScrollY(window.scrollY);
        ticking = false;
        return;
      }

      // Logic to determine direction
      if (window.scrollY > lastScrollY && (window.scrollY - lastScrollY > THRESHOLD)) {
        // Scrolling down
        setScrollDirection(SCROLL_DOWN);
      } else if (window.scrollY < lastScrollY && (lastScrollY - window.scrollY > 0)) {
        // Scrolling up
        setScrollDirection(SCROLL_UP);
      }
      
      setLastScrollY(window.scrollY > 0 ? window.scrollY : 0);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
};

export default useScrollDirection;