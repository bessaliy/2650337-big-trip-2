import AbstractView from '../framework/view/abstract-view.js';
const filterIsChecked = (filterType, currentFilterType) => filterType === currentFilterType ? 'checked' : '';
const filterIsDisabled = (filterCount) => filterCount === 0 ? 'disabled' : '';
const filterToUpperCase = (filterType) => filterType.charAt(0).toUpperCase() + filterType.slice(1);
const filterNumber = (filterCount) => filterCount > 0 ? ` (${filterCount})` : '';
function createFiltersTemplate(filters, currentFilterType = 'everything') {
  return `
    <form class="trip-filters" action="#" method="get">
      ${filters.map((filter) => `
        <div class="trip-filters__filter">
          <input
            id="filter-${filter.type}"
            class="trip-filters__filter-input visually-hidden"
            type="radio"
            name="trip-filter"
            value="${filter.type}"
            ${filterIsChecked(filter.type, currentFilterType)}
            ${filterIsDisabled(filter.count)}>
          <label class="trip-filters__filter-label" for="filter-${filter.type}">
            ${filterToUpperCase(filter.type)}
            ${filterNumber(filter.count)}
          </label>
        </div>`).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilterType;

  constructor({ filters, currentFilterType = 'everything' }) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilterType);
  }
}

