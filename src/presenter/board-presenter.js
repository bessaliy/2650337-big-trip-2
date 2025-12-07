import EditFormView from '../views/form-edit-view.js';
import NewFormView from '../views/new-form-view.js';
import EventsListView from '../views/events-list-view.js';
import PointView from '../views/point-view.js';
import SortView from '../views/sort-view.js';

import { render } from '../render.js';
import FiltersView from '../views/filters-view';

export default class BoardPresenter {
  sortComponent = new SortView();
  listComponent = new EventsListView();

  constructor({ headerContainer, container }) {
    this.headerContainer = headerContainer;
    this.container = container;
  }

  init() {
    render(new NewFormView(), this.listComponent.getElement());
    render(new FiltersView(), this.headerContainer);
    render(this.sortComponent, this.container);
    render(this.listComponent, this.container);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
