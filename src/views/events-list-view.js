import { createElement } from '../render.js';

function createEventsListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class EventsListView {
  getElement() {
    if (!this.element) {
      this.element = createElement(createEventsListTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
