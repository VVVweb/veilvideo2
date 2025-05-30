
import React from 'react';
import { UserSquare, WifiOff } from 'lucide-react';

const VideoFeed = ({ type, videoRef, label, stream }) => {
  const isLocal = type === 'local';
  const isRemote = type === 'remote';

  let videoLabel = label || (isLocal ? "Your Video" : "Remote Video");

  return (
    <div className="w-full h-full relative bg-black rounded-md overflow-hidden group">
      <div ref={videoRef} className="w-full h-full">
        {/* VideoStreamRenderer will attach video element here */}
      </div>
      
      {(!stream && !videoRef?.current?.hasChildNodes()) && ( // Check if videoRef is empty
        <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-black/70">
          <UserSquare className="w-1/2 h-1/2 opacity-30" />
          <p className="mt-2 text-sm">{isLocal ? "Your Camera" : "Waiting for Candidate..."}</p>
        </div>
      )}

      {stream && !stream.isAvailable && isRemote && ( // Specific message for remote stream not available
         <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-black/70">
          <WifiOff className="w-1/2 h-1/2 opacity-30" />
          <p className="mt-2 text-sm">Candidate's video not available</p>
        </div>
      )}

      <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 bg-black/60 text-white text-xs px-1 py-0.5 md:px-2 md:py-1 rounded z-10 opacity-80 group-hover:opacity-100 transition-opacity">
        {videoLabel}
      </div>
    </div>
  );
};

export default VideoFeed;
