
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bot, Send, MessageSquare, Lightbulb } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AskHRPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your HR AI Assistant. How can I help you with HR policies, benefits, or common queries today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const predefinedQueries = [
    "What is the company's vacation policy?",
    "How do I submit an expense report?",
    "Tell me about our health insurance benefits.",
    "What are the working hours?"
  ];

  const handleSend = async () => {
    if (input.trim() === '') return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I'm sorry, I couldn't find specific information on that. Can you try rephrasing or asking about a common HR topic?";
      if (input.toLowerCase().includes("vacation") || input.toLowerCase().includes("leave")) {
        botResponse = "Our company offers 20 days of paid vacation per year, accrued monthly. For more details, please refer to the Employee Handbook section 5.2.";
      } else if (input.toLowerCase().includes("expense report")) {
        botResponse = "Expense reports should be submitted through the company portal under 'My Expenses'. Ensure all receipts are attached.";
      } else if (input.toLowerCase().includes("health insurance") || input.toLowerCase().includes("benefits")) {
        botResponse = "We offer comprehensive health, dental, and vision insurance. You can find detailed plan information and enrollment forms on the HR Intranet under 'Benefits'.";
      } else if (input.toLowerCase().includes("working hours")) {
        botResponse = "Standard working hours are 9:00 AM to 5:00 PM, Monday to Friday, with a one-hour lunch break. Flexible arrangements may be available depending on your role and manager approval.";
      }
      
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };
  
  const handlePredefinedQuery = (query) => {
    setInput(query);
    // Optionally auto-send or just populate input
    // handleSend(); // if auto-send is desired
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 flex flex-col h-[calc(100vh-8rem)]" // Adjusted height for full viewport minus header/footer
    >
      <div className="flex items-center mb-6">
        <Bot className="w-10 h-10 text-primary mr-3" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
          Ask HR AI Assistant
        </h1>
      </div>

      <Card className="glassmorphism flex-grow flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle>Chat with HR AI</CardTitle>
          <CardDescription>Get instant answers to your HR-related questions.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col overflow-hidden p-0">
          <ScrollArea className="flex-grow p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
                 {msg.sender === 'user' && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
                 <div className="flex items-end space-x-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback><Bot size={18}/></AvatarFallback>
                    </Avatar>
                    <div className="max-w-xs p-3 rounded-xl bg-muted">
                        <p className="text-sm italic">Typing...</p>
                    </div>
                </div>
            )}
          </ScrollArea>
          <div className="p-4 border-t">
             <div className="flex flex-wrap gap-2 mb-3">
              {predefinedQueries.map((query, idx) => (
                <Button key={idx} variant="outline" size="sm" onClick={() => handlePredefinedQuery(query)} className="text-xs">
                  <Lightbulb className="mr-1 h-3 w-3" /> {query}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Textarea
                placeholder="Type your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (handleSend(), e.preventDefault())}
                className="flex-grow resize-none"
                rows={1}
              />
              <Button onClick={handleSend} disabled={isLoading} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Send className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Send</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AskHRPage;
