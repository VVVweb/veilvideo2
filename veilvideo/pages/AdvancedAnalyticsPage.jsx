
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChartBig, TrendingUp, PieChart, Users } from 'lucide-react';

const AdvancedAnalyticsPage = () => {
  const analyticsData = [
    { title: "Time to Hire", value: "28 Days", trend: "+5%", icon: <TrendingUp className="w-8 h-8 text-green-500" />, description: "Average time from job posting to offer acceptance." },
    { title: "Source Effectiveness", value: "LinkedIn (45%)", trend: "Top Source", icon: <PieChart className="w-8 h-8 text-blue-500" />, description: "Percentage of hires from different sources." },
    { title: "Candidate Funnel", value: "150 Applicants -> 10 Hires", trend: "Conversion Rate: 6.7%", icon: <Users className="w-8 h-8 text-purple-500" />, description: "Candidate progression through hiring stages." },
    { title: "Offer Acceptance Rate", value: "85%", trend: "-2% MoM", icon: <BarChartBig className="w-8 h-8 text-red-500" />, description: "Percentage of offers accepted by candidates." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
        Advanced Analytics
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {analyticsData.map((item, index) => (
          <Card key={index} className="glassmorphism hover:border-primary transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.trend}</p>
              <CardDescription className="text-sm mt-2">{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Recruitment Performance Overview</CardTitle>
          <CardDescription>Detailed charts and data visualizations will be displayed here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/50 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Chart Placeholder: (e.g., Time to Hire Trend, Source Effectiveness Breakdown)</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdvancedAnalyticsPage;
