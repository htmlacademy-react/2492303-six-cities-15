import { FC, PropsWithChildren } from 'react';
import { MainPage, TMainPageProps } from '../pages/main';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, TFavoriteData } from '../const';
import Login from '../pages/login';
import {Favorites} from '../pages/favorites';
import { NotFoundScreen } from '../pages/not-found-screen';
import PrivateRoute from '../components/private-route/private-route';
import Offer from '../pages/offer';

export type TAppProps = {
  favoriteData: TFavoriteData[];
  mainPageProps: TMainPageProps;
}

export const App: FC<PropsWithChildren<TAppProps>> = (props: TAppProps) => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes >
        <Route
          path={AppRoute.Main}
          element={<MainPage {...props.mainPageProps} />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route path= {AppRoute.Offer}>
          <Route path=':id' element={<Offer />} />
        </Route>
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={false}
            >
              <Favorites favoriteData={props.favoriteData} cardAmount={3}/>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);


export default App;
