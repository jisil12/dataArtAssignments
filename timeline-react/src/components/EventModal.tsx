import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { TimelineEvent } from '../types';
import './EventModal.css';

interface EventModalProps {
  event: TimelineEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) {
    return null;
  }

  const modalContent = (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        
        <div className="modal-header">
          <div className="modal-year">{event.year}</div>
          <h2 className="modal-title">{event.title}</h2>
          <span className="modal-category">{event.category}</span>
        </div>
        
        <div className="modal-image">
          <img src={event.imageURL} alt={event.title} />
        </div>
        
        <div className="modal-body">
          <p className="modal-description">{event.description}</p>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default EventModal; 