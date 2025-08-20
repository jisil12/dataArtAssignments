import { useState, useEffect } from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';
import FilterPanel from './components/FilterPanel';
import { events } from './data';
import type { TimelineEvent, EventCategory } from './types';
import './App.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>(events);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  // Filter events based on selected categories
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => selectedCategories.includes(event.category));
      setFilteredEvents(filtered);
    }
  }, [selectedCategories]);

  const handleThemeToggle = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCategoryToggle = (category: EventCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="app">
      <Header isDarkTheme={isDarkTheme} onThemeToggle={handleThemeToggle} />
      
      <main className="main-content">
        <div className="container">
          <FilterPanel
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            onClearFilters={handleClearFilters}
            totalEvents={events.length}
            filteredEvents={filteredEvents.length}
          />
          
          <Timeline events={filteredEvents} onEventClick={handleEventClick} />
        </div>
      </main>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}

export default App;
