
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Eye, Users, ShieldCheck } from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="h-full glassmorphism hover:border-primary transition-all duration-300 transform hover:scale-105">
      <CardHeader className="items-center">
        <div className="p-3 rounded-full bg-primary/10 mb-2 text-primary">{icon}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-foreground/80">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const HomePage = () => {
  const backgroundImageUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2eec53f9-43fa-4fe6-bcca-ce0c7d56c3e2/77cae5e8790919c22848eedc036e91e3.png";

  return (
    <div className="relative min-h-screen overflow-hidden"> {/* Ensure relative positioning for absolute children */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15, /* Increased opacity */
        }}
      />
      <div className="relative z-10 container mx-auto px-4 py-16"> {/* Content must be on top */}
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
              VeilViewVideo
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Revolutionizing hiring with anonymous, AI-powered video interviews. Eliminate bias, uncover true potential.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6">
              <Link to="/interview">Start Anonymous Interview</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary/10 hover:text-primary">
              Learn More
            </Button>
          </div>
        </motion.section>

        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Eye className="w-8 h-8" />}
              title="Anonymous Video Interviews"
              description="Fair evaluation based on skills, not appearances. Candidates can toggle interviewer video."
              delay={0.1}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="AI Engagement Tracking"
              description="Real-time analysis of eye contact, engagement, and distractions via Azure Face API."
              delay={0.2}
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Real-Time Visual Feedback"
              description="Subtle cues and heatmaps guide candidates to improve engagement during the interview."
              delay={0.3}
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Behavioral Insights"
              description="Anonymized post-interview reports for employers, focusing on engagement and behavioral patterns."
              delay={0.4}
            />
          </div>
        </section>
        
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative py-20 overflow-hidden rounded-xl bg-gradient-to-br from-primary/30 via-purple-500/30 to-secondary/30"
        >
          <div className="absolute inset-0 opacity-50"> {/* Adjusted opacity for the section background */}
             <img  class="w-full h-full object-cover" alt="Abstract background with glowing geometric shapes and particles" src="https://images.unsplash.com/photo-1686654159302-23f41753b2ff" />
          </div>
          <div className="relative container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Experience the Future of Hiring?</h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Join VeilViewVideo today and be part of a fair, efficient, and unbiased recruitment process.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 transition-opacity text-lg px-10 py-6">
              Get Started Now
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;
