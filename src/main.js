import BoardPresenter from './presenter/board-presenter.js';

const headerContainer = document.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const mainContainer = main.querySelector('.page-body__container');

const boardPresenter = new BoardPresenter({
  headerContainer: headerContainer,
  mainContainer: mainContainer });

boardPresenter.init();
