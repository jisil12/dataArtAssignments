// Timeline App
let eventsData = [];
const timeline = document.getElementById('timeline');
const modal = document.getElementById('modal');

// Category colors
const categoryColors = {
    'History': 'category-history',
    'Politics': 'category-politics',
    'Exploration': 'category-exploration',
    'Science': 'category-science',
    'Technology': 'category-technology'
};

// Fetch events from JSON
async function fetchEvents() {
    try {
        const response = await fetch('./data/events.json');
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        eventsData = await response.json();
        renderTimeline();
    } catch (error) {
        console.error('Error loading events:', error);
        showError();
    }
}

// Show error message
function showError() {
    timeline.innerHTML = `
        <div style="grid-column: 1/-1; background: white; padding: 2rem; border-radius: 15px; text-align: center; box-shadow: 0 8px 25px rgba(0,0,0,0.15);">
            <h3 style="color: #e74c3c; margin-bottom: 1rem;">⚠️ Could not load events</h3>
            <p>Make sure the data/events.json file exists and you're running a local server.</p>
            <p><small>Try: <code>npx http-server</code></small></p>
        </div>
    `;
}

// Render timeline
function renderTimeline() {
    timeline.innerHTML = '';
    
    // Sort events by year
    const sortedEvents = eventsData.sort((a, b) => a.year - b.year);
    
    sortedEvents.forEach((event) => {
        const eventCard = createEventCard(event);
        timeline.appendChild(eventCard);
    });
}

// Create event card
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    const categoryClass = categoryColors[event.category] || 'category-history';
    
    card.innerHTML = `
        <div class="event-image" style="background-image: url('${event.imageURL}')">
            <div class="event-year-badge">${event.year}</div>
        </div>
        <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description.substring(0, 120)}...</p>
            <div class="event-category ${categoryClass}">${event.category}</div>
            <div class="category-text">Category: ${event.category}</div>
        </div>
    `;
    
    // Add click handler
    card.addEventListener('click', () => openModal(event));
    
    return card;
}

// Open modal
function openModal(event) {
    const modalImage = document.getElementById('modal-image');
    const modalYear = document.getElementById('modal-year');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    
    // Set modal content
    modalImage.style.backgroundImage = `url('${event.imageURL}')`;
    modalYear.textContent = event.year;
    modalTitle.textContent = event.title;
    modalCategory.textContent = event.category;
    modalDescription.textContent = event.description;
    
    // Apply category color
    const categoryClass = categoryColors[event.category] || 'category-history';
    modalCategory.className = `modal-category ${categoryClass}`;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Close button
    document.getElementById('close-btn').addEventListener('click', closeModal);
    
    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Load events
    fetchEvents();
});