
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserPlus, Users, Filter, Eye } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const CandidatesPage = () => {
  // Placeholder candidate data
  const candidates = [
    { id: 1, name: "Alice Wonderland", job: "Senior Software Engineer", stage: "Interview", avatar: "https://i.pravatar.cc/150?u=alice" },
    { id: 2, name: "Bob The Builder", job: "Product Manager", stage: "Applied", avatar: "https://i.pravatar.cc/150?u=bob" },
    { id: 3, name: "Charlie Chaplin", job: "UX Designer", stage: "Offer", avatar: "https://i.pravatar.cc/150?u=charlie" },
    { id: 4, name: "Diana Prince", job: "Senior Software Engineer", stage: "Screening", avatar: "https://i.pravatar.cc/150?u=diana" },
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
          Manage Candidates
        </h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <Filter className="mr-2 h-5 w-5" /> Filter
          </Button>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
            <UserPlus className="mr-2 h-5 w-5" /> Add Candidate
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="glassmorphism hover:border-primary transition-all duration-300 transform hover:scale-105">
            <CardHeader className="items-center text-center">
              <Avatar className="w-20 h-20 mb-3 border-2 border-primary/50">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{candidate.name}</CardTitle>
              <CardDescription>Applied for: {candidate.job}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Stage: <span className="font-semibold text-primary">{candidate.stage}</span></p>
              <Button variant="ghost" size="sm" className="w-full mt-3 text-secondary hover:text-secondary/80">
                <Eye className="mr-2 h-4 w-4" /> View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {candidates.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-xl font-semibold">No candidates found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Start by adding candidates or linking job postings.</p>
        </div>
      )}
    </motion.div>
  );
};

export default CandidatesPage;
