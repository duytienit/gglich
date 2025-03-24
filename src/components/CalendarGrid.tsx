
import React from 'react';
import { CalendarDay, EventData } from '@/types/calendar';
import TimeColumn from '@/components/TimeColumn';
import DayColumn from '@/components/DayColumn';

interface CalendarGridProps {
  days: CalendarDay[];
  timeSlots: number[];
  events: EventData[];
  cellHeight: number;
  hourlyTemperatures: Record<number, number[]>;
  onCellClick: (time: number, day: number) => void;
  onEditEvent: (id: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  timeSlots,
  events,
  cellHeight,
  hourlyTemperatures,
  onCellClick,
  onEditEvent
}) => {
  return (
    <div className="calendar-grid">
      {/* Time column */}
      <TimeColumn 
        timeSlots={timeSlots} 
        cellHeight={cellHeight} 
        hourlyTemperatures={hourlyTemperatures[0] || []}
      />
      
      {/* Days columns */}
      {days.map((day, dayIndex) => (
        <DayColumn
          key={`day-${dayIndex}`}
          dayIndex={dayIndex}
          timeSlots={timeSlots}
          cellHeight={cellHeight}
          events={events}
          onCellClick={onCellClick}
          onEditEvent={onEditEvent}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;
