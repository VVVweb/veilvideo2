
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, CornerRightUp, CornerUpLeft, CornerDownRight } from 'lucide-react'; // Using more arrow types

const arrowIcons = {
  up: ArrowUp,
  down: ArrowDown,
  left: ArrowLeft,
  right: ArrowRight,
  upLeft: CornerUpLeft,
  upRight: CornerRightUp,
  downRight: CornerDownRight,
};

const arrowPositions = [
  { direction: 'up', top: '10%', left: '50%', transform: 'translateX(-50%)', color: 'text-ddr-arrow-pink' },
  { direction: 'down', bottom: '10%', left: '50%', transform: 'translateX(-50%)', color: 'text-ddr-arrow-blue' },
  { direction: 'left', left: '10%', top: '50%', transform: 'translateY(-50%)', color: 'text-ddr-arrow-green' },
  { direction: 'right', right: '10%', top: '50%', transform: 'translateY(-50%)', color: 'text-ddr-arrow-yellow' },
  { direction: 'upLeft', top: '20%', left: '20%', color: 'text-electric-blue' },
  { direction: 'upRight', top: '20%', right: '20%', color: 'text-neon-pink' },
  { direction: 'downRight', bottom: '20%', right: '20%', color: 'text-flame-orange' },
];

const DDRArrows = ({ engagementStage }) => {
  if (engagementStage === 'idle' || engagementStage === 'pre-interview') {
    return null;
  }

  const getArrowAnimation = (index) => {
    let animationProps = {
      initial: { opacity: 0, y: 20, scale: 0.5 },
      animate: { opacity: 0, y: -20, scale: 1.2 },
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        delay: index * 0.3,
        ease: "linear"
      }
    };

    if (engagementStage === 'low') {
      animationProps.animate.opacity = [0, 0.3, 0];
      animationProps.transition.duration = 3;
      animationProps.initial.y = 5;
      animationProps.animate.y = -5;
    } else if (engagementStage === 'medium') {
      animationProps.animate.opacity = [0, 0.7, 0];
      animationProps.transition.duration = 1.5;
    } else if (engagementStage === 'high') {
      animationProps.animate.opacity = [0, 1, 0];
      animationProps.transition.duration = 0.8;
      animationProps.initial.scale = 0.8;
      animationProps.animate.scale = 1.5;
    }
    return animationProps;
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {arrowPositions.map((arrow, index) => {
        const IconComponent = arrowIcons[arrow.direction] || ArrowUp;
        const animation = getArrowAnimation(index);
        return (
          <motion.div
            key={index}
            className={`ddr-arrow ${arrow.color}`}
            style={{ top: arrow.top, bottom: arrow.bottom, left: arrow.left, right: arrow.right, transform: arrow.transform }}
            initial={animation.initial}
            animate={animation.animate}
            transition={animation.transition}
          >
            <IconComponent size={engagementStage === 'high' ? 64 : 48} strokeWidth={engagementStage === 'high' ? 3 : 2} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default DDRArrows;
