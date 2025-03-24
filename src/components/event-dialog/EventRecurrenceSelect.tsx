
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventRecurrenceSelectProps {
  defaultValue?: string;
}

const EventRecurrenceSelect: React.FC<EventRecurrenceSelectProps> = ({
  defaultValue = 'none'
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="recurrence">Recurrence</Label>
      <Select defaultValue={defaultValue}>
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
  );
};

export default EventRecurrenceSelect;
