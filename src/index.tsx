import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './store';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import App from './app/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(

  <Provider store = {store}>
    <React.StrictMode>
      <ToastContainer/>
      <HistoryRouter history={browserHistory}>
        <App/>
      </HistoryRouter>
    </React.StrictMode>
  </Provider>
);
