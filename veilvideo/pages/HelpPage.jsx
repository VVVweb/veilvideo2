
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HelpCircle, BookOpen, MessageSquare, Search } from 'lucide-react';

const HelpPage = () => {
  const faqItems = [
    { q: "How do I create a new job posting?", a: "Navigate to the 'Jobs' section and click on 'Create New Job'. Fill in the required details and publish." },
    { q: "Can I integrate with external calendars for interview scheduling?", a: "Yes, calendar integration options are available in the 'Interview Scheduling' or 'Settings' section." },
    { q: "Where can I find candidate engagement reports?", a: "AI-powered engagement reports are typically available within the 'Interview Central' or on individual candidate profiles after an interview." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
        Help & Support Center
      </h1>

      <Card className="mb-8 glassmorphism">
        <CardHeader>
          <CardTitle className="flex items-center"><Search className="mr-2 h-6 w-6 text-primary" />Search Knowledge Base</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input type="text" placeholder="Ask a question or search keywords..." className="flex-grow" />
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <HelpResourceCard icon={<BookOpen />} title="User Guides" description="Detailed documentation and tutorials." />
        <HelpResourceCard icon={<HelpCircle />} title="FAQ" description="Find answers to common questions." />
        <HelpResourceCard icon={<MessageSquare />} title="Contact Support" description="Get in touch with our support team." />
      </div>
      
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqItems.map((item, index) => (
            <details key={index} className="group rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-colors">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-medium text-foreground group-open:text-primary">
                {item.q}
                <ChevronDownIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:-rotate-180 text-primary" />
              </summary>
              <p className="mt-2 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </CardContent>
      </Card>

    </motion.div>
  );
};

const HelpResourceCard = ({ icon, title, description }) => (
  <Card className="text-center glassmorphism hover:border-primary transition-all duration-300 transform hover:scale-105">
    <CardHeader>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
      <Button variant="link" className="mt-2 text-primary">Learn More</Button>
    </CardContent>
  </Card>
);

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}


export default HelpPage;
