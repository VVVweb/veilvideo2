
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Megaphone, TrendingUp, Share2, Edit } from 'lucide-react';

const MarketingPage = () => {
  const campaigns = [
    { id: 1, name: "Spring Hiring Drive", status: "Active", reach: 15000, engagement: "12%", platform: "LinkedIn, Indeed" },
    { id: 2, name: "Tech Talent Outreach", status: "Paused", reach: 8000, engagement: "8%", platform: "GitHub Jobs, Stack Overflow" },
    { id: 3, name: "Graduate Program 2025", status: "Planning", reach: 0, engagement: "N/A", platform: "University Portals" },
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
          Recruitment Marketing
        </h1>
        <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
          <Megaphone className="mr-2 h-5 w-5" /> Create New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard icon={<TrendingUp />} title="Total Reach" value="23,000+" description="Across all active campaigns" />
        <StatCard icon={<Share2 />} title="Total Engagement" value="10.5%" description="Average engagement rate" />
        <StatCard icon={<Megaphone />} title="Active Campaigns" value="2" description="Currently running marketing efforts" />
      </div>
      
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Marketing Campaigns</CardTitle>
          <CardDescription>Manage and track your recruitment marketing campaigns.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <Card key={campaign.id} className="bg-card/80 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'Active' ? 'bg-green-500/20 text-green-400' : 
                      campaign.status === 'Paused' ? 'bg-yellow-500/20 text-yellow-400' : 
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <CardDescription>Platforms: {campaign.platform}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between items-center text-sm">
                  <div>
                    <p>Reach: <span className="font-semibold">{campaign.reach.toLocaleString()}</span></p>
                    <p>Engagement: <span className="font-semibold">{campaign.engagement}</span></p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm"><Edit className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm"><TrendingUp className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
             {campaigns.length === 0 && (
                <p className="text-muted-foreground text-center py-4">No marketing campaigns created yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const StatCard = ({ icon, title, value, description }) => (
  <Card className="glassmorphism text-center hover:border-primary transition-all duration-300">
    <CardHeader className="pb-2">
       <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
         {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>
      <CardTitle className="text-2xl font-bold">{value}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export default MarketingPage;
