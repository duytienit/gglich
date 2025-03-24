
import { addDays, startOfWeek, format } from 'date-fns';
import { CalendarDay, DayTemperature } from '@/types/calendar';

export const getWeekDays = (date: Date): CalendarDay[] => {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Week starts on Monday
  const days: CalendarDay[] = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(start, i);
    days.push({
      date: day,
      dayOfMonth: parseInt(format(day, 'd')),
      dayOfWeek: i,
      weather: getWeatherForDay(day),
    });
  }

  return days;
};

// Mock weather data
export const getWeatherForDay = (date: Date) => {
  const dayOfWeek = date.getDay();
  const weatherIcons = ['sun', 'cloud', 'rain', 'sun', 'cloud', 'star', 'moon'];
  const temperatures = [25, 22, 15, 18, 20, 17, 19];
  
  return {
    temperature: temperatures[dayOfWeek],
    icon: weatherIcons[dayOfWeek],
  };
};

// Mock hourly temperatures
export const getHourlyTemperatures = (day: number): DayTemperature[] => {
  const baseTempsByDay = [22, 23, 22, 23, 21, 17, 21]; // Base temperature for each day of week
  const baseTemp = baseTempsByDay[day];
  
  const temperatures: DayTemperature[] = [];
  for (let hour = 7; hour <= 18; hour++) {
    // Generate temperatures with some variation based on time of day
    let temp = baseTemp;
    if (hour < 10) {
      temp = baseTemp - 1 + Math.floor(Math.random() * 3);
    } else if (hour >= 10 && hour <= 14) {
      temp = baseTemp + 2 + Math.floor(Math.random() * 3);
    } else {
      temp = baseTemp + Math.floor(Math.random() * 3);
    }
    
    temperatures.push({
      time: hour,
      temperature: temp
    });
  }
  
  return temperatures;
};

// Format time for display
export const formatTime = (hour: number) => {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${period}`;
};
