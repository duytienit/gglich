
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EventTextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const EventTextArea: React.FC<EventTextAreaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full min-h-[80px]"
      />
    </div>
  );
};

export default EventTextArea;
