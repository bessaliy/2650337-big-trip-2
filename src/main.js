import MainPresenter from './presenter/main-presenter.js';
import PointModel from './model/point-model.js';

const headerContainer = document.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
// const mainContainer = main.querySelector('.page-body__container');
const mainContainer = main.querySelector('.trip-events');
const pointModel = new PointModel();

const mainPresenter = new MainPresenter({
  headerContainer: headerContainer,
  mainContainer: mainContainer,
  pointModel: pointModel });

mainPresenter.init();
