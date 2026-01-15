import FiltersView from '../views/filters-view.js';
import { render, replace } from '../framework/render.js';
import TripInfoView from '../views/trip-info-view.js';
import {RenderPosition} from '../const.js';

export default class FilterPresenter {
  #filterModel = null;
  #pointModel = null;
  #container = null;
  #filterComponent = null;
  #infoComponent = null;
  #infoContainer = document.querySelector('.trip-main');

  constructor({ filterModel, pointModel, container }) {
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;
    this.#container = container;
  }

  init() {
    this.#renderInfo();
    const filters = this.#pointModel.getFilters();
    const currentFilterType = this.#filterModel.getFilter();

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters,
      currentFilterType,
      onFilterChange: this.#handleFilterChange,
    });

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#container);
    } else {
      replace(this.#filterComponent, prevFilterComponent);
    }
  }

  #renderInfo() {
    if (!this.#infoComponent) {
      this.#infoComponent = new TripInfoView();
      render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
    }
  }

  #handleFilterChange = (filterType) => {
    this.#filterModel.setFilter(filterType);
  };
}
