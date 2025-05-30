
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarPlus, Clock, Users, Video } from 'lucide-react';

const InterviewSchedulingPage = () => {
  // This is a placeholder. A real scheduling page would involve a calendar component,
  // availability selection, candidate selection, etc.

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
        Schedule Interview
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="flex items-center"><CalendarPlus className="mr-2 h-6 w-6 text-primary" />New Interview Details</CardTitle>
              <CardDescription>Select candidate, job, date, time, and interview type.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                {/* Placeholder for Candidate Selection */}
                <label className="block text-sm font-medium text-muted-foreground mb-1">Candidate</label>
                <p className="p-3 rounded-md border bg-muted/30">Candidate selection dropdown/search will be here.</p>
              </div>
              <div>
                {/* Placeholder for Job Selection */}
                <label className="block text-sm font-medium text-muted-foreground mb-1">Job Position</label>
                <p className="p-3 rounded-md border bg-muted/30">Job position selection will be here.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Date</label>
                  <p className="p-3 rounded-md border bg-muted/30">Date picker component will be here.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Time</label>
                  <p className="p-3 rounded-md border bg-muted/30">Time slot selection will be here.</p>
                </div>
              </div>
               <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Interview Type</label>
                <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1"><Video className="mr-2 h-4 w-4"/> Video (VeilView)</Button>
                    <Button variant="outline" className="flex-1">Phone Call</Button>
                    <Button variant="outline" className="flex-1">On-site</Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Interviewers</label>
                <p className="p-3 rounded-md border bg-muted/30">Interviewer selection (multi-select) will be here.</p>
              </div>
              <Button size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                Send Invitation & Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="flex items-center"><Clock className="mr-2 h-5 w-5 text-secondary" />Availability Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">A mini-calendar or team availability summary will be shown here.</p>
              <div className="h-40 bg-muted/30 rounded-md mt-2 flex items-center justify-center">
                 <p className="text-sm text-muted-foreground">Calendar View Placeholder</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardHeader>
              <CardTitle className="flex items-center"><Users className="mr-2 h-5 w-5 text-purple-500" />Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">List of team members involved in hiring.</p>
               {/* Placeholder for team list */}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewSchedulingPage;
