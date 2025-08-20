
import type { EventCategory } from '../types';
import './FilterPanel.css';

interface FilterPanelProps {
  selectedCategories: EventCategory[];
  onCategoryToggle: (category: EventCategory) => void;
  onClearFilters: () => void;
  totalEvents: number;
  filteredEvents: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
  totalEvents,
  filteredEvents
}) => {
  const categories: EventCategory[] = ['History', 'Politics', 'Exploration', 'Science', 'Technology'];

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <span className="event-count">
          {filteredEvents} of {totalEvents} events
        </span>
      </div>
      
      <div className="category-filters">
        <h4>Categories</h4>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${selectedCategories.includes(category) ? 'active' : ''}`}
              onClick={() => onCategoryToggle(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {selectedCategories.length > 0 && (
        <button className="clear-filters" onClick={onClearFilters}>
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel; 