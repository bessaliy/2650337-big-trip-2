import ApiService from '../framework/api-service.js';

export default class Api extends ApiService {
  get points() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse)
      .then((points) => points.map((point) => this.#adaptPointToClient(point)));
  }

  get destinations() {
    return this._load({ url: 'destinations' })
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({ url: 'offers' })
      .then(ApiService.parseResponse);
  }

  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: 'PUT',
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(ApiService.parseResponse)
      .then((updatedPoint) => this.#adaptPointToClient(updatedPoint));
    // .then(this.#adaptPointToClient);
  }

  // ↓↓↓ адаптеры ↓↓↓
  // #adaptPointsToClient(points) {
  //   return points.map((point) => this.#adaptPointToClient(point));
  //   // return points.map(this.#adaptPointToClient);
  // }

  #adaptPointToClient(point) {
    return {
      ...point,
      basePrice: point.base_price,
      dateFrom: new Date(point.date_from),
      dateTo: new Date(point.date_to),
      isFavorite: point.is_favorite,
    };
  }

  #adaptPointToServer(point) {
    /* eslint-disable camelcase */
    return {
      ...point,
      base_price: point.basePrice,
      date_from: point.dateFrom.toISOString(),
      date_to: point.dateTo.toISOString(),
      is_favorite: point.isFavorite,
    };
    /* eslint-enable camelcase */
  }
}
