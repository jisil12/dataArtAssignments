import { categoryClassMap } from './constants';
import { elById } from './dom';
export class Modal {
    constructor() {
        this.backdrop = elById('modal');
        this.image = elById('modal-image');
        this.year = elById('modal-year');
        this.title = elById('modal-title');
        this.category = elById('modal-category');
        this.description = elById('modal-description');
        this.closeBtn = elById('close-btn');
        this.closeBtn.addEventListener('click', () => this.close());
        window.addEventListener('click', (e) => {
            if (e.target === this.backdrop)
                this.close();
        });
    }
    open(ev) {
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
