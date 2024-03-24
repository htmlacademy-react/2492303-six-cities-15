import { FC, useEffect } from 'react';
import { FavoriteList } from '../components/favorite-list/favorite-list';
import { useAppDispatch, useAppSelector } from '../components/hooks';
import { fetchFavoriteAction } from '../store/api-actions';
import { AppRoute } from '../const';
import { Link } from 'react-router-dom';


export const Favorites: FC = () => {
  const dispatch = useAppDispatch();
  useEffect (() => {
    dispatch(fetchFavoriteAction(''));
  },[]);
  const favorite = useAppSelector((state) => state.favorite);
  return (
    <div className='page'>
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
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__user-name user__name'>
                    Oliver.conner@gmail.com
                    </span>
                    <span className='header__favorite-count'>{favorite?.length}</span>
                  </Link>
                </li>
                <li className='header__nav-item'>
                  <a className='header__nav-link' href='#'>
                    <span className='header__signout'>Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className='page__main page__main--favorites'>
        <div className='page__favorites-container container'>
          <section className='favorites'>
            <h1 className='favorites__title'>Saved listing</h1>
            <ul className='favorites__list'>
              {[... new Set(favorite?.map(((item) => item.city.name)))].map(((item) =>
                (
                  <li key={item} className='favorites__locations-items'>
                    <div className='favorites__locations locations locations--current'>
                      <div className='locations__item'>
                        <a className='locations__item-link' href='#'>
                          <span>{item}</span>
                        </a>
                      </div>
                    </div>
                    <FavoriteList favoriteData={favorite?.filter((it)=> it.city.name === item)} cardAmount={favorite?.filter((it)=> it.city.name === item).length} />
                  </li>
                )
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className='footer container'>
        <a className='footer__logo-link' href='main.html'>
          <img
            className='footer__logo'
            src='img/logo.svg'
            alt='6 cities logo'
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
};
