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

// Mock hourly temperatures - updated for 24 hours
export const getHourlyTemperatures = (day: number): DayTemperature[] => {
  const baseTempsByDay = [22, 23, 22, 23, 21, 17, 21]; // Base temperature for each day of week
  const baseTemp = baseTempsByDay[day];
  
  const temperatures: DayTemperature[] = [];
  for (let hour = 0; hour < 24; hour++) {
    // Generate temperatures with some variation based on time of day
    let temp = baseTemp;
    if (hour < 6) {
      temp = baseTemp - 3 + Math.floor(Math.random() * 2);
    } else if (hour < 10) {
      temp = baseTemp - 1 + Math.floor(Math.random() * 3);
    } else if (hour >= 10 && hour <= 14) {
      temp = baseTemp + 2 + Math.floor(Math.random() * 3);
    } else if (hour >= 15 && hour <= 19) {
      temp = baseTemp + Math.floor(Math.random() * 3);
    } else {
      temp = baseTemp - 2 + Math.floor(Math.random() * 3);
    }
    
    temperatures.push({
      time: hour,
      temperature: temp
    });
  }
  
  return temperatures;
};

// Format time for display - 24-hour format
export const formatTime = (hour: number) => {
  if (hour === 0) return "12:00 AM";
  if (hour === 12) return "12:00 PM";
  
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${period}`;
};
