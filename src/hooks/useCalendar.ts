
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

// Generate time slots for the calendar (7:00 AM to 6:00 PM)
export const timeSlots = Array.from({ length: 12 }, (_, i) => i + 7);

export const useCalendar = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<CalendarDay[]>([]);
  const [events, setEvents] = useState<EventData[]>(sampleEvents);
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isCategoriesDialogOpen, setIsCategoriesDialogOpen] = useState(false);
  const [draggedEventId, setDraggedEventId] = useState<string | null>(null);
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
      setEditingEvent(event);
      setIsEventDialogOpen(true);
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

  // Handle drag and drop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedEventId(id);
    e.dataTransfer.setData('text/plain', id);
    
    if (e.currentTarget instanceof HTMLElement) {
      const rect = e.currentTarget.getBoundingClientRect();
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setDragImage(e.currentTarget, 0, offsetY);
    }
  };

  const handleDragOver = (e: React.DragEvent, time: number, day: number) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, time: number, day: number) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    
    // Calculate more precise drop time based on cursor position
    const cellRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const dropPositionY = e.clientY - cellRect.top;
    const percentageOfCell = dropPositionY / cellHeight;
    
    // Round to nearest half hour
    const halfHourOffset = Math.round(percentageOfCell * 2) / 2;
    const preciseTime = time + halfHourOffset;
    
    const updatedEvents = events.map(event => {
      if (event.id === id) {
        const duration = event.endTime - event.startTime;
        return {
          ...event,
          day,
          startTime: preciseTime,
          endTime: preciseTime + duration,
        };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    setDraggedEventId(null);
    
    toast({
      title: "Event moved",
      description: "Your event has been rescheduled",
    });
  };

  return {
    currentDate,
    days,
    events,
    editingEvent,
    isEventDialogOpen,
    isCategoriesDialogOpen,
    draggedEventId,
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
    handleDragStart,
    handleDragOver,
    handleDrop,
    setEditingEvent,
    setIsEventDialogOpen,
    setIsCategoriesDialogOpen,
    setCategories
  };
};
