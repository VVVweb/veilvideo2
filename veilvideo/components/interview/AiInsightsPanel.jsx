
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, HelpCircle, MessageSquare, Activity, AlertTriangle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area'; // Assuming you have a ScrollArea component

const suggestedQuestions = [
  "Can you describe a challenging project you worked on and how you overcame obstacles?",
  "What are your biggest strengths and how do they align with this role?",
  "Where do you see yourself in 5 years?",
  "Why are you interested in our company?",
  "Tell me about a time you had to work as part of a team.",
  "How do you handle pressure or tight deadlines?",
  "What is a weakness you're working on improving?",
  "Do you have any questions for me about the role or company?"
];

const AiInsightsPanel = ({ engagementScore, transcript, currentEngagementStage }) => {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const transcriptEndRef = useRef(null);

  useEffect(() => {
    const questionInterval = setInterval(() => {
      setCurrentQuestion(suggestedQuestions[Math.floor(Math.random() * suggestedQuestions.length)]);
    }, 15000); // Change question every 15 seconds
    setCurrentQuestion(suggestedQuestions[Math.floor(Math.random() * suggestedQuestions.length)]); // Initial question
    return () => clearInterval(questionInterval);
  }, []);

  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcript]);

  const scoreColor = 
    currentEngagementStage === 'high' ? 'text-electric-blue' :
    currentEngagementStage === 'medium' ? 'text-neon-pink' :
    currentEngagementStage === 'low' ? 'text-flame-orange' : 'text-muted-foreground';

  const scoreBarColor =
    currentEngagementStage === 'high' ? 'bg-electric-blue' :
    currentEngagementStage === 'medium' ? 'bg-neon-pink' :
    currentEngagementStage === 'low' ? 'bg-flame-orange' : 'bg-muted';

  return (
    <div className="h-full flex flex-col bg-background/70 glassmorphism border border-border/30 rounded-lg p-3 md:p-4 space-y-3 md:space-y-4 overflow-hidden">
      <div className="flex items-center space-x-2 text-lg font-semibold text-primary">
        <Bot size={24} />
        <span>AI Assistant & Insights</span>
      </div>

      <div className="p-3 bg-black/30 rounded-lg border border-border/20">
        <div className="flex justify-between items-center mb-1">
          <span className={`text-sm font-medium ${scoreColor} flex items-center`}>
            <Activity className="mr-2 h-4 w-4" />
            Engagement Level
          </span>
          <span className={`text-lg font-bold ${scoreColor}`}>
            {engagementScore >=0 ? `${engagementScore.toFixed(0)}%` : "N/A"}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${scoreBarColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${engagementScore >= 0 ? engagementScore : 0}%` }}
            transition={{ duration: 0.5, ease: "circOut" }}
          />
        </div>
      </div>
      
      <div className="flex-shrink-0 p-3 bg-black/30 rounded-lg border border-border/20">
        <div className="flex items-center space-x-2 mb-2 text-neon-pink">
          <HelpCircle size={20} />
          <h3 className="text-md font-semibold">Suggested Question Focus</h3>
        </div>
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentQuestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-foreground/90 min-h-[40px]"
          >
            {currentQuestion}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex-grow flex flex-col p-3 bg-black/30 rounded-lg border border-border/20 min-h-0">
        <div className="flex items-center space-x-2 mb-2 text-electric-blue">
          <MessageSquare size={20} />
          <h3 className="text-md font-semibold">Live Transcript (Mock)</h3>
        </div>
        <ScrollArea className="flex-grow pr-2">
          <div className="space-y-2 text-xs">
            {transcript.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-1.5 rounded ${item.speaker === 'Candidate' ? 'bg-primary/20 text-primary-foreground/80' : 'bg-secondary/20 text-secondary-foreground/80'}`}
              >
                <span className="font-semibold">{item.speaker}: </span>{item.text}
              </motion.div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
          {transcript.length === 0 && <p className="text-muted-foreground text-center py-4">Transcript will appear here...</p>}
        </ScrollArea>
      </div>
      
      <div className="flex-shrink-0 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-xs">
        <div className="flex items-start space-x-2">
          <AlertTriangle size={28} className="text-yellow-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>AI Recording Notice:</strong> This session is being processed by AI to provide you with engagement feedback and a summary. Your video is not stored long-term. You will receive a copy of your insights after the interview.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiInsightsPanel;
