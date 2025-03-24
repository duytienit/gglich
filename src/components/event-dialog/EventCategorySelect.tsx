
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventCategory } from '@/types/calendar';

interface EventCategorySelectProps {
  category: EventCategory;
  onCategoryChange: (value: EventCategory) => void;
  categories: { id: EventCategory; name: string; icon: string }[];
}

const EventCategorySelect: React.FC<EventCategorySelectProps> = ({
  category,
  onCategoryChange,
  categories
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select
        value={category}
        onValueChange={(value) => onCategoryChange(value as EventCategory)}
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
  );
};

export default EventCategorySelect;
