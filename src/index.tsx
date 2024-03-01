import React from 'react';
import ReactDOM from 'react-dom/client';
import OffersData from './mocks/offers';
import FavoriteData from './mocks/favorites';
import App from './App/App';
import { POINTS } from './mocks/points';
import { CITY } from './mocks/city';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App favoriteData={FavoriteData} mainPageProps={{ offersData: OffersData, cardAmount: 4, city: CITY, points: POINTS}}/>
  </React.StrictMode>
);
