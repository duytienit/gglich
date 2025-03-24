
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface EventDialogHeaderProps {
  title: string;
  onClose: () => void;
}

const EventDialogHeader: React.FC<EventDialogHeaderProps> = ({
  title,
  onClose
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-medium">{title}</h2>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default EventDialogHeader;
