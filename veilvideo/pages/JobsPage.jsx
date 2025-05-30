
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Briefcase, Edit3, Trash2 } from 'lucide-react';

const JobsPage = () => {
  // Placeholder job data
  const jobs = [
    { id: 1, title: "Senior Software Engineer", location: "Remote", status: "Active", candidates: 25 },
    { id: 2, title: "Product Manager", location: "New York, NY", status: "Paused", candidates: 12 },
    { id: 3, title: "UX Designer", location: "San Francisco, CA", status: "Closed", candidates: 38 },
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
          Manage Jobs
        </h1>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
          <PlusCircle className="mr-2 h-5 w-5" /> Create New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="glassmorphism hover:border-primary transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Briefcase className="w-10 h-10 text-primary mb-2" />
                <span className={`px-2 py-1 text-xs rounded-full ${
                  job.status === 'Active' ? 'bg-green-500/20 text-green-400' : 
                  job.status === 'Paused' ? 'bg-yellow-500/20 text-yellow-400' : 
                  'bg-red-500/20 text-red-400'
                }`}>
                  {job.status}
                </span>
              </div>
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <CardDescription>{job.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{job.candidates} candidates applied</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1 border-primary text-primary hover:bg-primary/10">
                  <Edit3 className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-destructive text-destructive hover:bg-destructive/10">
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
       {jobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No jobs found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Get started by creating a new job posting.</p>
        </div>
      )}
    </motion.div>
  );
};

export default JobsPage;
