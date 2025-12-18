// import EditFormView from '../views/edit-form-view.js';
import NewFormView from '../views/new-form-view.js';
import EventsListView from '../views/events-list-view.js';
import PointView from '../views/point-view.js';
import SortView from '../views/sort-view.js';
import FiltersView from '../views/filters-view.js';

import { render } from '../render.js';

export default class MainPresenter {
  sortComponent = new SortView();
  listComponent = new EventsListView();

  constructor({ filterElement, tripElement, pointModel }) {
    this.filterElement = filterElement;
    this.tripElement = tripElement;
    this.pointModel = pointModel;
  }

  init() {
    this.points = [...this.pointModel.getPoints()];
    render(new FiltersView(), this.filterElement);
    render(this.sortComponent, this.tripElement);
    render(this.listComponent, this.tripElement);
    render(new NewFormView({
      point: this.points[0],
      destination: this.pointModel.getDestinationById(this.points[0].destination),
      offers: this.pointModel.getOffersByType(this.points[0].type)
    }), this.listComponent.getElement());

    for (let i = 1; i < this.points.length; i++) {

      render(new PointView({
        point: this.points[i],
        destination: this.pointModel.getDestinationById(this.points[i].destination),
        offers: this.pointModel.getOffersByType(this.points[i].type)
      }), this.listComponent.getElement());

    }
  }
}
