
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ToggleViewOptions = ({ isVisible, onToggle }) => {
  const { toast } = useToast();

  const handleToggle = () => {
    onToggle();
    toast({
      title: "View Toggled",
      description: `Interviewer's video is now ${!isVisible ? 'visible' : 'hidden'}.`,
      duration: 3000,
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className="bg-background/70 hover:bg-background/90 border-primary text-primary data-[state=on]:bg-primary/20"
      title={isVisible ? "Hide Interviewer's Video" : "Show Interviewer's Video"}
    >
      {isVisible ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
    </Button>
  );
};

export default ToggleViewOptions;
