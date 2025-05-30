
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = {
  low: ["Let’s bring it back!", "Focus up 👀", "Eyes on the screen."],
  medium: ["Nice!", "Keep it going!", "Locked in!"],
  high: ["🔥 PERFECT FOCUS!", "Stellar Energy!"],
};

const EngagementTextOverlay = ({ engagementStage, engagementScore }) => {
  const [currentText, setCurrentText] = useState('');
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  useEffect(() => {
    let textInterval;
    if (engagementStage === 'low' || engagementStage === 'medium' || engagementStage === 'high') {
      const stageTexts = texts[engagementStage];
      setCurrentText(stageTexts[Math.floor(Math.random() * stageTexts.length)]);
      
      textInterval = setInterval(() => {
        setCurrentText(stageTexts[Math.floor(Math.random() * stageTexts.length)]);
      }, 5000); // Change text every 5 seconds
    } else {
      setCurrentText('');
    }
    return () => clearInterval(textInterval);
  }, [engagementStage]);

  useEffect(() => {
    if (engagementScore > 70) {
      setCombo(prev => prev + 1);
      setShowCombo(true);
    } else if (engagementScore < 40 && combo > 0) {
      setCombo(0); // Reset combo if engagement drops too low
      setShowCombo(false);
    } else if (engagementScore >= 40 && engagementScore <= 70 && combo > 0) {
      // Maintain combo in medium, but don't increment
    } else {
       setShowCombo(false);
    }

    // Hide combo after a few seconds if it's not being incremented
    let comboTimeout;
    if (showCombo) {
        comboTimeout = setTimeout(() => {
            if (engagementScore <= 70) setShowCombo(false); // Only hide if not high engagement
        }, 3000);
    }
    return () => clearTimeout(comboTimeout);

  }, [engagementScore]);


  const textVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: 'spring', stiffness: 200 } },
    exit: { opacity: 0, y: -20, scale: 0.8, transition: { duration: 0.3 } },
  };

  const comboVariants = {
    initial: { opacity: 0, scale: 0.5, y: -20 },
    animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 15 } },
    exit: { opacity: 0, scale: 0.5, y: 20 },
  };
  
  let textColor = 'text-foreground';
  if (engagementStage === 'low') textColor = 'text-flame-orange';
  if (engagementStage === 'medium') textColor = 'text-neon-pink';
  if (engagementStage === 'high') textColor = 'text-electric-blue';


  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {currentText && (
          <motion.div
            key={currentText}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`text-2xl md:text-4xl font-bold p-4 rounded-lg ${textColor} text-center`}
            style={{ textShadow: `0 0 10px currentColor, 0 0 15px ${textColor === 'text-foreground' ? 'rgba(255,255,255,0.3)' : 'currentColor'}` }}
          >
            {currentText}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCombo && combo > 3 && (
          <motion.div
            key={`combo-${combo}`}
            variants={comboVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-4 left-4 md:top-8 md:left-8 text-3xl md:text-5xl font-black text-glow-magenta p-2 rounded bg-black/30"
            style={{ textShadow: '0 0 8px #F0F, 0 0 12px #F0F' }}
          >
            Combo: x{combo}
          </motion.div>
        )}
      </AnimatePresence>
      
      {engagementStage === 'pre-interview' && (
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-xl md:text-2xl text-electric-blue/80 font-semibold"
        >
          <p>Interview starting soon…</p>
          <p className="text-base md:text-lg">Stay relaxed and ready.</p>
        </motion.div>
      )}
    </div>
  );
};

export default EngagementTextOverlay;
