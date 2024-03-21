import React from 'react';
import ReactDOM from 'react-dom/client';
import FavoriteData from './mocks/favorites';
import { Provider } from 'react-redux';
import {store} from './store';
import App from './app/app';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App favoriteData={FavoriteData} mainPageProps={{ cardAmount: 4}}/>
    </Provider>
  </React.StrictMode>
);
