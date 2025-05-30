
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Zap, Mail, Filter, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AutomatedWorkflowsPage = () => {
  const { toast } = useToast();
  const [taskAutomations, setTaskAutomations] = useState([
    { id: 1, name: 'Follow-up Reminder', trigger: 'candidate_stage_change', stage: 'Interview Scheduled', action: 'create_task', taskDetails: 'Follow up with candidate in 3 days', enabled: true },
  ]);
  const [emailAutomations, setEmailAutomations] = useState([
    { id: 1, name: 'Rejection Email', trigger: 'candidate_status_update', status: 'Rejected', templateId: 'rejection_template_01', enabled: true },
  ]);
  const [screeningFilters, setScreeningFilters] = useState([
    { id: 1, name: 'Keyword Match: React', field: 'resume_content', condition: 'contains', value: 'React', action: 'add_tag', tag: 'React Developer', enabled: false },
  ]);

  const handleSaveAutomations = (type) => {
    toast({
      title: 'Automations Saved!',
      description: `Your ${type} automations have been saved. (Backend not implemented)`,
    });
  };
  
  const addAutomation = (type) => {
    const newId = Math.random().toString(36).substr(2, 9);
    if (type === 'task') {
      setTaskAutomations([...taskAutomations, { id: newId, name: 'New Task Automation', trigger: '', action: '', taskDetails: '', enabled: false }]);
    } else if (type === 'email') {
      setEmailAutomations([...emailAutomations, { id: newId, name: 'New Email Automation', trigger: '', templateId: '', enabled: false }]);
    } else if (type === 'screening') {
      setScreeningFilters([...screeningFilters, { id: newId, name: 'New Screening Filter', field: '', condition: '', value: '', action: '', enabled: false }]);
    }
  };

  const removeAutomation = (id, type) => {
    if (type === 'task') {
      setTaskAutomations(taskAutomations.filter(item => item.id !== id));
    } else if (type === 'email') {
      setEmailAutomations(emailAutomations.filter(item => item.id !== id));
    } else if (type === 'screening') {
      setScreeningFilters(screeningFilters.filter(item => item.id !== id));
    }
    toast({ title: "Automation Removed", description: "The selected automation rule has been removed." });
  };
  
  const commonCardClasses = "glassmorphism hover:border-primary/50 transition-all duration-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text">
          Automated Workflows
        </h1>
        <Zap className="w-10 h-10 text-primary" />
      </div>
      <p className="text-muted-foreground mb-10">
        Configure automated actions for tasks, emails, and candidate screening to streamline your recruitment process.
      </p>

      {/* Task Automation Section */}
      <Card className={`mb-8 ${commonCardClasses}`}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Zap className="w-6 h-6 text-blue-500" />
            <CardTitle>Task Automation</CardTitle>
          </div>
          <CardDescription>Automate task creation based on triggers like candidate stage changes or application submissions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {taskAutomations.map((automation, index) => (
            <Card key={automation.id} className="p-4 border bg-card/50">
              <div className="flex justify-between items-center mb-2">
                <Input 
                  value={automation.name} 
                  onChange={(e) => {
                    const newAutomations = [...taskAutomations];
                    newAutomations[index].name = e.target.value;
                    setTaskAutomations(newAutomations);
                  }}
                  placeholder="Automation Name" 
                  className="text-lg font-semibold flex-grow mr-4"
                />
                <div className="flex items-center space-x-2">
                   <Switch checked={automation.enabled} onCheckedChange={(checked) => {
                    const newAutomations = [...taskAutomations];
                    newAutomations[index].enabled = checked;
                    setTaskAutomations(newAutomations);
                  }} />
                  <Button variant="ghost" size="icon" onClick={() => removeAutomation(automation.id, 'task')}>
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`task-trigger-${automation.id}`}>Trigger</Label>
                  <Select defaultValue={automation.trigger} onValueChange={(value) => {
                     const newAutomations = [...taskAutomations];
                     newAutomations[index].trigger = value;
                     setTaskAutomations(newAutomations);
                  }}>
                    <SelectTrigger id={`task-trigger-${automation.id}`}>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candidate_stage_change">Candidate Stage Change</SelectItem>
                      <SelectItem value="new_application">New Application</SelectItem>
                      <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {automation.trigger === 'candidate_stage_change' && (
                  <div>
                    <Label htmlFor={`task-stage-${automation.id}`}>Stage</Label>
                    <Input id={`task-stage-${automation.id}`} placeholder="e.g., Interview Scheduled" defaultValue={automation.stage} 
                     onChange={(e) => {
                        const newAutomations = [...taskAutomations];
                        newAutomations[index].stage = e.target.value;
                        setTaskAutomations(newAutomations);
                    }}
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor={`task-details-${automation.id}`}>Task Details</Label>
                  <Input id={`task-details-${automation.id}`} placeholder="e.g., Follow up with candidate" defaultValue={automation.taskDetails} 
                     onChange={(e) => {
                        const newAutomations = [...taskAutomations];
                        newAutomations[index].taskDetails = e.target.value;
                        setTaskAutomations(newAutomations);
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}
          <Button variant="outline" onClick={() => addAutomation('task')} className="mt-4 border-dashed border-primary text-primary hover:bg-primary/10">
            <PlusCircle className="w-4 h-4 mr-2" /> Add Task Automation
          </Button>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSaveAutomations('task')}>Save Task Automations</Button>
        </CardFooter>
      </Card>

      {/* Email Automation Section */}
      <Card className={`mb-8 ${commonCardClasses}`}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Mail className="w-6 h-6 text-green-500" />
            <CardTitle>Email Automation</CardTitle>
          </div>
          <CardDescription>Set up automated emails for different stages of the hiring process.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {emailAutomations.map((automation, index) => (
             <Card key={automation.id} className="p-4 border bg-card/50">
              <div className="flex justify-between items-center mb-2">
                <Input 
                  value={automation.name} 
                  onChange={(e) => {
                    const newAutomations = [...emailAutomations];
                    newAutomations[index].name = e.target.value;
                    setEmailAutomations(newAutomations);
                  }}
                  placeholder="Automation Name" 
                  className="text-lg font-semibold flex-grow mr-4"
                />
                <div className="flex items-center space-x-2">
                  <Switch checked={automation.enabled} onCheckedChange={(checked) => {
                    const newAutomations = [...emailAutomations];
                    newAutomations[index].enabled = checked;
                    setEmailAutomations(newAutomations);
                  }} />
                  <Button variant="ghost" size="icon" onClick={() => removeAutomation(automation.id, 'email')}>
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`email-trigger-${automation.id}`}>Trigger Event</Label>
                   <Select defaultValue={automation.trigger} onValueChange={(value) => {
                     const newAutomations = [...emailAutomations];
                     newAutomations[index].trigger = value;
                     setEmailAutomations(newAutomations);
                  }}>
                    <SelectTrigger id={`email-trigger-${automation.id}`}>
                      <SelectValue placeholder="Select trigger event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="candidate_status_update">Candidate Status Update</SelectItem>
                      <SelectItem value="application_received">Application Received</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 {automation.trigger === 'candidate_status_update' && (
                  <div>
                    <Label htmlFor={`email-status-${automation.id}`}>Candidate Status</Label>
                    <Input id={`email-status-${automation.id}`} placeholder="e.g., Rejected, Hired" defaultValue={automation.status}
                     onChange={(e) => {
                        const newAutomations = [...emailAutomations];
                        newAutomations[index].status = e.target.value;
                        setEmailAutomations(newAutomations);
                    }}/>
                  </div>
                )}
                <div>
                  <Label htmlFor={`email-template-${automation.id}`}>Email Template ID</Label>
                  <Input id={`email-template-${automation.id}`} placeholder="Select or enter template ID" defaultValue={automation.templateId}
                    onChange={(e) => {
                        const newAutomations = [...emailAutomations];
                        newAutomations[index].templateId = e.target.value;
                        setEmailAutomations(newAutomations);
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}
           <Button variant="outline" onClick={() => addAutomation('email')} className="mt-4 border-dashed border-primary text-primary hover:bg-primary/10">
            <PlusCircle className="w-4 h-4 mr-2" /> Add Email Automation
          </Button>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSaveAutomations('email')}>Save Email Automations</Button>
        </CardFooter>
      </Card>

      {/* Candidate Screening Filters Section */}
      <Card className={`${commonCardClasses}`}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Filter className="w-6 h-6 text-yellow-500" />
            <CardTitle>Candidate Screening Filters</CardTitle>
          </div>
          <CardDescription>Define rules to automatically filter, tag, or score candidates based on their profile or application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {screeningFilters.map((filter, index) => (
             <Card key={filter.id} className="p-4 border bg-card/50">
               <div className="flex justify-between items-center mb-2">
                <Input 
                  value={filter.name} 
                  onChange={(e) => {
                    const newFilters = [...screeningFilters];
                    newFilters[index].name = e.target.value;
                    setScreeningFilters(newFilters);
                  }}
                  placeholder="Filter Name" 
                  className="text-lg font-semibold flex-grow mr-4"
                />
                 <div className="flex items-center space-x-2">
                  <Switch checked={filter.enabled} onCheckedChange={(checked) => {
                     const newFilters = [...screeningFilters];
                     newFilters[index].enabled = checked;
                     setScreeningFilters(newFilters);
                  }} />
                  <Button variant="ghost" size="icon" onClick={() => removeAutomation(filter.id, 'screening')}>
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`filter-field-${filter.id}`}>Field</Label>
                  <Select defaultValue={filter.field} onValueChange={(value) => {
                     const newFilters = [...screeningFilters];
                     newFilters[index].field = value;
                     setScreeningFilters(newFilters);
                  }}>
                    <SelectTrigger id={`filter-field-${filter.id}`}>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resume_content">Resume Content</SelectItem>
                      <SelectItem value="experience_years">Years of Experience</SelectItem>
                      <SelectItem value="education_level">Education Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`filter-condition-${filter.id}`}>Condition</Label>
                  <Select defaultValue={filter.condition} onValueChange={(value) => {
                     const newFilters = [...screeningFilters];
                     newFilters[index].condition = value;
                     setScreeningFilters(newFilters);
                  }}>
                    <SelectTrigger id={`filter-condition-${filter.id}`}>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="greater_than">Greater Than</SelectItem>
                      <SelectItem value="less_than">Less Than</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`filter-value-${filter.id}`}>Value</Label>
                  <Input id={`filter-value-${filter.id}`} placeholder="e.g., React, 5, Bachelor's" defaultValue={filter.value} 
                    onChange={(e) => {
                        const newFilters = [...screeningFilters];
                        newFilters[index].value = e.target.value;
                        setScreeningFilters(newFilters);
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <Label htmlFor={`filter-action-${filter.id}`}>Action</Label>
                     <Select defaultValue={filter.action} onValueChange={(value) => {
                        const newFilters = [...screeningFilters];
                        newFilters[index].action = value;
                        setScreeningFilters(newFilters);
                    }}>
                        <SelectTrigger id={`filter-action-${filter.id}`}>
                        <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="add_tag">Add Tag</SelectItem>
                        <SelectItem value="auto_reject">Auto-Reject</SelectItem>
                        <SelectItem value="flag_for_review">Flag for Review</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {filter.action === 'add_tag' && (
                    <div>
                        <Label htmlFor={`filter-tag-${filter.id}`}>Tag</Label>
                        <Input id={`filter-tag-${filter.id}`} placeholder="e.g., Top Candidate" defaultValue={filter.tag} 
                            onChange={(e) => {
                                const newFilters = [...screeningFilters];
                                newFilters[index].tag = e.target.value;
                                setScreeningFilters(newFilters);
                            }}
                        />
                    </div>
                )}
              </div>
            </Card>
          ))}
           <Button variant="outline" onClick={() => addAutomation('screening')} className="mt-4 border-dashed border-primary text-primary hover:bg-primary/10">
            <PlusCircle className="w-4 h-4 mr-2" /> Add Screening Filter
          </Button>
        </CardContent>
        <CardFooter>
          <Button onClick={() => handleSaveAutomations('screening')}>Save Screening Filters</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AutomatedWorkflowsPage;
