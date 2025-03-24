
import React from 'react';
import { Button } from '@/components/ui/button';

interface EventDialogActionsProps {
  onCancel: () => void;
  onSave: () => void;
}

const EventDialogActions: React.FC<EventDialogActionsProps> = ({
  onCancel,
  onSave
}) => {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default EventDialogActions;
