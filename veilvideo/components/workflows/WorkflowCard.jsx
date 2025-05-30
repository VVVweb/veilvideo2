
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Trash2 } from 'lucide-react';

const WorkflowRuleCard = ({ automation, index, onUpdate, onRemove, children, typeSpecificFields }) => {
  if (!automation || typeof automation.id === 'undefined') {
    console.error("WorkflowRuleCard received invalid automation object:", automation);
    return <Card className="p-4 border bg-destructive/20 shadow-md text-destructive-foreground">Error: Invalid automation data.</Card>;
  }

  return (
    <Card className="p-4 border bg-card/50 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <Input
          value={automation.name || ''}
          onChange={(e) => onUpdate(index, { ...automation, name: e.target.value })}
          placeholder="Automation Name"
          className="text-lg font-semibold flex-grow mr-4 border-0 border-b-2 border-transparent focus:border-primary rounded-none px-1"
        />
        <div className="flex items-center space-x-2">
          <Switch
            checked={!!automation.enabled}
            onCheckedChange={(checked) => onUpdate(index, { ...automation, enabled: checked })}
            aria-label="Enable or disable automation"
          />
          <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Remove automation">
            <Trash2 className="w-5 h-5 text-destructive" />
          </Button>
        </div>
      </div>
      {children}
      {typeSpecificFields && typeSpecificFields(automation, index, onUpdate)}
    </Card>
  );
};


const TaskAutomationFields = ({ automation, index, onUpdate }) => {
  if (!automation || typeof automation.id === 'undefined') return null; 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`task-trigger-${automation.id}`}>Trigger</Label>
        <Select
          value={automation.trigger || ''}
          onValueChange={(value) => onUpdate(index, { ...automation, trigger: value })}
        >
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
          <Input
            id={`task-stage-${automation.id}`}
            placeholder="e.g., Interview Scheduled"
            value={automation.stage || ''}
            onChange={(e) => onUpdate(index, { ...automation, stage: e.target.value })}
          />
        </div>
      )}
      <div>
        <Label htmlFor={`task-details-${automation.id}`}>Task Details</Label>
        <Input
          id={`task-details-${automation.id}`}
          placeholder="e.g., Follow up with candidate"
          value={automation.taskDetails || ''}
          onChange={(e) => onUpdate(index, { ...automation, taskDetails: e.target.value })}
        />
      </div>
    </div>
  );
};

const EmailAutomationFields = ({ automation, index, onUpdate }) => {
  if (!automation || typeof automation.id === 'undefined') return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor={`email-trigger-${automation.id}`}>Trigger Event</Label>
        <Select
          value={automation.trigger || ''}
          onValueChange={(value) => onUpdate(index, { ...automation, trigger: value })}
        >
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
          <Input
            id={`email-status-${automation.id}`}
            placeholder="e.g., Rejected, Hired"
            value={automation.status || ''}
            onChange={(e) => onUpdate(index, { ...automation, status: e.target.value })}
          />
        </div>
      )}
      <div>
        <Label htmlFor={`email-template-${automation.id}`}>Email Template ID</Label>
        <Input
          id={`email-template-${automation.id}`}
          placeholder="Select or enter template ID"
          value={automation.templateId || ''}
          onChange={(e) => onUpdate(index, { ...automation, templateId: e.target.value })}
        />
      </div>
    </div>
  );
};

const ScreeningFilterFields = ({ automation, index, onUpdate }) => {
  if (!automation || typeof automation.id === 'undefined') return null;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor={`filter-field-${automation.id}`}>Field</Label>
          <Select
            value={automation.field || ''}
            onValueChange={(value) => onUpdate(index, { ...automation, field: value })}
          >
            <SelectTrigger id={`filter-field-${automation.id}`}>
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
          <Label htmlFor={`filter-condition-${automation.id}`}>Condition</Label>
          <Select
            value={automation.condition || ''}
            onValueChange={(value) => onUpdate(index, { ...automation, condition: value })}
          >
            <SelectTrigger id={`filter-condition-${automation.id}`}>
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
          <Label htmlFor={`filter-value-${automation.id}`}>Value</Label>
          <Input
            id={`filter-value-${automation.id}`}
            placeholder="e.g., React, 5, Bachelor's"
            value={automation.value || ''}
            onChange={(e) => onUpdate(index, { ...automation, value: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <Label htmlFor={`filter-action-${automation.id}`}>Action</Label>
          <Select
            value={automation.action || ''}
            onValueChange={(value) => onUpdate(index, { ...automation, action: value })}
          >
            <SelectTrigger id={`filter-action-${automation.id}`}>
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add_tag">Add Tag</SelectItem>
              <SelectItem value="auto_reject">Auto-Reject</SelectItem>
              <SelectItem value="flag_for_review">Flag for Review</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {automation.action === 'add_tag' && (
          <div>
            <Label htmlFor={`filter-tag-${automation.id}`}>Tag</Label>
            <Input
              id={`filter-tag-${automation.id}`}
              placeholder="e.g., Top Candidate"
              value={automation.tag || ''}
              onChange={(e) => onUpdate(index, { ...automation, tag: e.target.value })}
            />
          </div>
        )}
      </div>
    </>
  );
};


const WorkflowSection = ({ title, description, icon, automations, onUpdate, onAdd, onRemove, onSave, typeSpecificFields, automationType }) => {
  const commonCardClasses = "glassmorphism hover:border-primary/50 transition-all duration-300 shadow-lg";
  return (
    <Card className={`mb-8 ${commonCardClasses}`}>
      <CardHeader>
        <div className="flex items-center space-x-3">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {automations.map((automationItem, index) => (
          <WorkflowRuleCard
            key={automationItem.id} 
            automation={automationItem}
            index={index}
            onUpdate={(idx, updatedAutomation) => onUpdate(automationType, idx, updatedAutomation)}
            onRemove={() => onRemove(automationType, automationItem.id)}
            typeSpecificFields={typeSpecificFields}
          />
        ))}
        <Button variant="outline" onClick={() => onAdd(automationType)} className="mt-4 border-dashed border-primary text-primary hover:bg-primary/10 hover:text-primary">
          <PlusCircle className="w-4 h-4 mr-2" /> Add {title.replace(' Automation', '').replace(' Filters', '')} Rule
        </Button>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSave(automationType)} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">Save {title}</Button>
      </CardFooter>
    </Card>
  );
};

export { WorkflowRuleCard, TaskAutomationFields, EmailAutomationFields, ScreeningFilterFields, WorkflowSection };
