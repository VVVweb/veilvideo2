
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

const ApplicationsPage = () => {
  // Placeholder application data
  const applications = [
    { id: 1, candidateName: "Ella Fitzgerald", jobTitle: "Jazz Vocalist Lead", status: "Reviewed", submittedDate: "2025-04-28" },
    { id: 2, candidateName: "Louis Armstrong", jobTitle: "Trumpet Virtuoso", status: "Shortlisted", submittedDate: "2025-04-25" },
    { id: 3, candidateName: "Billie Holiday", jobTitle: "Blues Interpreter", status: "New", submittedDate: "2025-05-01" },
    { id: 4, candidateName: "Duke Ellington", jobTitle: "Orchestra Conductor", status: "Rejected", submittedDate: "2025-04-20" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Reviewed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'Shortlisted': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'New': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
        Candidate Applications
      </h1>
      
      <div className="space-y-6">
        {applications.map(app => (
          <Card key={app.id} className="glassmorphism hover:border-primary transition-all duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{app.candidateName}</CardTitle>
                  <CardDescription>Applied for: {app.jobTitle}</CardDescription>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-md bg-card-foreground/5">
                  {getStatusIcon(app.status)}
                  <span className="text-sm font-medium">{app.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Submitted: {new Date(app.submittedDate).toLocaleDateString()}</p>
              {/* Add more application details or actions here */}
            </CardContent>
          </Card>
        ))}
         {applications.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold">No applications found</h3>
            <p className="mt-1 text-sm text-muted-foreground">Candidate applications will appear here once submitted.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ApplicationsPage;
