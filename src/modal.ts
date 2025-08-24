import type { TimelineEvent } from './types';
import { categoryClassMap } from './constants';
import { elById } from './dom';

export class Modal {
  private dialog = elById<HTMLDialogElement>('modal');
  private image = elById<HTMLDivElement>('modal-image');
  private year = elById<HTMLDivElement>('modal-year');
  private title = elById<HTMLHeadingElement>('modal-title');
  private category = elById<HTMLDivElement>('modal-category');
  private description = elById<HTMLParagraphElement>('modal-description');
  private closeBtn = elById<HTMLButtonElement>('close-btn');
  
  private focusableElements: HTMLElement[] = [];
  private firstFocusableElement?: HTMLElement;
  private lastFocusableElement?: HTMLElement;
  private triggeringElement?: HTMLElement;

  constructor() {
    this.closeBtn.addEventListener('click', () => this.close());
    
    // Handle backdrop clicks (clicking outside modal content)
    this.dialog.addEventListener('click', (e) => {
      const modalContent = this.dialog.querySelector('.modal-content');
      if (modalContent && !modalContent.contains(e.target as Node)) {
        this.close();
      }
    });

    // Handle escape key and focus trapping
    this.dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      } else if (e.key === 'Tab') {
        this.handleTabKey(e);
      }
    });
  }

  open(ev: TimelineEvent, triggeringElement?: HTMLElement) {
    this.triggeringElement = triggeringElement;
    
    this.image.style.backgroundImage = `url('${ev.imageURL}')`;
    this.year.textContent = String(ev.year);
    this.title.textContent = ev.title;
    this.category.textContent = ev.category;
    this.category.className = 'modal-category ' + (categoryClassMap[ev.category] || 'category-history');
    this.description.textContent = ev.description;
    
    // Use the native dialog methods
    this.dialog.showModal();
    
    // Set up focus management
    this.setupFocusManagement();
    
    // Focus the close button initially
    this.closeBtn.focus();
  }

  close() {
    this.dialog.close();
    
    // Return focus to the triggering element
    if (this.triggeringElement) {
      this.triggeringElement.focus();
      this.triggeringElement = undefined;
    }
  }

  private setupFocusManagement() {
    // Get all focusable elements within the dialog
    const focusableSelectors = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    this.focusableElements = Array.from(
      this.dialog.querySelectorAll(focusableSelectors.join(','))
    ) as HTMLElement[];
    
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
  }

  private handleTabKey(e: KeyboardEvent) {
    if (this.focusableElements.length === 0) return;
    
    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement?.focus();
      }
    }
  }
}
