
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface EventTimeFieldsProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventTimeFields: React.FC<EventTimeFieldsProps> = ({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="startTime">Start Time</Label>
        <Input
          id="startTime"
          type="text"
          placeholder="e.g. 9.5 for 9:30"
          value={startTime}
          onChange={onStartTimeChange}
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
          onChange={onEndTimeChange}
        />
      </div>
    </div>
  );
};

export default EventTimeFields;
