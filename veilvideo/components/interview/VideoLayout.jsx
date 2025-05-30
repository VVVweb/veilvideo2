
import React from 'react';
import { motion } from 'framer-motion';
import VideoFeed from '@/components/interview/VideoFeed';
import EngagementVisualizer from '@/components/interview/EngagementVisualizer';

const VideoLayout = ({
  localVideoRef,
  remoteVideoRef,
  localAcsStream,
  remoteAcsStream,
  candidateEngagementScore,
  candidateGazeData,
  isInterviewActiveForVisualizer,
  currentEngagementStage,
}) => {

  const videoWindowStyle = (stage) => {
    switch(stage) {
      case 'pre-interview':
      case 'idle': return 'ddr-video-window-idle';
      case 'low': return 'ddr-video-window-low';
      case 'medium': return 'ddr-video-window-medium';
      case 'high': return 'ddr-video-window-high';
      default: return '';
    }
  };
  
  return (
    <div className="lg:col-span-2 space-y-2 md:space-y-4 flex flex-col h-full min-h-0">
      <motion.div 
        className={`aspect-video bg-black rounded-lg overflow-hidden relative flex-grow min-h-[200px] border-2 transition-all duration-500 ${videoWindowStyle(currentEngagementStage)}`}
        layout
      >
        { remoteAcsStream ? (
          <VideoFeed type="remote" videoRef={remoteVideoRef} stream={remoteAcsStream} label="Candidate Video (ACS)" />
        ) : (
          <EngagementVisualizer 
            engagementScore={candidateEngagementScore} 
            gazeData={candidateGazeData} 
            isInterviewActive={isInterviewActiveForVisualizer} 
          />
        )}
        <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded z-30">
          { remoteAcsStream ? "Candidate via ACS Call" : "Candidate's Engagement Visualizer" }
        </div>
      </motion.div>
      <div className="flex space-x-2 md:space-x-4 h-1/3 max-h-[180px] md:max-h-[220px]">
        <motion.div 
          className={`aspect-video bg-black rounded-lg overflow-hidden w-1/2 md:w-1/3 border-2 transition-all duration-500 ${videoWindowStyle(currentEngagementStage)}`}
          layout
        >
          <VideoFeed type="local" videoRef={localVideoRef} stream={localAcsStream} label="Your Video (Interviewer)" />
        </motion.div>
        
        <div className="flex-grow p-2 md:p-3 bg-black/50 rounded-lg overflow-y-auto glassmorphism border-border/20">
            <h3 className="text-sm md:text-md font-semibold text-neon-pink mb-1 md:mb-2">Interviewer Tips</h3>
            <ul className="text-xs md:text-sm text-electric-blue/80 list-disc list-inside space-y-1">
                <li>Maintain a professional demeanor.</li>
                <li>Ask clear and concise questions.</li>
                <li>Listen actively to the candidate.</li>
                <li>Take notes on key responses.</li>
                <li>Ensure a fair and unbiased evaluation.</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default VideoLayout;
