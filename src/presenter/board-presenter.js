import EditFormView from '../views/edit-form-view.js';
import NewFormView from '../views/new-form-view.js';
import EventsListView from '../views/events-list-view.js';
import PointView from '../views/point-view.js';
import SortView from '../views/sort-view.js';

import { render } from '../render.js';
import FiltersView from '../views/filters-view';

export default class BoardPresenter {
  sortComponent = new SortView();
  listComponent = new EventsListView();

  constructor({ headerContainer, mainContainer }) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
  }

  init() {
    render(new NewFormView(), this.listComponent.getElement());
    render(new FiltersView(), this.headerContainer);
    render(this.sortComponent, this.mainContainer);
    render(this.listComponent, this.mainContainer);

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
