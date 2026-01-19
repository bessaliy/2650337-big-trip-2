import AbstractView from '../framework/view/abstract-view.js';

function createInfoTemplate(tripTitle, datesRange, totalCost) {
  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripTitle}</h1>

              <p class="trip-info__dates">${datesRange}</p>
            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
            </p>
          </section>`;
}

export default class TripInfoView extends AbstractView {
  #tripTitle = '';
  #datesRange = '';
  #totalCost = '';
  constructor({tripTitle, datesRange, totalCost}) {
    super();
    this.#tripTitle = tripTitle;
    this.#datesRange = datesRange;
    this.#totalCost = totalCost;
  }

  get template() {
    return createInfoTemplate(this.#tripTitle, this.#datesRange, this.#totalCost);
  }
}
