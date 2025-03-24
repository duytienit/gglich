
export type EventCategory = 'work' | 'study' | 'important' | 'health';

export interface EventData {
  id: string;
  title: string;
  description: string;
  startTime: number; // In decimal, e.g., 9.5 for 9:30
  endTime: number;
  day: number; // 0-6 for days of week
  category: EventCategory;
  isImportant: boolean;
}

export interface CategoryData {
  id: EventCategory;
  name: string;
  color: string;
  icon: string;
}

export interface DayWeatherData {
  temperature: number;
  icon: string;
}

export interface CalendarDay {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: number;
  weather: DayWeatherData;
}

export interface DayTemperature {
  time: number; // Decimal time
  temperature: number;
}
