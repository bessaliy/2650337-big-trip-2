import TripInfoView from '../views/trip-info-view.js';
import { render, replace } from '../framework/render.js';
import {DATE_FORMAT, RenderPosition, SORT_TYPES} from '../const.js';
import {sortPoints} from '../utils.js';
import dayjs from 'dayjs';

export default class TripInfoPresenter {
  #container = null;
  #pointModel = null;
  #tripInfoComponent = null;

  constructor({ container, pointModel }) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init() {
    this.#pointModel.addObserver(this.#handleModelChange);
    this.#render();
  }

  #handleModelChange = () => {
    this.#render();
  };

  #render() {
    const prev = this.#tripInfoComponent;
    const data = this.#getTripInfoData();

    this.#tripInfoComponent = new TripInfoView(data);

    if(!prev) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
    } else {
      replace(this.#tripInfoComponent, prev);
    }
  }

  #getTripInfoData() {
    const points = this.#pointModel.getPoints();

    if (!points.length) {
      return {
        tripTitle: '',
        datesRange: '',
        totalCost: 0,
      };
    }
    const sortedPoints = [...points].sort(sortPoints[SORT_TYPES.DAY]);
    const cities = sortedPoints.map((point) => this.#pointModel.getDestinationById(point.destination)?.name)
      .filter(Boolean);
    const uniqueCities = cities.filter((city, index) => city !== cities[index - 1]);

    const tripTitle = this.#buildTripTitle(uniqueCities);

    const startDate = sortedPoints[0].dateFrom;
    const endDate = sortedPoints[sortedPoints.length - 1].dateTo;
    const datesRange = this.#formatTripDates(startDate, endDate);

    const totalCost = this.#calculateTotalCost(sortedPoints);

    return { tripTitle, datesRange, totalCost };
  }

  #buildTripTitle(cities) {
    if (cities.length === 0) {
      return '';
    }
    if (cities.length <= 3) {
      return cities.join(' — ');
    }
    return `${cities[0]} — ... — ${cities[cities.length - 1]}`;
  }

  #formatTripDates(startDate, endDate) {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    return `${start.format(DATE_FORMAT.DAY_MONTH)} — ${end.format(DATE_FORMAT.DAY_MONTH)}`;
  }

  #calculateTotalCost(points) {
    const allOffers = this.#pointModel.getAllOffers();

    return points.reduce((sum, point) => {
      const base = Number(point.basePrice) || 0;

      const offersByType = allOffers.find((offer) => offer.type === point.type);
      const offersList = offersByType?.offers ?? [];

      const selectedOffersCost = offersList
        .filter((offer) => point.offers.includes(offer.id))
        .reduce((acc, offer) => acc + (Number(offer.price) || 0), 0);

      return sum + base + selectedOffersCost;
    }, 0);
  }

}
