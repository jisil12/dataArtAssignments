
import type { TimelineEvent } from '../types';
import './EventMarker.css';

interface EventMarkerProps {
  event: TimelineEvent;
  onClick: (event: TimelineEvent) => void;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, onClick }) => {
  return (
    <div className="event-marker" onClick={() => onClick(event)}>
      <div className="event-card">
        <div className="event-year">{event.year}</div>
        <div className="event-image">
          <img src={event.imageURL} alt={event.title} />
        </div>
        <div className="event-content">
          <h3 className="event-title">{event.title}</h3>
          <span className="event-category">{event.category}</span>
          <p className="event-description">
            {event.description.length > 150 
              ? `${event.description.substring(0, 150)}...` 
              : event.description
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventMarker; 