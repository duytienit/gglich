
import { useState, useEffect, useRef } from 'react';
import { addDays, subDays } from 'date-fns';
import { EventData, CalendarDay, CategoryData } from '@/types/calendar';
import { getWeekDays, getHourlyTemperatures } from '@/utils/dateUtils';
import { useToast } from '@/hooks/use-toast';

// Default categories
const defaultCategories: CategoryData[] = [
  { id: 'work', name: 'Work', icon: '💼', color: '#e74c3c' },
  { id: 'study', name: 'Study', icon: '📚', color: '#3498db' },
  { id: 'health', name: 'Health', icon: '🏥', color: '#2ecc71' },
  { id: 'important', name: 'Important', icon: '⭐', color: '#f39c12' },
];

// Sample event data
const sampleEvents: EventData[] = [
  {
    id: 'event-1',
    title: 'Team Meeting',
    description: 'Weekly team sync',
    startTime: 9,
    endTime: 10.5,
    day: 0, // Monday
    category: 'work',
    isImportant: false,
  },
  {
    id: 'event-2',
    title: 'Project Review',
    description: 'Review latest designs',
    startTime: 10,
    endTime: 11.5,
    day: 1, // Tuesday
    category: 'study',
    isImportant: false,
  },
  {
    id: 'event-3',
    title: 'Design Workshop',
    description: 'Interactive workshop session',
    startTime: 11,
    endTime: 12.5,
    day: 2, // Wednesday
    category: 'important',
    isImportant: true,
  },
  {
    id: 'event-4',
    title: 'Client Call',
    description: 'Demo for new client',
    startTime: 9.5,
    endTime: 10.5,
    day: 3, // Thursday
    category: 'work',
    isImportant: false,
  },
  {
    id: 'event-5',
    title: 'Lunch Meeting',
    description: 'Team lunch',
    startTime: 12,
    endTime: 13,
    day: 4, // Friday
    category: 'health',
    isImportant: false,
  },
];

// Generate time slots for the calendar (24 hours)
export const timeSlots = Array.from({ length: 24 }, (_, i) => i);

export const useCalendar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [events, setEvents] = useState<EventData[]>(sampleEvents);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isCategoriesDialogOpen, setIsCategoriesDialogOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryData[]>(defaultCategories);
  const [weekTransition, setWeekTransition] = useState<'next' | 'prev' | null>(null);
  const [hourlyTemperatures, setHourlyTemperatures] = useState<Record<number, number[]>>({});
  const calendarRef = useRef<HTMLDivElement>(null);
  const cellHeight = 60; // Height of a calendar cell in pixels

  // Initialize calendar days
  useEffect(() => {
    const newDays = getWeekDays(currentDate);
    setDays(newDays);
    
    // Generate hourly temperatures for each day
    const temperatures: Record<number, number[]> = {};
    newDays.forEach((day, index) => {
      const hourlyTemps = getHourlyTemperatures(index);
      temperatures[index] = hourlyTemps.map(t => t.temperature);
    });
    setHourlyTemperatures(temperatures);
  }, [currentDate]);

  // Handle week navigation with animation
  const handlePrevWeek = () => {
    setWeekTransition('prev');
    setCurrentDate(prev => subDays(prev, 7));
    
    setTimeout(() => {
      setWeekTransition(null);
    }, 400); // Match animation duration
  };

  const handleNextWeek = () => {
    setWeekTransition('next');
    setCurrentDate(prev => addDays(prev, 7));
    
    setTimeout(() => {
      setWeekTransition(null);
    }, 400); // Match animation duration
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Handle event creation
  const handleCellClick = (time: number, day: number) => {
    const newEvent: EventData = {
      id: `event-${Date.now()}`,
      title: 'New Event',
      description: '',
      startTime: time,
      endTime: time + 1,
      day,
      category: 'work',
      isImportant: false,
    };
    
    setEditingEvent(newEvent);
    setIsEventDialogOpen(true);
  };

  // Handle event editing
  const handleEditEvent = (id: string) => {
    const event = events.find(e => e.id === id);
    if (event) {
      setEditingEvent({...event});
      setIsEventDialogOpen(true);
      
      toast({
        title: "Edit Event",
        description: `Editing "${event.title}"`,
      });
    }
  };

  // Handle event saving
  const handleSaveEvent = (event: EventData) => {
    if (events.some(e => e.id === event.id)) {
      // Update existing event
      setEvents(events.map(e => e.id === event.id ? event : e));
      toast({
        title: "Event updated",
        description: `"${event.title}" has been updated`,
      });
    } else {
      // Add new event
      setEvents([...events, event]);
      toast({
        title: "Event created",
        description: `"${event.title}" has been added to your calendar`,
      });
    }
  };

  return {
    currentDate,
    days,
    events,
    editingEvent,
    isEventDialogOpen,
    isCategoriesDialogOpen,
    categories,
    weekTransition,
    hourlyTemperatures,
    calendarRef,
    cellHeight,
    handlePrevWeek,
    handleNextWeek,
    handleToday,
    handleCellClick,
    handleEditEvent,
    handleSaveEvent,
    setEditingEvent,
    setIsEventDialogOpen,
    setIsCategoriesDialogOpen,
    setCategories
  };
};
