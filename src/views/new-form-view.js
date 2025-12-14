import { createElement } from '../render.js';
import { pointTypes, DATE_FORMAT, CITIES} from '../const.js';
import { humanizeTaskDueDate, transformString } from '../utils.js';

function createTypeItemTemplate(id, pointType, checkedType) {
  const isCheckedType = checkedType === pointType ? 'checked' : '';
  return `<div class="event__type-item">
              <input id="event-type-${pointType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${isCheckedType}>
                <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-${id}">${transformString(pointType)}</label>
            </div>`;
}
function createOffersTemplate(offers, checkedOffersId) {
  const { id, title, price } = offers;
  const isCheckedOffers = checkedOffersId.includes(id) ? 'checked' : '';
  return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id=${id} type="checkbox" name=${id} ${isCheckedOffers}>
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
}
function createOfferListTemplate(offers, checkedOffersId) {
  return offers.length > 0 ?
    `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map((offer) => createOffersTemplate(offer, checkedOffersId)).join('')}
        </div>
      </section>`
    : '';
}
function createPhotosTemplate(pictures) {
  return pictures.length > 0 ?
    `<div class="event__photos-tape">
      ${pictures.map(({ src, description }) => `<img class="event__photo" src=${src} alt=${description}`)}>
    </div>`
    : '';
}
function createDescriptionTemplate(description) {
  return description.length > 0 ? `<p class="event__destination-description">${description}</p>` : '';
}

function createNewFormTemplate(point, offers, destination) {
  const { id, basePrice, dateFrom, dateTo, offers: checkedOffersId, type } = point;
  const { name, description, pictures } = destination;
  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${pointTypes.map((pointType) => createTypeItemTemplate(id, pointType, type)).join('')}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-${id}">
                     ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${CITIES.map((city) => `<option value='${city}'></option>`).join('')}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${humanizeTaskDueDate(dateFrom, DATE_FORMAT.DAY_MONTH_YEAR_TIME)}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${humanizeTaskDueDate(dateTo, DATE_FORMAT.DAY_MONTH_YEAR_TIME)}>
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-${id}">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                ${createOfferListTemplate(offers.offers, checkedOffersId)}
                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    ${createDescriptionTemplate(description)}
                <div class="event__photos-container">
                   ${createPhotosTemplate(pictures)}
                </div>
                </section>
                </section >
            </form >
          </li > `;
}

// function createEventTypesTemplate() {
//   return `<div class="event__type-list">
//           <fieldset class="event__type-group">
//             <legend class="visually-hidden">Event type</legend>
//
//             <div class="event__type-item">
//               <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
//                 <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
//             </div>
//
//             <div class="event__type-item">
//               <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
//                 <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
//             </div>
//
//             <div class="event__type-item">
//               <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
//                 <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
//             </div>
//
//             <div class="event__type-item">
//               <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
//                 <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
//             </div>
//
//             <div class="event__type-item">
//               <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
//                 <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
//             </div>
//
//             <div class="event__type-item">
//               <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
//                 <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
//             </div>
//
//             <div class="event__type-item">
//               <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
//                 <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
//             </div>
//
//             <div class="event__type-item">
//               <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
//                 <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
//             </div>
//
//             <div class="event__type-item">
//               <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
//                 <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
//             </div>
//           </fieldset>
//         </div>`;
// }
// function createEventOffersTemplate() {
//   return `<div class="event__available-offers">
//         <div class="event__offer-selector">
//           <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
//             <label class="event__offer-label" for="event-offer-luggage-1">
//               <span class="event__offer-title">Add luggage</span>
//               &plus;&euro;&nbsp;
//               <span class="event__offer-price">30</span>
//             </label>
//         </div>
//
//         <div class="event__offer-selector">
//           <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
//             <label class="event__offer-label" for="event-offer-comfort-1">
//               <span class="event__offer-title">Switch to comfort class</span>
//               &plus;&euro;&nbsp;
//               <span class="event__offer-price">100</span>
//             </label>
//         </div>
//
//         <div class="event__offer-selector">
//           <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
//             <label class="event__offer-label" for="event-offer-meal-1">
//               <span class="event__offer-title">Add meal</span>
//               &plus;&euro;&nbsp;
//               <span class="event__offer-price">15</span>
//             </label>
//         </div>
//
//         <div class="event__offer-selector">
//           <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
//             <label class="event__offer-label" for="event-offer-seats-1">
//               <span class="event__offer-title">Choose seats</span>
//               &plus;&euro;&nbsp;
//               <span class="event__offer-price">5</span>
//             </label>
//         </div>
//
//         <div class="event__offer-selector">
//           <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
//             <label class="event__offer-label" for="event-offer-train-1">
//               <span class="event__offer-title">Travel by train</span>
//               &plus;&euro;&nbsp;
//               <span class="event__offer-price">40</span>
//             </label>
//         </div>
//       </div>
//   `;
// }
// function createEventDescriptionTemplate() {
//   return `<section class="event__section  event__section--destination">
//       <h3 class="event__section-title  event__section-title--destination">Destination</h3>
//       <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>
//
//       <div class="event__photos-container">
//         <div class="event__photos-tape">
//           <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
//           <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
//           <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
//           <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
//           <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
//         </div>
//       </div>
//     </section>
//   `;
// }
// function createEventDetailsTemplate() {
//   return`<section class="event__details">
//     <section class="event__section  event__section--offers">
//       <h3 class="event__section-title  event__section-title--offers">Offers</h3>
//
//       ${createEventOffersTemplate()}
//
//     </section>
//
//     ${createEventDescriptionTemplate()}
//
//   </section>`;
// }
//
// function createNewFormTemplate() {
//   return `<form class="event event--edit" action="#" method="post">
//   <header class="event__header">
//     <div class="event__type-wrapper">
//       <label class="event__type  event__type-btn" for="event-type-toggle-1">
//         <span class="visually-hidden">Choose event type</span>
//         <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
//       </label>
//       <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
//       ${createEventTypesTemplate()}
//     </div>
//
//     <div class="event__field-group  event__field-group--destination">
//       <label class="event__label  event__type-output" for="event-destination-1">
//         Flight
//       </label>
//       <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
//         <datalist id="destination-list-1">
//           <option value="Amsterdam"></option>
//           <option value="Geneva"></option>
//           <option value="Chamonix"></option>
//         </datalist>
//     </div>
//
//     <div class="event__field-group  event__field-group--time">
//       <label class="visually-hidden" for="event-start-time-1">From</label>
//       <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
//         &mdash;
//         <label class="visually-hidden" for="event-end-time-1">To</label>
//         <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
//     </div>
//
//     <div class="event__field-group  event__field-group--price">
//       <label class="event__label" for="event-price-1">
//         <span class="visually-hidden">Price</span>
//         &euro;
//       </label>
//       <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
//     </div>
//
//     <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
//     <button class="event__reset-btn" type="reset">Cancel</button>
//   </header>
//   ${createEventDetailsTemplate()}
// </form>`;
// }

export default class NewFormView {
  constructor({ point, offers, destination}) {
    this.point = point;
    this.offers = offers;
    this.destination = destination;
  }

  getTemplate() {
    return createNewFormTemplate(this.point, this.offers, this.destination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
