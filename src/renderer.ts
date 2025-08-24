import type { TimelineEvent } from './types';
import { categoryClassMap } from './constants';
import { create } from './dom';

export type CardClickHandler = (ev: TimelineEvent, triggeringElement?: HTMLElement) => void;

let activeCardIndex = 0;
let cards: HTMLElement[] = [];

export function renderEvents(container: HTMLElement, data: TimelineEvent[], onCardClick: CardClickHandler): void {
  container.innerHTML = '';
  cards = [];
  activeCardIndex = 0;
  
  data.forEach((event, index) => {
    const card = create('div', 'event-card');
    
    // Add accessibility attributes
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `${event.title}, ${event.year}. ${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}. Press Enter or Space to view details.`);
    
    // Set aria-current for the first card (initially active)
    if (index === 0) {
      card.setAttribute('aria-current', 'true');
      card.classList.add('active');
    }
    
    const imageDiv = create('div', 'event-image');
    imageDiv.setAttribute('style', `background-image: url('${event.imageURL}')`);
    imageDiv.setAttribute('role', 'img');
    imageDiv.setAttribute('aria-label', `Historical image for ${event.title}`);

    const yearBadge = create('div', 'event-year-badge');
    yearBadge.textContent = String(event.year);
    yearBadge.setAttribute('aria-hidden', 'true');
    imageDiv.appendChild(yearBadge);

    const content = create('div', 'event-content');
    const title = create('h3', 'event-title');
    title.textContent = event.title;

    const desc = create('p', 'event-description');
    const preview = event.description.length > 100 ? event.description.substring(0, 100) + '...' : event.description;
    desc.textContent = preview;

    const cat = create('span', `event-category ${categoryClassMap[event.category] || 'category-history'}`);
    cat.textContent = event.category;

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(cat);

    card.appendChild(imageDiv);
    card.appendChild(content);

    // Add click and keyboard event handlers
    const handleActivation = () => onCardClick(event, card);
    card.addEventListener('click', handleActivation);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleActivation();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigateCards(1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigateCards(-1);
      }
    });

    cards.push(card);
    container.appendChild(card);
  });
}

function navigateCards(direction: number): void {
  if (cards.length === 0) return;
  
  // Remove aria-current and active class from current card
  cards[activeCardIndex].removeAttribute('aria-current');
  cards[activeCardIndex].classList.remove('active');
  
  // Calculate new index with wrapping
  activeCardIndex = (activeCardIndex + direction + cards.length) % cards.length;
  
  // Set aria-current and active class on new card
  cards[activeCardIndex].setAttribute('aria-current', 'true');
  cards[activeCardIndex].classList.add('active');
  cards[activeCardIndex].focus();
}

export function setActiveCard(cardElement: HTMLElement): void {
  const newIndex = cards.indexOf(cardElement);
  if (newIndex !== -1) {
    // Remove aria-current from current card
    if (activeCardIndex < cards.length) {
      cards[activeCardIndex].removeAttribute('aria-current');
      cards[activeCardIndex].classList.remove('active');
    }
    
    // Set new active card
    activeCardIndex = newIndex;
    cards[activeCardIndex].setAttribute('aria-current', 'true');
    cards[activeCardIndex].classList.add('active');
  }
}
