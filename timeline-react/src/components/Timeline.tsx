
import type { TimelineEvent } from '../types';
import EventMarker from './EventMarker';
import './Timeline.css';

interface TimelineProps {
  events: TimelineEvent[];
  onEventClick: (event: TimelineEvent) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onEventClick }) => {
  // Sort events by year
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="timeline-container">
      <div className="timeline">
        {sortedEvents.map((event) => (
          <EventMarker
            key={`${event.year}-${event.title}`}
            event={event}
            onClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline; 