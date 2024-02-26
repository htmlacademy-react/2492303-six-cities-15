import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/app';
import OffersData from './mocks/offers';
import FavoriteData from './mocks/favorites';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersData={OffersData} favoriteData={FavoriteData} cardAmount={3}/>
  </React.StrictMode>
);
