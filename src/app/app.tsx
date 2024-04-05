import { FC, PropsWithChildren } from 'react';
import { MainPage } from '../pages/main';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../const';
import Login from '../pages/login';
import {Favorites} from '../pages/favorites';
import { NotFoundScreen } from '../pages/not-found-screen';
import PrivateRoute from '../components/private-route/private-route';
import Offer from '../pages/offer';
import { useAppSelector } from '../components/hooks';


export const App: FC<PropsWithChildren> = () => {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);

  return (
    <HelmetProvider>
      <Routes >
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path= {AppRoute.Offer}
          element={<Offer />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <Favorites/>
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
};

export default App;
