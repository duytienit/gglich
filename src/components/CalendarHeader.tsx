
import React from 'react';
import { format, isSameMonth } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Settings } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import TemperatureIndicator from './TemperatureIndicator';
import { CalendarDay } from '@/types/calendar';
import { cn } from '@/lib/utils';

interface CalendarHeaderProps {
  currentDate: Date;
  days: CalendarDay[];
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
  onManageCategories: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  days,
  onPrevWeek,
  onNextWeek,
  onToday,
  onManageCategories,
  onToggleTheme,
  isDarkMode
}) => {
  const weekStart = days[0]?.date;
  const weekEnd = days[days.length - 1]?.date;
  
  const displayTitle = () => {
    if (!weekStart || !weekEnd) return 'Calendar';
    
    // If week spans two months
    if (!isSameMonth(weekStart, weekEnd)) {
      return `${format(weekStart, 'MMMM')} - ${format(weekEnd, 'MMMM yyyy')}`;
    }
    
    return format(weekStart, 'MMMM yyyy');
  };

  return (
    <div className="p-4 border-b bg-background sticky top-0 z-10 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-light">{displayTitle()}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="rounded-full w-10 h-10 p-0" 
            onClick={onPrevWeek}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            className="rounded-full px-4 transition-all duration-300"
            onClick={onToday}
          >
            Today
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-full w-10 h-10 p-0" 
            onClick={onNextWeek}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <div className="mx-2" />
          
          <Button 
            variant="outline" 
            className="rounded-full"
            onClick={onManageCategories}
          >
            Manage Categories
          </Button>
          
          <Button
            variant="outline"
            className="rounded-full w-10 h-10 p-0"
            onClick={onToggleTheme}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-8 calendar-header">
        <div className="px-2 py-3 font-medium border-r">
          Time
        </div>
        
        {days.map((day, index) => (
          <div 
            key={index} 
            className={cn(
              "px-2 py-3 text-center border-r",
              format(day.date, 'MM/dd/yyyy') === format(new Date(), 'MM/dd/yyyy') && 
              "bg-primary/5"
            )}
          >
            <div className="font-medium flex justify-center items-center gap-1">
              {format(day.date, 'EEE')}
              <WeatherIcon icon={day.weather.icon} className="ml-1" />
            </div>
            <div className="text-sm text-muted-foreground">
              {format(day.date, 'd')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
