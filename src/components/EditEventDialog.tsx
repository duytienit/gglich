
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { EventData, EventCategory } from '@/types/calendar';
import { Label } from '@/components/ui/label';

interface EditEventDialogProps {
  event: EventData | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: EventData) => void;
  categories: { id: EventCategory; name: string; icon: string }[];
}

const EditEventDialog: React.FC<EditEventDialogProps> = ({
  event,
  isOpen,
  onClose,
  onSave,
  categories
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [category, setCategory] = useState<EventCategory>('work');
  const [isImportant, setIsImportant] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setStartTime(event.startTime.toString());
      setEndTime(event.endTime.toString());
      setCategory(event.category);
      setIsImportant(event.isImportant);
    } else {
      // Default values for new event
      setTitle('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      setCategory('work');
      setIsImportant(false);
    }
  }, [event]);

  const handleSave = () => {
    if (!title || !startTime || !endTime) return;

    const updatedEvent: EventData = {
      id: event?.id || `event-${Date.now()}`,
      title,
      description,
      startTime: parseFloat(startTime),
      endTime: parseFloat(endTime),
      day: event?.day || 0,
      category,
      isImportant,
    };

    onSave(updatedEvent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div 
        className="dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">
            {event ? 'Edit Event' : 'Create Event'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="text"
                placeholder="e.g. 9.5 for 9:30"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use decimal for half hours (e.g. 9.5 for 9:30)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="text"
                placeholder="e.g. 10.5 for 10:30"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value as EventCategory)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className="flex items-center">
                        <span className="mr-2">{cat.icon}</span>
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recurrence">Recurrence</Label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue placeholder="No recurrence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Recurrence</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="important"
                checked={isImportant}
                onCheckedChange={setIsImportant}
              />
              <Label htmlFor="important">Mark as important</Label>
            </div>

            <Button variant="outline" className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              Customize Color
            </Button>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventDialog;
