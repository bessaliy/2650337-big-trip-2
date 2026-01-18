import { generateFilter } from '../utils.js';

export default class PointModel {
  #points = [];
  #offers = [];
  #destinations = [];
  #observers = new Set();

  addObserver(callback) {
    this.#observers.add(callback);
  }

  #notify() {
    this.#observers.forEach((callback) => callback());
  }

  getPoints() {
    return this.#points;
  }

  setPoints(points) {
    this.#points = points;
    this.#notify();
  }

  getAllOffers() {
    return this.#offers;
  }

  setOffers(offers) {
    this.#offers = offers;
    this.#notify();
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getDestinations() {
    return this.#destinations;
  }

  setDestinations(destinations) {
    this.#destinations = destinations;
    this.#notify();
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getFilters() {
    const points = this.getPoints();
    const filters = generateFilter(points);

    return filters.map((filter) => ({
      ...filter,
      isDisabled: filter.count === 0
    }));
  }

  addPoint(point) {
    this.#points = [...this.#points, point];
    this.#notify();
  }

  updatePoint(updatedPoint) {
    this.#points = this.#points.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
    this.#notify();
  }

  deletePoint(point) {
    this.#points = this.#points.filter((p) => p.id !== point.id);
    this.#notify();
  }
}

