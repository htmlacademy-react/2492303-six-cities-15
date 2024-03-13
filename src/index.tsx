import React from 'react';
import ReactDOM from 'react-dom/client';
import OffersData from './mocks/offers';
import FavoriteData from './mocks/favorites';
import { POINTS } from './mocks/points';
import { Provider } from 'react-redux';
import {store} from './store';
import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App favoriteData={FavoriteData} mainPageProps={{ offersData: OffersData, cardAmount: 4, points: POINTS}}/>
    </Provider>
  </React.StrictMode>
);
