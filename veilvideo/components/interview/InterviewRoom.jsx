
import React, { useRef, useEffect, useState, useCallback } from 'react';
import InterviewControls from '@/components/interview/InterviewControls';
import AiInsightsPanel from '@/components/interview/AiInsightsPanel';
import { interviewService } from '@/services/interviewService'; 
import { motion } from 'framer-motion';
import AcsCallHandler from '@/components/interview/AcsCallHandler';
import InterviewRoomHeader from '@/components/interview/InterviewRoomHeader';
import VideoLayout from '@/components/interview/VideoLayout';

const InterviewRoom = ({ user, profile, onEndInterview: parentOnEndInterview, teamsMeetingUrl }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  
  const [candidateEngagementScore, setCandidateEngagementScore] = useState(-1); 
  const [candidateGazeData, setCandidateGazeData] = useState({ x: 0.5, y: 0.5 }); 
  const [isInterviewActiveForVisualizer, setIsInterviewActiveForVisualizer] = useState(false);
  const [transcript, setTranscript] = useState([]);
  
  const [isAcsCallActive, setIsAcsCallActive] = useState(false);
  const [acsCallId, setAcsCallId] = useState(null);
  const [localAcsStream, setLocalAcsStream] = useState(null);
  const [remoteAcsStream, setRemoteAcsStream] = useState(null);
  const [triggerStartAcsCall, setTriggerStartAcsCall] = useState(0);
  const [triggerEndAcsCall, setTriggerEndAcsCall] = useState(0);

  const mockCandidateAnonymousId = profile?.anonymous_id || "mock-candidate-anon-id-123";

  const handleAcsCallStateChange = useCallback((isActive, callId) => {
    setIsAcsCallActive(isActive);
    setAcsCallId(callId);
  }, []);

  const handleLocalAcsStreamReady = useCallback((stream) => {
    setLocalAcsStream(stream);
  }, []);

  const handleRemoteAcsStreamReady = useCallback((stream) => {
    setRemoteAcsStream(stream);
  }, []);
  
  const handleAcsCallEnd = useCallback(() => {
    setIsAcsCallActive(false);
    setAcsCallId(null);
    setLocalAcsStream(null);
    setRemoteAcsStream(null);
    // If the main interview session should also end when ACS call ends:
    // parentOnEndInterview(); 
  }, []);

  const startAcsCallFlow = () => {
    setTriggerStartAcsCall(prev => prev + 1);
  };

  const endAcsCallFlow = () => {
    setTriggerEndAcsCall(prev => prev + 1);
  };
  
  const handleEndInterviewSession = () => {
    if (isAcsCallActive) {
      endAcsCallFlow(); // This will trigger ACS hangup, then handleAcsCallEnd, then parentOnEndInterview if needed
    } else {
      if (parentOnEndInterview) parentOnEndInterview();
    }
  };


  useEffect(() => {
    setIsInterviewActiveForVisualizer(true);
    setCandidateEngagementScore(0); 

    let currentSpeaker = "AI Prompt";
    const mockPhrases = {
      "AI Prompt": ["Tell me about yourself.", "What are your strengths?", "Why VielViewVideo?"],
      "Candidate": ["I'm a passionate developer...", "My key strength is problem-solving.", "I'm excited by your innovative approach."]
    };

    const mockTranscriptInterval = setInterval(() => {
      if(isInterviewActiveForVisualizer){
        const phrase = mockPhrases[currentSpeaker][Math.floor(Math.random() * mockPhrases[currentSpeaker].length)];
        setTranscript(prev => [...prev, {speaker: currentSpeaker, text: phrase, timestamp: new Date() }].slice(-15));
        currentSpeaker = currentSpeaker === "AI Prompt" ? "Candidate" : "AI Prompt";
      }
    }, 7000 + Math.random() * 2000); 

    return () => {
      setIsInterviewActiveForVisualizer(false);
      clearInterval(mockTranscriptInterval);
    };
  }, []);

  useEffect(() => {
    let engagementDataInterval;
    if (isInterviewActiveForVisualizer) {
      engagementDataInterval = setInterval(async () => {
        try {
          const analysisResult = await interviewService.analyzeFrame(null, mockCandidateAnonymousId); 
          setCandidateEngagementScore(analysisResult.engagementScore * 100); 
          setCandidateGazeData({ x: analysisResult.gaze.x, y: analysisResult.gaze.y });
        } catch (error) {
          console.error("Error fetching/simulating candidate engagement data:", error);
          setCandidateEngagementScore(prev => Math.max(0, prev - 5)); 
          setCandidateGazeData({ x: 0.5, y: 0.5 }); 
        }
      }, 3000); 
    }
    return () => clearInterval(engagementDataInterval);
  }, [isInterviewActiveForVisualizer, mockCandidateAnonymousId]);

  const currentEngagementStage = 
    !isInterviewActiveForVisualizer ? 'pre-interview' :
    candidateEngagementScore < 0 ? 'idle' :
    candidateEngagementScore < 40 ? 'low' :
    candidateEngagementScore < 70 ? 'medium' : 'high';

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8 h-[calc(100vh-4rem)] flex flex-col">
      {user && profile && (
        <AcsCallHandler
          user={user}
          profile={profile}
          onCallStateChange={handleAcsCallStateChange}
          onLocalStreamReady={handleLocalAcsStreamReady}
          onRemoteStreamReady={handleRemoteAcsStreamReady}
          onCallEnd={handleAcsCallEnd} 
          localVideoElementRef={localVideoRef}
          remoteVideoElementRef={remoteVideoRef}
          triggerStartCall={triggerStartAcsCall}
          triggerEndCall={triggerEndAcsCall}
        />
      )}
      <motion.div 
        className="w-full max-w-7xl mx-auto shadow-2xl glassmorphism border-primary/20 rounded-xl flex-grow flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <InterviewRoomHeader 
          teamsMeetingUrl={teamsMeetingUrl}
          isAcsCallActive={isAcsCallActive}
          acsCallId={acsCallId}
          onStartAcsCall={user && profile ? startAcsCallFlow : undefined}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4 p-2 md:p-4 flex-grow h-full min-h-0">
          <VideoLayout
            localVideoRef={localVideoRef}
            remoteVideoRef={remoteVideoRef}
            localAcsStream={localAcsStream}
            remoteAcsStream={remoteAcsStream}
            candidateEngagementScore={candidateEngagementScore}
            candidateGazeData={candidateGazeData}
            isInterviewActiveForVisualizer={isInterviewActiveForVisualizer}
            currentEngagementStage={currentEngagementStage}
          />
          <div className="lg:h-full flex flex-col min-h-[300px] lg:min-h-0">
            <AiInsightsPanel 
              engagementScore={candidateEngagementScore} 
              transcript={transcript} 
              currentEngagementStage={currentEngagementStage}
            />
            <div className="mt-2 md:mt-4">
              <InterviewControls 
                localStream={localAcsStream} 
                onEndCall={handleEndInterviewSession}
                isCallActive={isAcsCallActive}
                acsCallAgent={null} 
                acsCurrentCall={null} 
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewRoom;
