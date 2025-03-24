
import React from 'react';
import { EventData } from '@/types/calendar';
import CalendarEvent from '@/components/CalendarEvent';

interface DayColumnProps {
  dayIndex: number;
  timeSlots: number[];
  cellHeight: number;
  events: EventData[];
  onCellClick: (time: number, day: number) => void;
  onEditEvent: (id: string) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({
  dayIndex,
  timeSlots,
  cellHeight,
  events,
  onCellClick,
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
            onEditEvent={onEditEvent}
          />
        ))
      }
    </div>
  );
};

export default DayColumn;
