
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, CalendarDays, Users, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const InterviewCentralPage = () => {
  // Placeholder data
  const upcomingInterviews = [
    { id: 1, candidateName: "Clark Kent", jobTitle: "Investigative Reporter", date: "2025-05-10T10:00:00", type: "Video (VeilView)" },
    { id: 2, candidateName: "Lois Lane", jobTitle: "Senior Editor", date: "2025-05-12T14:30:00", type: "On-site" },
  ];
  const recentInterviews = [
     { id: 3, candidateName: "Jimmy Olsen", jobTitle: "Photographer", date: "2025-05-05T11:00:00", status: "Feedback Pending" },
  ];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
          Interview Central
        </h1>
        <div className="flex space-x-2">
            <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                <Link to="/interview"><Video className="mr-2 h-5 w-5" /> Start Ad-hoc Interview</Link>
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <Link to="/interview-scheduling"><CalendarDays className="mr-2 h-5 w-5" /> Schedule Interview</Link>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="flex items-center"><CalendarDays className="mr-2 h-6 w-6 text-primary" />Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled interviews.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInterviews.length > 0 ? upcomingInterviews.map(interview => (
              <InterviewListItem key={interview.id} interview={interview} isUpcoming={true} />
            )) : <p className="text-muted-foreground">No upcoming interviews scheduled.</p>}
          </CardContent>
        </Card>

        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle className="flex items-center"><Users className="mr-2 h-6 w-6 text-secondary" />Recent Interviews</CardTitle>
            <CardDescription>Interviews that have recently concluded.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentInterviews.length > 0 ? recentInterviews.map(interview => (
              <InterviewListItem key={interview.id} interview={interview} isUpcoming={false} />
            )) : <p className="text-muted-foreground">No recent interview data.</p>}
          </CardContent>
        </Card>
      </div>
        <Card className="mt-6 glassmorphism">
          <CardHeader>
            <CardTitle className="flex items-center"><Settings2 className="mr-2 h-6 w-6 text-purple-500" />Interview Settings & Templates</CardTitle>
             <CardDescription>Manage interview templates, question banks, and feedback forms.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Content for managing interview templates and settings will be here.</p>
            <Button variant="outline" className="mt-3 border-purple-500 text-purple-500 hover:bg-purple-500/10">Configure Templates</Button>
          </CardContent>
        </Card>
    </motion.div>
  );
};

const InterviewListItem = ({ interview, isUpcoming }) => (
  <div className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
    <div className="flex justify-between items-center">
      <div>
        <h4 className="font-semibold">{interview.candidateName} for {interview.jobTitle}</h4>
        <p className="text-sm text-muted-foreground">
          {new Date(interview.date).toLocaleDateString()} at {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="text-xs text-primary">{interview.type}</p>
      </div>
      {isUpcoming ? (
        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">Join/Details</Button>
      ) : (
        <Button size="sm" variant="outline">{interview.status || "View Report"}</Button>
      )}
    </div>
  </div>
);

export default InterviewCentralPage;
