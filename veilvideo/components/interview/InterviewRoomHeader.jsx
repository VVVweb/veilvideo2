
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Video as VideoIcon } from 'lucide-react';

const InterviewRoomHeader = ({ teamsMeetingUrl, isAcsCallActive, acsCallId, onStartAcsCall }) => {
  return (
    <>
      {teamsMeetingUrl && !isAcsCallActive && (
        <div className="p-2 bg-blue-600 text-white text-center">
          <Button asChild variant="link" className="text-white hover:text-blue-200">
            <a href={teamsMeetingUrl} target="_blank" rel="noopener noreferrer">
              External Teams Meeting is active. Click here to join/re-join.
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
      {!isAcsCallActive && !teamsMeetingUrl && onStartAcsCall && (
        <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center shadow-md">
          <Button onClick={onStartAcsCall} className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
            <VideoIcon className="mr-2 h-5 w-5" /> Start VielViewVideo Call
          </Button>
        </div>
      )}
      {isAcsCallActive && (
        <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-center shadow-md">
          <p className="font-semibold">VielViewVideo Call Active</p>
          {acsCallId && <p className="text-xs">Call ID: {acsCallId}</p>}
        </div>
      )}
    </>
  );
};

export default InterviewRoomHeader;
