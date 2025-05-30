
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle, Bell, Lock, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SettingsPage = () => {
  const settingsOptions = [
    { id: 'profile', title: 'Profile Settings', description: 'Manage your personal information and account details.', icon: <UserCircle className="w-6 h-6 text-primary" /> },
    { id: 'notifications', title: 'Notification Preferences', description: 'Control how you receive updates and alerts.', icon: <Bell className="w-6 h-6 text-secondary" /> },
    { id: 'security', title: 'Security & Password', description: 'Update your password and manage security settings.', icon: <Lock className="w-6 h-6 text-purple-500" /> },
    { id: 'organization', title: 'Organization Details', description: 'Manage your company information and branding.', icon: <Briefcase className="w-6 h-6 text-red-500" /> },
    { id: 'integrations', title: 'Integrations', description: 'Connect with other tools and services.', icon: <Briefcase className="w-6 h-6 text-green-500" /> }, // Re-using briefcase for example
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
        Application Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsOptions.map((option) => (
          <Card key={option.id} className="glassmorphism hover:border-primary transition-all duration-300 transform hover:scale-105">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                {option.icon}
                <CardTitle className="text-xl">{option.title}</CardTitle>
              </div>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                Manage {option.title.split(' ')[0]}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default SettingsPage;
