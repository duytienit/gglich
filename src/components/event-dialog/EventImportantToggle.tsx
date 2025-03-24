
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface EventImportantToggleProps {
  isImportant: boolean;
  onImportantChange: (checked: boolean) => void;
}

const EventImportantToggle: React.FC<EventImportantToggleProps> = ({
  isImportant,
  onImportantChange
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="important"
        checked={isImportant}
        onCheckedChange={onImportantChange}
      />
      <Label htmlFor="important">Mark as important</Label>
    </div>
  );
};

export default EventImportantToggle;
