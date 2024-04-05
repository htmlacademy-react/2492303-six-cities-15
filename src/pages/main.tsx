import { FC, useState, useCallback } from 'react';
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
import { useSelector } from 'react-redux';
import { makeOffersFilter } from '../store/offer-process/selectors.ts';

export const MainPage: FC = () => {
  const offers = useAppSelector((state) => state.DATA.offers);
  const user = useAppSelector((state) => state.USER.User);
  const offersFilter = useSelector(makeOffersFilter);
  const [typeS, setTypeS] = useState('popular');
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const handlerHover = useCallback (
    (offer?: TOffer) => {
      setSelectedPoint(offer ? offer.location : null);
    }, []
  );
  const activeCity = useAppSelector((state) => state.DATA.city);
  const isOfferLoading = useAppSelector((state) => state.DATA.isOfferLoading);
  const dispatch = useAppDispatch();
  const handleClick = (city: TCity) => {
    dispatch(updateCity(city));
  };
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const favorite = useAppSelector((state) => state.DATA.favorite);
  return (
    <div className="page page--gray page--main" data-testid="main-page">
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
                    <Link to={AppRoute.Favorites}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        <img
                          style={{borderRadius: 10}}
                          src={user?.avatarUrl}
                        />
                      </div>
                      <span className="header__user-name user__name" >
                        {user?.email}
                      </span>
                      <span className="header__favorite-count">{favorite?.length}</span>
                    </Link>
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
      <main className= {`${offers.length > 0 ? 'page__main page__main--index' : 'page__main page__main--index page__main--index-empty'}`}>
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
        {offers.length > 0 &&
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              {isOfferLoading && <MoonLoader/>}
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.filter((item) => item.city.name === activeCity.name).length} places to stay in {activeCity.name}</b>
              <Popular setTypeS={setTypeS}/>
              <OfferList offers={SortOffer(offersFilter,typeS)} handlerHover={handlerHover} city={activeCity}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map activeCity={activeCity} points={offers.map((item)=> item.location)} selectedPoint={selectedPoint} />
              </section>
            </div>
          </div>
        </div>}
        {offers.length === 0 &&
        <div className="cities">
          <div className='cities__places-container cities__places-container--empty container'>
            <section className='cities__no-places'>
              <div className='cities__status-wrapper tabs__content'>
                <b className='cities__status'>No places to stay available</b>
                <p className='cities__status-description'>
                  We could not find any property available at the moment in
                  {activeCity.name}
                </p>
              </div>
            </section>
            <div className='cities__right-section'/>
          </div>
        </div>}
      </main>
    </div>
  );
};
