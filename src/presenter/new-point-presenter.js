import NewFormView from '../views/new-form-view.js';
import {render, remove} from '../framework/render.js';
import {emptyPoint} from '../const.js';

export default class NewPointPresenter {
  #container = null;
  #destinations = [];
  #allOffers = null;

  #handleDataChange = () => {};
  #handleDestroy = () => {};

  #formComponent = null;

  constructor({ container, destinations, allOffers, onDataChange, onDestroy }) {
    this.#container = container;
    this.#destinations = destinations;
    this.#allOffers = allOffers;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {

    this.#formComponent = new NewFormView({
      point: emptyPoint,
      destination: this.#destinations[0],
      allOffers: this.#allOffers,
      destinations: this.#destinations,
      onSubmit: this.#handleFormSubmit,
      onClose: this.#handleFormCancel,
      onDelete: this.#handleFormCancel,
    });

    render(this.#formComponent, this.#container, 'afterbegin');

    document.addEventListener('keydown', this.#onEscKeydown);
  }

  destroy() {
    if (this.#formComponent === null) {
      return;
    }

    remove(this.#formComponent);
    this.#formComponent = null;

    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#handleDestroy();
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.destroy();
  };

  #handleFormCancel = () => {
    this.destroy();
  };

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
