
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InterviewRoom from '@/components/interview/InterviewRoom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Video, AlertTriangle, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { interviewService } from '@/services/interviewService';

const InterviewPage = () => {
  const { isAuthenticated, loading: authLoading, user, profile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isJoining, setIsJoining] = useState(false);
  const [interviewActive, setInterviewActive] = useState(false);
  const [teamsMeetingUrl, setTeamsMeetingUrl] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the interview room.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate, toast]);

  const handleJoinInterview = async () => {
    if (!user || !profile) {
        toast({ title: "Error", description: "User profile not fully loaded. Please wait or try logging in again.", variant: "destructive"});
        return;
    }
    setIsJoining(true);
    setTeamsMeetingUrl(null);

    try {
      toast({
        title: "Initializing Session...",
        description: "Attempting to create or join Microsoft Teams meeting.",
      });

      const meetingDetails = await interviewService.getTeamsMeetingDetails(user.id, profile.anonymous_id);
      
      if (meetingDetails && meetingDetails.joinUrl) {
        setTeamsMeetingUrl(meetingDetails.joinUrl);
        toast({
          title: "Teams Meeting Ready!",
          description: "Meeting URL obtained. You can join the Teams call now.",
          action: (
            <a href={meetingDetails.joinUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-primary text-primary-foreground">
              Open Teams <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          ),
          duration: 10000, 
        });
      } else {
         toast({
          title: "Teams Meeting Info",
          description: `Received: ${JSON.stringify(meetingDetails)}. No joinUrl found. Proceeding to VielViewVideo room.`,
          variant: "default",
          duration: 7000,
        });
      }

      setTimeout(() => {
        toast({
          title: "Joining VielViewVideo Room",
          description: `Welcome, ${profile.full_name || 'User'}! Preparing your anonymous session (${profile.anonymous_id}).`,
        });
        setInterviewActive(true);
        setIsJoining(false);
      }, 1500);

    } catch (error) {
      console.error("Error during interview setup:", error);
      toast({
        title: "Failed to Join/Create Teams Meeting",
        description: error.message || "Could not initialize Teams meeting. Proceeding to VielViewVideo room.",
        variant: "destructive",
      });
      // Still proceed to VielViewVideo room even if Teams fails for now
      setTimeout(() => {
        setInterviewActive(true);
        setIsJoining(false);
      }, 1500);
    }
  };

  const handleEndInterviewSession = () => {
    setInterviewActive(false);
    setTeamsMeetingUrl(null);
    navigate('/'); 
    toast({ title: "Interview Finished", description: "Thank you for participating! Your insights will be processed." });
  };

  if (authLoading) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
       <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <p>Redirecting to login...</p>
      </div>
    );
  }
  
  if (interviewActive) {
    return <InterviewRoom user={user} profile={profile} onEndInterview={handleEndInterviewSession} teamsMeetingUrl={teamsMeetingUrl} />;
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-lg text-center glassmorphism border-primary/30 shadow-xl">
          <CardHeader>
            <motion.div initial={{ scale:0 }} animate={{ scale:1}} transition={{delay:0.2, type: 'spring', stiffness:200}}>
              <Video className="mx-auto h-16 w-16 text-primary mb-4 animate-ddr-pulse" />
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-neon-pink via-primary to-electric-blue text-transparent bg-clip-text">
              Ready for Your Anonymous Interview?
            </CardTitle>
            <CardDescription className="text-lg text-foreground/80 pt-2">
              Ensure your camera and microphone are ready. We'll connect you via Microsoft Teams and VielViewVideo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm text-left">
              <div className="flex items-start space-x-2">
                <AlertTriangle size={28} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Important AI Notice:</p>
                  <p>This interview session uses AI to analyze engagement and provide real-time feedback. A transcript will be generated for note-taking purposes. You will receive a copy of your engagement insights and a summary after the session. Your video is not stored long-term.</p>
                </div>
              </div>
            </div>
            <p className="mb-6 text-muted-foreground">
              You are joining as <span className="font-semibold text-primary">{profile?.full_name || user?.email}</span>.
              Your identity (<span className="font-semibold text-secondary">{profile?.anonymous_id}</span>) will be used for the anonymous session.
            </p>
            {teamsMeetingUrl && (
              <div className="mb-4">
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <a href={teamsMeetingUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Join Teams Meeting Now
                  </a>
                </Button>
              </div>
            )}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg py-6"
              onClick={handleJoinInterview}
              disabled={isJoining || !profile} 
            >
              {isJoining ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Joining...
                </>
              ) : !profile ? (
                 <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Loading Profile...
                </>
              ) : (
                'Join Interview Now'
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default InterviewPage;
