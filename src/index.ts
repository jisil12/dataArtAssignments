import { elById } from './dom';
import { events } from './data';
import { renderEvents } from './renderer';
import { Modal } from './modal';

function main() {
  const container = elById<HTMLDivElement>('timeline');
  const modal = new Modal();

  renderEvents(container, events, (ev, triggeringElement) => modal.open(ev, triggeringElement));
}

document.addEventListener('DOMContentLoaded', main);
