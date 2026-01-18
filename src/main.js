import MainPresenter from './presenter/main-presenter.js';
import PointModel from './model/point-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import Api from './api/api.js';

import LoadingView from './views/loading-view.js';
import FailedLoadView from './views/failed-load-view.js';
import { render, remove } from './framework/render.js';

const filterElement = document.querySelector('.trip-controls__filters');
const tripElement = document.querySelector('.page-main .page-body__container');

const pointModel = new PointModel();
const filterModel = new FilterModel();

const AUTHORIZATION = `Basic ${crypto.randomUUID()}`;
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';
const api = new Api(END_POINT, AUTHORIZATION);

const filterPresenter = new FilterPresenter({
  filterModel,
  pointModel,
  container: filterElement,
});

const mainPresenter = new MainPresenter({
  tripElement: tripElement,
  pointModel: pointModel,
  filterModel: filterModel,
  api,
});

const loadingView = new LoadingView();
render(loadingView, tripElement);

Promise.all([api.points, api.destinations, api.offers])
  .then(([points, destinations, offers]) => {
    pointModel.setPoints(points);
    pointModel.setDestinations(destinations);
    pointModel.setOffers(offers);

    remove(loadingView);

    filterPresenter.init();
    mainPresenter.init();
  }).catch(() => {
    remove(loadingView);
    render(new FailedLoadView(), tripElement);
  });

