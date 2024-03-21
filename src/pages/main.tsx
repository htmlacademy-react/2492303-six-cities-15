import { FC, useState } from 'react';
import { OfferList } from '../components/offer-list/offer-list';
import { AppRoute, AuthorizationStatus, Point, TCity, TOffer} from '../const';
import Map from '../components/map/map.tsx';
import { CityList } from '../components/city/city_list.tsx';
import { City } from '../mocks/city.ts';
import { Popular } from '../components/popular/popular.tsx';
import SortOffer from '../components/popular/sort-offer.ts';
import { useAppDispatch, useAppSelector } from '../components/hooks/index.ts';
import { updateCity } from '../store/action.ts';
import { MoonLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { logoutAction } from '../store/api-actions.ts';

export type TMainPageProps = {
  cardAmount: number;
}

export const MainPage: FC<TMainPageProps> = (props: TMainPageProps) => {
  const offers = useAppSelector((state) => state.offers);
  const [typeS, setTypeS] = useState('popular');
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const handlerHover = (offer?: TOffer) => {
    setSelectedPoint(offer ? offer.location : null);
  };
  const activeCity = useAppSelector((state) => state.city);
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const dispatch = useAppDispatch();
  const handleClick = (city: TCity) => {
    dispatch(updateCity(city));
  };
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
            {authorizationStatus === AuthorizationStatus.Auth &&
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a
                      className="header__nav-link header__nav-link--profile"
                      href="#"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                      </span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <Link to={AppRoute.Main} className="header__nav-link" >
                      <span className="header__signout" onClick={() => {
                        dispatch(logoutAction());
                      }}
                      >
                          Sign out
                      </span>
                    </Link>
                  </li>
                </ul>
              </nav>}
            {authorizationStatus === AuthorizationStatus.NoAuth &&
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                      Sign in
                    </Link>
                  </li>
                </ul>
              </nav>}
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list" >
              {City.map((item) => (
                <div key={item.id} onClick={() => handleClick(item)}>
                  <CityList key={item.id} title={item.name}/>
                </div>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              {isOfferLoading && <MoonLoader/>}
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.filter((item) => item.city.name === activeCity.name).length} places to stay in {activeCity.name}</b>
              <Popular setTypeS={setTypeS}/>
              <OfferList offers={SortOffer(offers,typeS)} cardAmount={props.cardAmount} handlerHover={handlerHover} city={activeCity}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map activeCity={activeCity} points={offers.map((item)=> item.location)} selectedPoint={selectedPoint} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
