import BoardPresenter from './presenter/board-presenter.js';

const header = document.querySelector('.page-header');
const headerContainer = header.querySelector('.trip-controls__filters');

const main = document.querySelector('.page-main');
const mainContainer = main.querySelector('.page-body__container');

const boardPresenter = new BoardPresenter({
  headerContainer: headerContainer,
  container: mainContainer });

boardPresenter.init();
