
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface EventTextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  helpText?: string;
}

const EventTextField: React.FC<EventTextFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  helpText
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full"
      />
      {helpText && (
        <p className="text-xs text-muted-foreground">{helpText}</p>
      )}
    </div>
  );
};

export default EventTextField;
