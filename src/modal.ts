import type { TimelineEvent } from './types';
import { categoryClassMap } from './constants';
import { elById } from './dom';

export class Modal {
  private backdrop = elById<HTMLDivElement>('modal');
  private image = elById<HTMLDivElement>('modal-image');
  private year = elById<HTMLDivElement>('modal-year');
  private title = elById<HTMLHeadingElement>('modal-title');
  private category = elById<HTMLDivElement>('modal-category');
  private description = elById<HTMLParagraphElement>('modal-description');
  private closeBtn = elById<HTMLButtonElement>('close-btn');

  constructor() {
    this.closeBtn.addEventListener('click', () => this.close());
    window.addEventListener('click', (e) => {
      if (e.target === this.backdrop) this.close();
    });
  }

  open(ev: TimelineEvent) {
    this.image.style.backgroundImage = `url('${ev.imageURL}')`;
    this.year.textContent = String(ev.year);
    this.title.textContent = ev.title;
    this.category.textContent = ev.category;
    this.category.className = 'modal-category ' + (categoryClassMap[ev.category] || 'category-history');
    this.description.textContent = ev.description;
    this.backdrop.style.display = 'block';
  }

  close() {
    this.backdrop.style.display = 'none';
  }
}
