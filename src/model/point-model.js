import { POINTS_AMOUNT } from '../const.js';
import { getPoint, destinationsArray} from '../mock/points.js';
import { getOffers } from '../mock/offers.js';

export default class PointModel {
  points = Array.from({ length: POINTS_AMOUNT }, getPoint);
  offers = getOffers();
  destinations = destinationsArray;

  getPoints() {
    return this.points;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type);
  }

  getDestinationsById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
