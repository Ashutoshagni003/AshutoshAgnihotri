import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const SnowballCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [particles, setParticles] = useState([]);
  
  // Track raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const lastPos = useRef({ x: 0, y: 0 });
  const idleTimeout = useRef(null);

  // Apply smooth spring physics for the main trailing snowball
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Offset by half of the base size to center the main cursor
      mouseX.set(e.clientX - 15);
      mouseY.set(e.clientY - 15);

      const aboutSection = e.target.closest('#about');
      setIsVisible(!!aboutSection);

      // Handle idle state
      setIsIdle(false);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        setIsIdle(true);
      }, 350); // Becomes idle and vanishes after 350ms of no movement

      if (aboutSection) {
        // Enlarge snow ball if hovering over a clickable element
        const isClickable = e.target.closest('button, a, .tab-btn');
        setIsHoveringLink(!!isClickable);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Handle particle spawning based on ACTUAL rendered cursor position
  useEffect(() => {
    if (!isVisible) return;

    // Listen to the visual snowball's actual physics location to prevent particles 
    // from dropping 'ahead' of it at the raw invisible mouse pointer position.
    const unsubscribeX = cursorX.on("change", (latestX) => {
      const currentX = latestX + 15; // Center of the visual snowball
      const currentY = cursorY.get() + 15;

      const dx = currentX - lastPos.current.x;
      const dy = currentY - lastPos.current.y;
      const distance = Math.hypot(dx, dy);
      
      // Drop a trace of the ball frequently as it moves
      if (!isIdle && distance > 6) { 
        const id = Date.now() + Math.random();
        
        // Push a single exact coordinate copy of the current ball position
        setParticles(prev => [...prev.slice(-35), { id, x: currentX, y: currentY }]);
        lastPos.current = { x: currentX, y: currentY };

        // The trace fades out quickly
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== id));
        }, 500); 
      }
    });

    return () => {
      unsubscribeX();
    };
  }, [cursorX, cursorY, isVisible, isIdle]);

  // Dynamically toggle the native cursor visibility on the About section
  useEffect(() => {
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      if (isVisible && !isIdle) {
        aboutEl.classList.add('hide-native-cursor');
      } else {
        aboutEl.classList.remove('hide-native-cursor');
      }
    }
  }, [isVisible, isIdle]);

  // We rely on Framer Motion's opacity to hide the cursor gracefully, 
  // so we never force an immediate `return null` unmount.
  return (
    <>
      {/* Falling Snow Trail Particles -> Now a Ball Trace */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ 
              opacity: 0.8, // Start slightly transparent
              scale: 0.9,   // Slightly smaller than the main head
              x: p.x - 16,  // Centered exactly matching the 32x32 main ball
              y: p.y - 16 
            }}
            animate={{ 
              opacity: 0, 
              scale: 0 
              // Removed movement animation so it stays exactly where dropped like a trace
            }}
            transition={{ duration: 0.4, ease: "easeOut" }} // Fast phantom fade
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              // Exact same styles as the main snowball
              width: '32px', 
              height: '32px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(224, 242, 254, 0.9) 40%, rgba(186, 230, 253, 0.4) 100%)',
              boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(186, 230, 253, 0.8), inset -4px -4px 12px rgba(125, 211, 252, 0.2)',
              filter: 'blur(3.5px)',
              pointerEvents: 'none',
              zIndex: 9998 
            }}
          />
        ))}
      </AnimatePresence>

      {/* Main Snowball */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px', // Slightly larger core
          height: '32px',
          borderRadius: '50%',
          // Soft fluffy gradient fading to transparent edges
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, rgba(224, 231, 236, 0.9) 40%, rgba(208, 222, 230, 0.4) 100%)',
          border: 'none', // Removed sharp border
          boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(219, 242, 254, 0.8), inset -4px -4px 12px rgba(125, 211, 252, 0.2)',
          filter: 'blur(3.5px)', // Heavy blur to soften the entire orb completely
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          // Scale down and fade to 0 if the user is outside the About section OR idle
          scale: (!isVisible || isIdle) ? 0.3 : (isHoveringLink ? 1.5 : 1), 
          opacity: (!isVisible || isIdle) ? 0 : (isHoveringLink ? 0.7 : 1) 
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
};

export default SnowballCursor;
