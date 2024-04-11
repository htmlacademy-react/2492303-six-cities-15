import { FC, PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../components/private-route/private-route';
import { MainPage } from '../pages/main/main';
import { useAppSelector } from '../components/hooks';
import { Favorites } from './../pages/favorites/favorites';
import { NotFoundScreen } from './../pages/not-found-screen/not-found-screen';
import { AppRoute, AuthorizationStatus } from '../const';
import Login from '../pages/login/login';
import Offer from './../pages/offer/offer';
import { MoonLoader } from 'react-spinners';

export const App: FC<PropsWithChildren> = () => {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const isOffersLoading = useAppSelector((state) => state.DATA.isOffersLoading);
  if (isOffersLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}><MoonLoader /></div>;
  }
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
