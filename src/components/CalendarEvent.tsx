
import React, { useRef } from 'react';
import { EventData } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface CalendarEventProps {
  event: EventData;
  cellHeight: number;
  onDragStart: (event: React.DragEvent, id: string) => void;
  onEditEvent: (id: string) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  event,
  cellHeight,
  onDragStart,
  onEditEvent
}) => {
  const eventRef = useRef<HTMLDivElement>(null);
  
  const duration = event.endTime - event.startTime;
  const height = cellHeight * duration;
  const top = (event.startTime % 1 === 0 ? event.startTime : Math.floor(event.startTime) + 0.5) * cellHeight;
  
  const formatTime = (time: number) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes === 0 ? '00' : minutes} ${period}`;
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditEvent(event.id);
  };

  return (
    <div
      ref={eventRef}
      className={cn(
        'event-card',
        event.category,
        'animate-fade-in'
      )}
      style={{
        height: `${height}px`,
        top: `${top}px`,
      }}
      draggable
      onDragStart={(e) => onDragStart(e, event.id)}
      onDoubleClick={handleDoubleClick}
    >
      <h3 className="event-title">{event.title}</h3>
      <p className="event-time">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </p>
      <div 
        className="event-description" 
        onClick={(e) => {
          e.stopPropagation();
          onEditEvent(event.id);
        }}
      >
        {event.description || <span className="text-muted-foreground italic">Click to add description</span>}
      </div>
      {event.isImportant && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse-subtle" />
      )}
    </div>
  );
};

export default CalendarEvent;
