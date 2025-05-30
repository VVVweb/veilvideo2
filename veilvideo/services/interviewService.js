
import { supabase } from '@/lib/supabaseClient';

const getAcsToken = async (appUserId, purpose = 'general_acs_use') => {
  console.log(`Requesting ACS Token for app user ${appUserId}, purpose: ${purpose}`);
  try {
    const { data, error } = await supabase.functions.invoke('get-acs-token', {
      body: JSON.stringify({ appUserId, purpose }) 
    });

    if (error) {
      console.error('Error invoking get-acs-token Edge Function:', error);
      throw error;
    }

    if (!data || !data.token || !data.userId) {
      console.error('Invalid token data received from Edge Function:', data);
      throw new Error('Failed to retrieve a valid ACS token structure.');
    }
    
    console.log('Successfully received ACS token from Edge Function for ACS User ID:', data.userId);
    return { 
      token: data.token, 
      expiresOn: new Date(data.expiresOn), 
      user: { communicationUserId: data.userId } 
    };
  } catch (error) {
    console.error('Client-side error calling get-acs-token function:', error);
    throw new Error(`Failed to get ACS token: ${error.message}`);
  }
};

const analyzeFrame = async (frameData, anonymousId) => {
  if (frameData) {
    console.log(`Mock: Sending actual frame for analysis for anonymousId ${anonymousId}. Frame size: ${frameData.size} bytes`);
  } else {
    console.log(`Mock: Simulating receipt of candidate engagement data for anonymousId ${anonymousId}`);
  }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        gaze: { x: Math.random(), y: Math.random() }, 
        pose: { yaw: Math.random()*10-5, pitch: Math.random()*10-5, roll: Math.random()*10-5 }, 
        engagementScore: Math.random(), 
        timestamp: new Date().toISOString(),
      });
    }, 300);
  });
};

const getTeamsMeetingDetails = async (interviewerId, candidateAnonymousId) => {
  console.log(`Attempting to get Teams meeting details for interviewer: ${interviewerId}, candidate: ${candidateAnonymousId}`);
  try {
    const { data, error } = await supabase.functions.invoke('connect-microsoft-teams', {
      body: JSON.stringify({ interviewerId, candidateAnonymousId, action: 'createMeeting' }) 
    });

    if (error) {
      console.error('Error invoking connect-microsoft-teams Edge Function:', error);
      throw error;
    }

    console.log('Successfully invoked connect-microsoft-teams Edge Function. Data:', data);
    return data; 
  } catch (error) {
    console.error('Client-side error calling connect-microsoft-teams function:', error);
    throw new Error(`Failed to get Teams meeting details: ${error.message}`);
  }
};

export const interviewService = {
  getAcsToken,
  analyzeFrame,
  getTeamsMeetingDetails,
};
