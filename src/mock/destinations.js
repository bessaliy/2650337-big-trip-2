import {getRandomInteger, getRandomId, getRandomArrayElement} from '../utils.js';
import {CITIES, DESCRIPTIONS, DESCRIPTIONS_AMOUNT, PHOTOS_DESCRIPTIONS} from '../const.js';
const citiesList = [...CITIES];
const destinationsId = [];

const mockDestinations = [];

function getDestination() {
  const name = getRandomArrayElement(citiesList);
  const index = citiesList.indexOf(name);
  if (index !== -1) {
    citiesList.splice(index, 1);
  }
  const destinationID = getRandomId();
  destinationsId.push(destinationID.toString());
  return {
    'id': destinationID,
    'description': getRandomArrayElement(DESCRIPTIONS),
    'name': name,
    'pictures': [
      {
        'src': `https://loremflickr.com/248/152?random=${getRandomInteger(1, 100)}`,
        'description': name + getRandomArrayElement(PHOTOS_DESCRIPTIONS).toString()
      }
    ]
  };
}

export function getDestinations() {
  for(let i = 0; i < DESCRIPTIONS_AMOUNT; i++) {
    mockDestinations.push(getDestination());
  }
  return mockDestinations;
}
