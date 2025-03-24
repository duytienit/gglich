
import React from 'react';
import { EventData } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface CalendarEventProps {
  event: EventData;
  cellHeight: number;
  onEditEvent: (id: string) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  event,
  cellHeight,
  onEditEvent
}) => {
  const duration = event.endTime - event.startTime;
  const height = cellHeight * duration;
  const top = (event.startTime % 1 === 0 ? event.startTime : Math.floor(event.startTime) + 0.5) * cellHeight;
  
  const formatTime = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes === 0 ? '00' : minutes < 10 ? `0${minutes}` : minutes} ${period}`;
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditEvent(event.id);
  };

  return (
    <div
      className={cn(
        'event-card',
        event.category,
        'animate-fade-in hover:shadow-lg transition-all duration-200'
      )}
      style={{
        height: `${height}px`,
        top: `${top}px`,
      }}
      onClick={handleClick}
    >
      <h3 className="event-title">{event.title}</h3>
      <p className="event-time">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </p>
      <div className="event-description">
        {event.description || <span className="text-muted-foreground italic">Click to add description</span>}
      </div>
      {event.isImportant && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse-subtle" />
      )}
    </div>
  );
};

export default CalendarEvent;
