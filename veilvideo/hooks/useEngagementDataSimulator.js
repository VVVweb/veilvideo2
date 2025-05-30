
import { useState, useEffect } from 'react';
import { interviewService } from '@/services/interviewService';

const useEngagementDataSimulator = (isActive, anonymousId, interval = 3000) => {
  const [candidateEngagementScore, setCandidateEngagementScore] = useState(-1);
  const [candidateGazeData, setCandidateGazeData] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    let engagementDataInterval;
    if (isActive) {
      setCandidateEngagementScore(0); // Initial score when active
      engagementDataInterval = setInterval(async () => {
        try {
          const analysisResult = await interviewService.analyzeFrame(null, anonymousId);
          setCandidateEngagementScore(analysisResult.engagementScore * 100);
          setCandidateGazeData({ x: analysisResult.gaze.x, y: analysisResult.gaze.y });
        } catch (error) {
          console.error("Error fetching/simulating candidate engagement data:", error);
          setCandidateEngagementScore(prev => Math.max(0, prev - 5)); 
          setCandidateGazeData({ x: 0.5, y: 0.5 });
        }
      }, interval);
    } else {
      setCandidateEngagementScore(-1); // Reset when not active
      setCandidateGazeData({ x: 0.5, y: 0.5 });
    }
    return () => clearInterval(engagementDataInterval);
  }, [isActive, anonymousId, interval]);

  return { candidateEngagementScore, candidateGazeData };
};

export default useEngagementDataSimulator;
