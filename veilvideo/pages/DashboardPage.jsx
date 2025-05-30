
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, Users, Briefcase, Settings, Zap } from 'lucide-react'; // Added Zap icon
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
        ATS Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardWidget icon={<Briefcase className="w-8 h-8 text-primary" />} title="Active Jobs" value="12" description="Jobs currently accepting applications." />
        <DashboardWidget icon={<Users className="w-8 h-8 text-secondary" />} title="New Candidates" value="45" description="Candidates added this week." />
        <DashboardWidget icon={<BarChart2 className="w-8 h-8 text-purple-500" />} title="Interviews Scheduled" value="8" description="Upcoming interviews." />
        {/* Changed this widget to link to Automated Workflows */}
        <DashboardWidget 
            icon={<Zap className="w-8 h-8 text-yellow-500" />} 
            title="Automated Workflows" 
            value="Setup" 
            description="Configure task, email, and screening automations." 
            isLink={true}
            linkTo="/automated-workflows"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glassmorphism">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Overview of recent actions and updates in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><span className="font-semibold text-foreground">New Application:</span> John Doe for Software Engineer.</li>
              <li><span className="font-semibold text-foreground">Interview Scheduled:</span> Jane Smith for Product Manager on 2025-05-10.</li>
              <li><span className="font-semibold text-foreground">Job Posted:</span> Senior UX Designer.</li>
              <li><span className="font-semibold text-foreground">Task Completed:</span> Review candidate profiles for Marketing Lead.</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="glassmorphism">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Access common actions quickly.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <Button asChild variant="outline" className="justify-start">
              <Link to="/requisitions/new"> <Briefcase className="w-4 h-4 mr-2" /> Post New Job</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/candidates"> <Users className="w-4 h-4 mr-2" /> View All Candidates</Link>
            </Button>
             <Button asChild variant="outline" className="justify-start">
              <Link to="/interview-scheduling"> <BarChart2 className="w-4 h-4 mr-2" /> Schedule Interview</Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link to="/settings"> <Settings className="w-4 h-4 mr-2" /> Go to Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

const DashboardWidget = ({ icon, title, value, description, isLink = false, linkTo = "#" }) => {
  const content = (
    <Card className="glassmorphism hover:border-primary transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  if (isLink) {
    return <Link to={linkTo} className="block h-full">{content}</Link>;
  }
  return content;
};


export default DashboardPage;
