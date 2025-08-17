import type { TimelineEvent } from './types';
import { categoryClassMap } from './constants';
import { create } from './dom';

export type CardClickHandler = (ev: TimelineEvent) => void;

export function renderEvents(container: HTMLElement, data: TimelineEvent[], onCardClick: CardClickHandler): void {
  container.innerHTML = '';
  data.forEach((event) => {
    const card = create('div', 'event-card');
    const imageDiv = create('div', 'event-image');
    imageDiv.setAttribute('style', `background-image: url('${event.imageURL}')`);

    const yearBadge = create('div', 'event-year-badge');
    yearBadge.textContent = String(event.year);
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

    card.addEventListener('click', () => onCardClick(event));

    container.appendChild(card);
  });
}
