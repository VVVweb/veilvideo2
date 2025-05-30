
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import DDRArrows from './DDRArrows';
import EngagementTextOverlay from './EngagementTextOverlay';
import { Eye } from 'lucide-react';

const EngagementVisualizer = ({ engagementScore = 0, gazeData, isInterviewActive = false }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [heatmapPoints, setHeatmapPoints] = useState([]);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 200 });
  
  const engagementStage = useMemo(() => {
    if (!isInterviewActive) return 'pre-interview';
    if (engagementScore === -1 || engagementScore === undefined) return 'idle';
    if (engagementScore < 40) return 'low';
    if (engagementScore < 70) return 'medium';
    return 'high';
  }, [engagementScore, isInterviewActive]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setCanvasSize({ width, height });
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => {
      if (containerRef.current) resizeObserver.unobserve(containerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!gazeData || !isInterviewActive || canvasSize.width === 0 || canvasSize.height === 0) return;
    setHeatmapPoints(prev => [
      ...prev.slice(-20),
      {
        x: gazeData.x * canvasSize.width,
        y: gazeData.y * canvasSize.height,
        intensity: Math.max(0.1, (engagementScore || 0) / 100),
      },
    ]);
  }, [gazeData, engagementScore, canvasSize, isInterviewActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInterviewActive || canvasSize.width === 0 || canvasSize.height === 0) {
        if(canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        return;
    };
    
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    heatmapPoints.forEach(pt => {
      const radius = Math.max(5, Math.min(canvas.width, canvas.height) * 0.05);
      const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, radius);
      const alpha = Math.min(1, pt.intensity * 1.5);
      
      let color1 = 'rgba(255, 255, 255, 0.7)';
      if(engagementStage === 'low') { color1 = `rgba(255, 69, 0, ${alpha})`;}
      else if(engagementStage === 'medium') { color1 = `rgba(255, 0, 255, ${alpha})`;}
      else if(engagementStage === 'high') { color1 = `rgba(0, 255, 255, ${alpha})`;}

      grd.addColorStop(0, color1);
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [heatmapPoints, canvasSize, engagementStage, isInterviewActive]);

  const backgroundClasses = {
    'pre-interview': 'ddr-background-grid',
    'idle': 'ddr-background-grid ddr-background-grid-sparkle',
    'low': 'ddr-background-flicker',
    'medium': 'ddr-background-stardust',
    'high': 'ddr-background-stardust animate-ddr-flame-border',
  };
  
  const stardustParticles = useMemo(() => {
    if (engagementStage !== 'medium' && engagementStage !== 'high') return [];
    return Array.from({ length: engagementStage === 'high' ? 50 : 20 }).map((_, i) => {
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * 5;
        const size = Math.random() * 2 + 1;
        let color = 'bg-electric-blue';
        if (i % 3 === 0) color = 'bg-neon-pink';
        if (i % 4 === 0 && engagementStage === 'high') color = 'bg-flame-orange';

        return (
          <motion.div
            key={i}
            className={`ddr-stardust-particle ${color}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            initial={{ y: Math.random() * canvasSize.height, opacity: 0 }}
            animate={{ 
                y: Math.random() * -canvasSize.height, 
                opacity: [0, 0.8, 0],
                x: (Math.random() -0.5) * (canvasSize.width/2)
            }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay }}
          />
        );
    });
  }, [engagementStage, canvasSize.height, canvasSize.width]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full flex flex-col overflow-hidden glassmorphism border-border/30 rounded-lg", backgroundClasses[engagementStage])}>
      { (engagementStage === 'medium' || engagementStage === 'high') && stardustParticles }
      
      <DDRArrows engagementStage={engagementStage} />
      <EngagementTextOverlay engagementStage={engagementStage} engagementScore={engagementScore} />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />
      {(engagementStage === 'pre-interview' || engagementStage === 'idle') && (
         <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <Eye className="h-24 w-24 text-electric-blue/30 animate-ddr-pulse" />
        </div>
      )}
    </div>
  );
};

export default EngagementVisualizer;
