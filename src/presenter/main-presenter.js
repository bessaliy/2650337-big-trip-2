// import EditFormView from '../views/edit-form-view.js';
import NewFormView from '../views/new-form-view.js';
import EventsListView from '../views/events-list-view.js';
import PointView from '../views/point-view.js';
import SortView from '../views/sort-view.js';
import FiltersView from '../views/filters-view';

import { render } from '../render.js';

export default class MainPresenter {
  sortComponent = new SortView();
  listComponent = new EventsListView();

  constructor({ headerContainer, mainContainer, pointModel }) {
    this.headerContainer = headerContainer;
    this.mainContainer = mainContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.points = [...this.pointModel.getPoints()];
    render(new FiltersView(), this.headerContainer);
    render(this.sortComponent, this.mainContainer);
    render(this.listComponent, this.mainContainer);
    render(new NewFormView({
      point: this.points[0],
      destination: this.pointModel.getDestinationsById(this.points[0].destination),
      offers: this.pointModel.getOffersByType(this.points[0].type)
    }), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {

      render(new PointView({
        point: this.points[i],
        destination: this.pointModel.getDestinationsById(this.points[i].destination),
        offers: this.pointModel.getOffersByType(this.points[i].type)
      }), this.listComponent.getElement());

    }
  }
}
