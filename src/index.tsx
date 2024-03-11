import React from 'react';
import ReactDOM from 'react-dom/client';
import OffersData from './mocks/offers';
import FavoriteData from './mocks/favorites';
import App from './App/app';
import { POINTS } from './mocks/points';
import { City } from './mocks/city';
import { Provider } from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App favoriteData={FavoriteData} mainPageProps={{ offersData: OffersData, cardAmount: 4, city: City, points: POINTS}}/>
    </Provider>
  </React.StrictMode>
);
