import { FC, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { CityList } from '../../components/city-list/city-list';
import { useAppSelector, useAppDispatch } from '../../components/hooks';
import { OfferList } from '../../components/offer-list/offer-list';
import { Sorting } from '../../components/sorting/sorting';
import SortOffer from '../../components/sorting/sort-offer';
import { TOffer, TCity, AuthorizationStatus, AppRoute, Point } from '../../const';
import { cities } from '../../mocks/city';
import { updateCity } from '../../store/action';
import { logoutAction } from '../../store/api-actions';
import { makeOffersFilter } from '../../store/offer-process/selectors';
import Map from '../../components/map/map';


export const MainPage: FC = () => {
  const offers = useAppSelector((state) => state.DATA.offers);
  const user = useAppSelector((state) => state.USER.user);
  const offersFilter = useSelector(makeOffersFilter);
  const [typeSort, setTypeSort] = useState('popular');
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const handlerHover = useCallback (
    (offer?: TOffer) => {
      setSelectedPoint(offer ? offer.location : null);
    }, []
  );
  const activeCity = useAppSelector((state) => state.DATA.city);
  const isOffersLoading = useAppSelector((state) => state.DATA.isOffersLoading);
  const dispatch = useAppDispatch();
  const handleClick = (city: TCity) => {
    dispatch(updateCity(city));
  };
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const favorite = useAppSelector((state) => state.DATA.favorites);
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
                    <Link to={AppRoute.Main} className="header__nav-link" onClick={() => {
                      dispatch(logoutAction());
                    }}
                    >
                      <span className="header__signout">
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
                    <Link to={AppRoute.Login} className="header__login">
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
              {cities.map((item) => (
                <li className="locations__item" key={item.id} onClick={() => handleClick(item)}>
                  <CityList key={item.id} title={item.name}/>
                </li>
              ))}
            </ul>
          </section>
        </div>
        {isOffersLoading && <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}><MoonLoader /></div>}
        {offers.length > 0 &&
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.filter((item) => item.city.name === activeCity.name).length} {offersFilter.length === 1 ? 'place' : 'places' } to stay in {activeCity.name}</b>
              <Sorting setTypeSort={setTypeSort}/>
              <OfferList offers={SortOffer(offersFilter,typeSort)} handlerHover={handlerHover} city={activeCity}/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                {
                  offersFilter.length > 0 && <Map activeCity={activeCity} points={offersFilter.map((item)=> item.location)} selectedPoint={selectedPoint} />
                }
              </section>
            </div>
          </div>
        </div>}
        {!isOffersLoading && offers.length === 0 &&
        <div className="cities">
          <div className='cities__places-container cities__places-container--empty container'>
            <section className='cities__no-places'>
              <div className='cities__status-wrapper tabs__content'>
                <b className='cities__status'>No places to stay available</b>
                <p className='cities__status-description'>
                  We could not find any property available at the moment in{' '}
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
