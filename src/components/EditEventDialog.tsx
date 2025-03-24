
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventData, EventCategory } from '@/types/calendar';
import EventDialogHeader from './event-dialog/EventDialogHeader';
import EventTextField from './event-dialog/EventTextField';
import EventTextArea from './event-dialog/EventTextArea';
import EventTimeFields from './event-dialog/EventTimeFields';
import EventCategorySelect from './event-dialog/EventCategorySelect';
import EventImportantToggle from './event-dialog/EventImportantToggle';
import EventDialogActions from './event-dialog/EventDialogActions';

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
        <EventDialogHeader 
          title={event ? 'Edit Event' : 'Create Event'} 
          onClose={onClose}
        />

        <div className="space-y-6">
          <EventTextField
            id="title"
            label="Event Title"
            placeholder="Enter event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <EventTextArea
            id="description"
            label="Description"
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <EventTimeFields
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={(e) => setStartTime(e.target.value)}
            onEndTimeChange={(e) => setEndTime(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <EventCategorySelect
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
            />

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
            <EventImportantToggle
              isImportant={isImportant}
              onImportantChange={setIsImportant}
            />

            <Button variant="outline" className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              Customize Color
            </Button>
          </div>

          <EventDialogActions
            onCancel={onClose}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default EditEventDialog;
