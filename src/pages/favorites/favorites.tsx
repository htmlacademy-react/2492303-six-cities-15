import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FavoriteList } from '../../components/favorite-list/favorite-list';
import { fetchFavoriteAction, logoutAction } from '../../store/api-actions';
import { MoonLoader } from 'react-spinners';
import { updateCity } from '../../store/action';
import { cities } from '../../mocks/city';

export const Favorites: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.USER.user);
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  useEffect (() => {
    if (authorizationStatus === AuthorizationStatus.Auth){
      dispatch(fetchFavoriteAction(''));
    }
  },[dispatch, authorizationStatus]);
  const favorites = useAppSelector((state) => state.DATA.favorites);
  const isFavoritesLoading = useAppSelector((state) => state.DATA.isFavoritesLoading);
  if (isFavoritesLoading){
    return <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}><MoonLoader /></div>;
  }
  const handleClick = (nameCity: string) => {
    dispatch(updateCity(cities.find((item) => (item.name === nameCity)) || cities[0]));
  };
  const handleSignOut = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <div className={`page ${!favorites || favorites?.length === 0 ? 'page--favorites-empty' : ''} `}>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link to = {AppRoute.Main} className='header__logo-link'>
                <img
                  className='header__logo'
                  src='img/logo.svg'
                  alt='6 cities logo'
                  width={81}
                  height={41}
                />
              </Link>
            </div>
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <Link to = {AppRoute.Favorites}
                    className='header__nav-link header__nav-link--profile'
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img
                        style={{borderRadius: 10}}
                        src={user?.avatarUrl}
                      />
                    </div>
                    <span className='header__user-name user__name'>
                      {user?.email}
                    </span>
                    <span className='header__favorite-count'>{favorites?.length}</span>
                  </Link>
                </li>
                <li className='header__nav-item'>
                  <Link to = {AppRoute.Login} className='header__nav-link' onClick={handleSignOut}>
                    <span className='header__signout'>
                      Sign out
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className= {`page__main page__main--favorites ${favorites?.length === 0 ? 'page__main--favorites-empty' : ''}`}>
        <div className='page__favorites-container container'>
          {
            (!favorites || favorites?.length === 0) &&
            <section className="favorites favorites--empty">
              <h1 className = "visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          }
          {favorites?.length > 0 &&
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              {[... new Set(favorites?.map(((item) => item.city.name)))].map(((item) =>
                (
                  <li key={item} className='favorites__locations-items'>
                    <div className='favorites__locations locations locations--current'>
                      <div className='locations__item'>
                        <Link to = {AppRoute.Main} className='locations__item-link' onClick={() => handleClick(item)}>
                          <span>{item}</span>
                        </Link>
                      </div>
                    </div>
                    <FavoriteList favoriteData={favorites?.filter((it)=> it.city.name === item)} cardAmount={favorites?.filter((it)=> it.city.name === item).length} />
                  </li>
                )
              ))}
            </ul>
          </section>}
        </div>
      </main>
      <footer className='footer container'>
        <Link to = {AppRoute.Main} className='footer__logo-link'>
          <img
            className='footer__logo'
            src='img/logo.svg'
            alt='6 cities logo'
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
};
