import { FC, PropsWithChildren } from 'react';
import { MainPage, TMainPageProps } from '../pages/main';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, TFavoriteData } from '../const';
import Login from '../pages/login';
import {Favorites} from '../pages/favorites';
import { NotFoundScreen } from '../pages/not-found-screen';
import PrivateRoute from '../components/private-route/private-route';
import Offer from '../pages/offer';
import { useAppSelector } from '../components/hooks';

export type TAppProps = {
  favoriteData: TFavoriteData[];
  mainPageProps: TMainPageProps;
}

export const App: FC<PropsWithChildren<TAppProps>> = (props: TAppProps) => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes >
          <Route
            path={AppRoute.Main}
            element={<MainPage {...props.mainPageProps} />}
          />
          <Route
            path={AppRoute.Login}
            element={authorizationStatus === AuthorizationStatus.Auth ? <MainPage {...props.mainPageProps} /> : <Login />}
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
                <Favorites favoriteData={props.favoriteData} cardAmount={3}/>
              </PrivateRoute>
            }
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
