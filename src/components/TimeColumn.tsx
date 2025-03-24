
import React from 'react';
import { formatTime } from '@/utils/dateUtils';
import TemperatureIndicator from '@/components/TemperatureIndicator';

interface TimeColumnProps {
  timeSlots: number[];
  cellHeight: number;
  hourlyTemperatures: number[];
}

const TimeColumn: React.FC<TimeColumnProps> = ({ 
  timeSlots, 
  cellHeight,
  hourlyTemperatures 
}) => {
  return (
    <div className="time-column relative">
      {timeSlots.map((time, index) => (
        <div 
          key={`time-${time}`} 
          className="calendar-cell flex items-center justify-center"
          style={{ height: `${cellHeight}px` }}
        >
          <div className="text-sm font-medium">
            {formatTime(time)}
          </div>
          
          {hourlyTemperatures && (
            <div 
              className="absolute -right-[25px]"
              style={{
                top: `${index * cellHeight + 20}px`,
              }}
            >
              <TemperatureIndicator 
                temperature={hourlyTemperatures[index]}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimeColumn;
