
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings2, PhoneForwarded } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast.js';

const InterviewControls = ({ localStream, onEndCall, isCallActive, acsCallAgent, acsCurrentCall }) => {
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (localStream && localStream.kind === 'video') { 
      if (isMicMuted) {
      } else {
      }
      if (isCameraOff) {
        localStream.stop().catch(e => console.warn("Error stopping local video stream:", e));
      } else {
      }
    } else if (localStream && localStream.getAudioTracks) { 
        localStream.getAudioTracks().forEach(track => track.enabled = !isMicMuted);
        localStream.getVideoTracks().forEach(track => track.enabled = !isCameraOff);
    }
  }, [isMicMuted, isCameraOff, localStream, acsCurrentCall]);

  const toggleMic = async () => {
    if (acsCurrentCall) {
        try {
            if (acsCurrentCall.isMuted) {
                await acsCurrentCall.unmute();
                setIsMicMuted(false);
                toast({ title: "Microphone Unmuted (ACS)" });
            } else {
                await acsCurrentCall.mute();
                setIsMicMuted(true);
                toast({ title: "Microphone Muted (ACS)" });
            }
        } catch (error) {
            console.error("ACS mic toggle error:", error);
            toast({ title: "Mic Toggle Error", description: error.message, variant: "destructive"});
        }
    } else {
        setIsMicMuted(prev => !prev);
        toast({ title: `Microphone ${!isMicMuted ? 'muted' : 'unmuted'}` });
    }
  };

  const toggleCamera = async () => {
    if (acsCurrentCall && localStream && localStream.kind === 'video') { 
        try {
            if (isCameraOff) { 
                
                const cameras = await acsCallAgent.getDeviceManager().getCameras();
                if (cameras.length > 0) {
                    const newStream = new window.SDK.LocalVideoStream(cameras[0]); 
                    await acsCurrentCall.startVideo(newStream);
                    
                    toast({ title: "Camera On (ACS)" });
                    setIsCameraOff(false);
                } else {
                     toast({ title: "No camera found", variant: "destructive" });
                }
            } else { 
                await acsCurrentCall.stopVideo(localStream);
                toast({ title: "Camera Off (ACS)" });
                setIsCameraOff(true);
            }
        } catch (error) {
            console.error("ACS camera toggle error:", error);
            toast({ title: "Camera Toggle Error", description: error.message, variant: "destructive"});
        }
    } else {
        setIsCameraOff(prev => !prev);
        toast({ title: `Camera ${!isCameraOff ? 'turned off' : 'turned on'}` });
    }
  };

  const handleEndCall = () => {
    if (onEndCall) {
      onEndCall(); 
    }
  };

  return (
    <div className="p-2 md:p-4 bg-card/30 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-around space-x-1 md:space-x-2 glassmorphism border-border/50">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleMic} 
        className={`hover:bg-neon-pink/20 ${isMicMuted ? 'border-destructive text-destructive hover:border-destructive hover:text-destructive' : 'border-electric-blue text-electric-blue hover:border-electric-blue hover:text-electric-blue'} rounded-full w-10 h-10 md:w-12 md:h-12`}
        disabled={!isCallActive && !localStream} 
      >
        {isMicMuted ? <MicOff className="h-4 w-4 md:h-5 md:w-5" /> : <Mic className="h-4 w-4 md:h-5 md:w-5" />}
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleCamera} 
        className={`hover:bg-neon-pink/20 ${isCameraOff ? 'border-destructive text-destructive hover:border-destructive hover:text-destructive' : 'border-electric-blue text-electric-blue hover:border-electric-blue hover:text-electric-blue'} rounded-full w-10 h-10 md:w-12 md:h-12`}
        disabled={!isCallActive && !localStream} 
      >
        {isCameraOff ? <VideoOff className="h-4 w-4 md:h-5 md:w-5" /> : <Video className="h-4 w-4 md:h-5 md:w-5" />}
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        className="border-electric-blue text-electric-blue hover:bg-neon-pink/20 hover:border-electric-blue hover:text-electric-blue rounded-full w-10 h-10 md:w-12 md:h-12"
        onClick={() => toast({title: "Settings", description: "Advanced call settings not yet implemented."})}
      >
        <Settings2 className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
      <Button 
        variant="destructive" 
        size="icon" 
        onClick={handleEndCall} 
        className="bg-flame-orange hover:bg-red-700 text-white rounded-full w-12 h-12 md:w-14 md:h-14"
      >
        <PhoneOff className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    </div>
  );
};

export default InterviewControls;
