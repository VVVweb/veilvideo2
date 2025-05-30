
import { useState, useEffect, useRef } from 'react';

const useTranscriptGenerator = (isActive, interval = 7000, maxLength = 15) => {
  const [transcript, setTranscript] = useState([]);
  const currentSpeakerRef = useRef("AI Prompt");

  const mockPhrases = {
    "AI Prompt": [
      "Can you describe a challenging project you worked on?",
      "What are your long-term career goals?",
      "How do you handle tight deadlines and pressure?",
      "Tell me about a time you failed and what you learned.",
      "What motivates you in your work?",
      "Why are you interested in this role specifically?"
    ],
    "Candidate": [
      "One of the most challenging projects involved migrating a legacy system...",
      "In five years, I see myself taking on more leadership responsibilities...",
      "I prioritize tasks and maintain clear communication under pressure.",
      "There was a time when a feature didn't meet expectations, and I learned the importance of early feedback...",
      "I'm motivated by solving complex problems and contributing to a team's success.",
      "This role aligns perfectly with my skills and interests in developing innovative solutions."
    ]
  };

  useEffect(() => {
    let transcriptInterval;
    if (isActive) {
      transcriptInterval = setInterval(() => {
        const speaker = currentSpeakerRef.current;
        const phrase = mockPhrases[speaker][Math.floor(Math.random() * mockPhrases[speaker].length)];
        setTranscript(prev => {
          const newEntry = { speaker, text: phrase, timestamp: new Date() };
          const updatedTranscript = [...prev, newEntry];
          return updatedTranscript.length > maxLength ? updatedTranscript.slice(-maxLength) : updatedTranscript;
        });
        currentSpeakerRef.current = speaker === "AI Prompt" ? "Candidate" : "AI Prompt";
      }, interval + Math.random() * 2000);
    } else {
      // Optionally clear transcript when not active or keep it
      // setTranscript([]); 
    }
    return () => clearInterval(transcriptInterval);
  }, [isActive, interval, maxLength]);

  return transcript;
};

export default useTranscriptGenerator;
