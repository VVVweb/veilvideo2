
import React, { useEffect, useState, useCallback } from 'react';
import { CallClient, LocalVideoStream, VideoStreamRenderer } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { interviewService } from '@/services/interviewService';
import { useToast } from '@/components/ui/use-toast.js';

const AcsCallHandler = ({
  user,
  profile,
  onCallStateChange,
  onLocalStreamReady,
  onRemoteStreamReady,
  onCallEnd,
  localVideoElementRef,
  remoteVideoElementRef,
  triggerStartCall,
  triggerEndCall,
  initialCallId,
}) => {
  const { toast } = useToast();
  const [callClient, setCallClient] = useState(null);
  const [callAgent, setCallAgent] = useState(null);
  const [deviceManager, setDeviceManager] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);
  const [localVideoStream, setLocalVideoStream] = useState(null);
  const [localRenderer, setLocalRenderer] = useState(null);
  const [remoteRenderer, setRemoteRenderer] = useState(null);

  const mockCandidateAcsId = "8:acs:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // Replace with actual mechanism

  const cleanupCallResources = useCallback(() => {
    currentCall?.hangUp({ forEveryone: true }).catch(e => console.warn("Error hanging up on cleanup:", e));
    localRenderer?.dispose();
    remoteRenderer?.dispose();
    setLocalRenderer(null);
    setRemoteRenderer(null);
    setLocalVideoStream(null); 
    setCurrentCall(null);
    onCallStateChange(false, null);
    onLocalStreamReady(null);
    onRemoteStreamReady(null);
  }, [currentCall, localRenderer, remoteRenderer, onCallStateChange, onLocalStreamReady, onRemoteStreamReady]);


  useEffect(() => {
    const initialize = async () => {
      if (!user || !profile) return;
      try {
        const turnConfig = await fetch(`https://rtc.live.cloudflare.com/v1/turn/keys/${import.meta.env.VITE_CLOUDFLARE_TURN_KEY}/credentials/generate-ice-servers`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_CLOUDFLARE_TURN_TOKEN}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ttl: 86400 })
        }).then(res => res.json());

        if (!turnConfig.iceServers) {
          throw new Error('Failed to get TURN server configuration');
        }

        const client = new CallClient({ iceServers: turnConfig.iceServers });
        setCallClient(client);
        const tokenResponse = await interviewService.getAcsToken(user.id, 'acs_vielviewvideo_call');
        if (!tokenResponse || !tokenResponse.token || !tokenResponse.user?.communicationUserId) {
          toast({ title: "ACS Error", description: "Failed to get valid ACS token.", variant: "destructive" });
          return;
        }
        const tokenCredential = new AzureCommunicationTokenCredential(tokenResponse.token);
        const agent = await client.createCallAgent(tokenCredential, { displayName: profile.full_name || 'Interviewer' });
        setCallAgent(agent);
        const dm = await client.getDeviceManager();
        setDeviceManager(dm);

        agent.on('callsUpdated', (e) => {
          e.added.forEach(call => {
            console.log("ACS Call added:", call.id);
            if (currentCall && currentCall.id !== call.id) { // Hang up any existing call if a new one is added externally
                currentCall.hangUp({forEveryone: true}).catch(err => console.warn("Error hanging up previous call", err));
            }
            setCurrentCall(call);
            onCallStateChange(true, call.id);
            call.remoteParticipants.forEach(rp => subscribeToRemoteParticipant(rp));
            call.on('remoteParticipantsUpdated', (args) => {
              args.added.forEach(rp => subscribeToRemoteParticipant(rp));
              args.removed.forEach(rp => {
                console.log("Remote participant left:", rp.identifier);
                if (remoteRenderer) remoteRenderer.dispose();
                setRemoteRenderer(null);
                onRemoteStreamReady(null);
              });
            });
            call.on('stateChanged', () => {
              console.log('ACS Call state changed to:', call.state);
              if (call.state === 'Disconnected') {
                cleanupCallResources();
                if (onCallEnd) onCallEnd();
                toast({ title: "Call Ended", description: "The ACS call has ended." });
              }
            });
          });
          e.removed.forEach(call => {
            console.log("ACS Call removed:", call.id);
            if (currentCall && currentCall.id === call.id) {
              cleanupCallResources();
              if (onCallEnd) onCallEnd();
            }
          });
        });

      } catch (error) {
        console.error("Failed to initialize ACS Call Handler:", error);
        toast({ title: "ACS Initialization Failed", description: error.message, variant: "destructive" });
      }
    };
    initialize();
    return () => {
      cleanupCallResources();
    };
  }, [user, profile, toast, cleanupCallResources, onCallEnd, onCallStateChange, onLocalStreamReady, onRemoteStreamReady]);

  const subscribeToRemoteParticipant = useCallback(async (participant) => {
    console.log("Subscribing to remote participant:", participant.identifier);
    participant.on('videoStreamsUpdated', e => {
      e.added.forEach(async stream => {
        if (stream.type === 'Video' && stream.isAvailable) {
          console.log("Remote video stream available:", stream.id);
          onRemoteStreamReady(stream);
          const renderer = new VideoStreamRenderer(stream);
          setRemoteRenderer(renderer);
          const view = await renderer.createView({ scalingMode: 'Crop' });
          if (remoteVideoElementRef.current) {
            remoteVideoElementRef.current.innerHTML = '';
            remoteVideoElementRef.current.appendChild(view.target);
          }
        }
      });
      e.removed.forEach(stream => {
        console.log("Remote video stream removed:", stream.id);
        if (remoteRenderer) remoteRenderer.dispose();
        setRemoteRenderer(null);
        onRemoteStreamReady(null);
      });
    });
    // Handle already available streams
    participant.videoStreams.forEach(async stream => {
        if (stream.type === 'Video' && stream.isAvailable) {
            onRemoteStreamReady(stream);
            const renderer = new VideoStreamRenderer(stream);
            setRemoteRenderer(renderer);
            const view = await renderer.createView({ scalingMode: 'Crop' });
            if (remoteVideoElementRef.current) {
                remoteVideoElementRef.current.innerHTML = '';
                remoteVideoElementRef.current.appendChild(view.target);
            }
        }
    });
  }, [remoteVideoElementRef, onRemoteStreamReady, remoteRenderer]);

  const startCall = useCallback(async () => {
    if (!callAgent || !deviceManager) {
      toast({ title: "ACS Not Ready", description: "Call agent or device manager not initialized.", variant: "destructive" });
      return;
    }
    if (currentCall) {
        toast({ title: "Call In Progress", description: "A call is already active.", variant: "default" });
        return;
    }
    try {
      const cameras = await deviceManager.getCameras();
      if (cameras && cameras.length > 0) {
        const lvs = new LocalVideoStream(cameras[0]);
        setLocalVideoStream(lvs);
        onLocalStreamReady(lvs);
        
        const renderer = new VideoStreamRenderer(lvs);
        setLocalRenderer(renderer);
        const view = await renderer.createView({ scalingMode: 'Crop' });
        if (localVideoElementRef.current) {
          localVideoElementRef.current.innerHTML = '';
          localVideoElementRef.current.appendChild(view.target);
        }
        
        const callOptions = { videoOptions: { localVideoStreams: [lvs] } };
        // For 1:1 call, use [{ communicationUserId: TARGET_ACS_USER_ID }]
        // For group call, use { groupId: YOUR_GROUP_ID }
        // This example uses a mock ACS ID for the candidate. In a real app, this ID would come from your backend/session management.
        const newCall = callAgent.startCall([{ communicationUserId: mockCandidateAcsId }], callOptions);
        // const newCall = callAgent.join({ groupId: initialCallId || "your-default-group-id" }, callOptions);
        setCurrentCall(newCall); // callAgent.on('callsUpdated') will also set this
        onCallStateChange(true, newCall.id);
        toast({ title: "ACS Call Started", description: `Attempting to call candidate.` });
      } else {
        toast({ title: "No Camera Found", description: "Could not find a camera to start the call.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Failed to start ACS call:", error);
      toast({ title: "ACS Call Error", description: error.message, variant: "destructive" });
      cleanupCallResources();
    }
  }, [callAgent, deviceManager, localVideoElementRef, onLocalStreamReady, toast, cleanupCallResources, onCallStateChange, currentCall, mockCandidateAcsId]);

  const endCall = useCallback(async () => {
    if (currentCall) {
      try {
        await currentCall.hangUp({ forEveryone: true });
        // cleanupCallResources will be called by 'stateChanged' -> 'Disconnected'
      } catch (error) {
        console.error("Failed to hang up ACS call:", error);
        toast({ title: "ACS Hang Up Error", description: error.message, variant: "destructive" });
        cleanupCallResources(); // Ensure cleanup even if hangUp fails
        if(onCallEnd) onCallEnd();
      }
    } else {
        if(onCallEnd) onCallEnd(); // If no current call, just trigger the parent's end logic
    }
  }, [currentCall, toast, cleanupCallResources, onCallEnd]);

  useEffect(() => {
    if (triggerStartCall > 0) startCall();
  }, [triggerStartCall, startCall]);

  useEffect(() => {
    if (triggerEndCall > 0) endCall();
  }, [triggerEndCall, endCall]);
  
  // Expose control functions if needed, though typically handled by props like triggerStartCall
  // Or, parent can hold ref to this component and call methods, but prop-driven is cleaner.

  return null; // This component does not render UI itself
};

export default AcsCallHandler;
