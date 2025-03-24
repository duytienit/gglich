
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { useCalendar, timeSlots } from '@/hooks/useCalendar';
import CalendarHeader from '@/components/CalendarHeader';
import CalendarGrid from '@/components/CalendarGrid';
import EditEventDialog from '@/components/EditEventDialog';
import ManageCategoriesDialog from '@/components/ManageCategoriesDialog';

const IndexPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const {
    currentDate,
    days,
    events,
    editingEvent,
    isEventDialogOpen,
    isCategoriesDialogOpen,
    weekTransition,
    hourlyTemperatures,
    calendarRef,
    cellHeight,
    categories,
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
  } = useCalendar();

  // Toggle dark/light mode
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <CalendarHeader
        currentDate={currentDate}
        days={days}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        onManageCategories={() => setIsCategoriesDialogOpen(true)}
        onToggleTheme={toggleTheme}
        isDarkMode={theme === 'dark'}
      />
      
      <div 
        className={cn(
          "flex-1 overflow-auto relative",
          weekTransition === 'next' && "week-transition-enter",
          weekTransition === 'prev' && "week-transition-prev-enter"
        )}
        ref={calendarRef}
      >
        <CalendarGrid
          days={days}
          timeSlots={timeSlots}
          events={events}
          cellHeight={cellHeight}
          hourlyTemperatures={hourlyTemperatures}
          onCellClick={handleCellClick}
          onEditEvent={handleEditEvent}
        />
      </div>
      
      {/* Event editing dialog */}
      <EditEventDialog
        event={editingEvent}
        isOpen={isEventDialogOpen}
        onClose={() => {
          setIsEventDialogOpen(false);
          setEditingEvent(null);
        }}
        onSave={handleSaveEvent}
        categories={categories}
      />
      
      {/* Categories management dialog */}
      <ManageCategoriesDialog
        isOpen={isCategoriesDialogOpen}
        onClose={() => setIsCategoriesDialogOpen(false)}
        categories={categories}
        onUpdateCategories={setCategories}
      />
    </div>
  );
};

export default IndexPage;
