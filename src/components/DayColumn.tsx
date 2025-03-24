
import React from 'react';
import { EventData } from '@/types/calendar';
import CalendarEvent from '@/components/CalendarEvent';

interface DayColumnProps {
  dayIndex: number;
  timeSlots: number[];
  cellHeight: number;
  events: EventData[];
  onCellClick: (time: number, day: number) => void;
  onDragOver: (e: React.DragEvent, time: number, day: number) => void;
  onDrop: (e: React.DragEvent, time: number, day: number) => void;
  onDragStart: (event: React.DragEvent, id: string) => void;
  onEditEvent: (id: string) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({
  dayIndex,
  timeSlots,
  cellHeight,
  events,
  onCellClick,
  onDragOver,
  onDrop,
  onDragStart,
  onEditEvent
}) => {
  return (
    <div className="relative">
      {/* Time slots */}
      {timeSlots.map((time) => (
        <div
          key={`cell-${dayIndex}-${time}`}
          className="calendar-cell"
          style={{ height: `${cellHeight}px` }}
          onClick={() => onCellClick(time, dayIndex)}
          onDragOver={(e) => onDragOver(e, time, dayIndex)}
          onDrop={(e) => onDrop(e, time, dayIndex)}
        >
        </div>
      ))}
      
      {/* Events for this day */}
      {events
        .filter(event => event.day === dayIndex)
        .map(event => (
          <CalendarEvent
            key={event.id}
            event={event}
            cellHeight={cellHeight}
            onDragStart={onDragStart}
            onEditEvent={onEditEvent}
          />
        ))
      }
    </div>
  );
};

export default DayColumn;
