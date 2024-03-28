import {Link, useParams} from 'react-router-dom';
import { AppRoute, AuthorizationStatus} from '../const';
import { FormReview } from '../components/form-review/form-review';
import { Reviews } from '../components/reviews/reviews';
import Map from '../components/map/map';
//import { OfferList } from '../components/offer-list/offer-list';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../components/hooks';
import { fetchOfferAction, fetchOfferNearAction } from '../store/api-actions';
import { NotFoundScreen } from './not-found-screen';
import { NearOfferList } from '../components/offer-list/near-offer-list';

function Offer(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.DATA.favorite);

  useEffect (() => {
    if (params.id) {
      dispatch(fetchOfferAction(params.id));
      dispatch(fetchOfferNearAction(params.id));
    }
  }, [dispatch, params]);
  const activeCity = useAppSelector((state) => state.DATA.city);
  const offersNear = useAppSelector((state) => state.DATA.offersNear);
  //const offers = useAppSelector((state) => state.offers);
  const offer = useAppSelector((state) => state.DATA.offer);
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const hasError = useAppSelector(((state) => state.DATA.hasError));
  if (hasError) {
    return (
      <NotFoundScreen />
    );
  }
  return (
    <div className='page'>
      <header className='header'>
        <div className='container'>
          <div className='header__wrapper'>
            <div className='header__left'>
              <Link className='header__logo-link' to={AppRoute.Main}>
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
                  <Link
                    className='header__nav-link header__nav-link--profile'
                    to = {AppRoute.Main}
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
      <main className='page__main page__main--offer'>
        <section className='offer'>
          <div className='offer__gallery-container container'>
            <div className='offer__gallery'>
              {offer?.images?.map((item) => (
                <div key = {item} className='offer__image-wrapper'>
                  <img
                    className='offer__image'
                    src= {item}
                    alt='Photo studio'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='offer__container container'>
            <div className='offer__wrapper'>
              <div className='offer__mark'>
                <span>{offer?.isPremium ? 'Premium' : 'Single'}</span>
              </div>
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>
                  {offer?.title}
                </h1>
                <button className= {offer?.isFavorite === false ? 'offer__bookmark-button button' : 'offer__bookmark-button--active'}>
                  <svg className='offer__bookmark-icon' width={31} height={33}>
                    <use xlinkHref='#icon-bookmark' />
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>
              <div className='offer__rating rating'>
                <div className='offer__stars rating__stars'>
                  <span style={{ width: '80%' }} />
                  <span className='visually-hidden'>Rating </span>
                </div>
                <span className='offer__rating-value rating__value'>{offer?.rating}</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature offer__feature--entire'>
                  {offer?.type}
                </li>
                <li className='offer__feature offer__feature--bedrooms'>
                  {offer?.bedrooms} Bedrooms
                </li>
                <li className='offer__feature offer__feature--adults'>
                  Max {offer?.maxAdults} adults
                </li>
              </ul>
              <div className='offer__price'>
                <b className='offer__price-value'>€{offer?.price}</b>
                <span className='offer__price-text'>&nbsp;night</span>
              </div>
              <div className='offer__inside'>
                <h2 className='offer__inside-title'>Whats inside</h2>
                <ul className='offer__inside-list'>
                  {offer?.goods?.map((item) => (
                    <li key={item} className='offer__inside-item'>{item}</li>
                  ))}
                </ul>
              </div>
              <div className='offer__host'>
                <h2 className='offer__host-title'>Meet the host</h2>
                <div className='offer__host-user user'>
                  <div className='offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper'>
                    <img
                      className='offer__avatar user__avatar'
                      src= {offer?.host?.avatarUrl}
                      width={74}
                      height={74}
                      alt='Host avatar'
                    />
                  </div>
                  <span className='offer__user-name'>{offer?.host?.name}</span>
                  <span className='offer__user-status'>{offer?.host?.isPro ? 'Pro' : ''}</span>
                </div>
                <div className='offer__description'>
                  <p className='offer__text'>
                    {offer?.description}
                  </p>
                  <p className='offer__text'>
                    {offer?.description}
                  </p>
                </div>
              </div>
              <section className='offer__reviews reviews'>
                <Reviews/>
                {authorizationStatus === AuthorizationStatus.Auth && <FormReview offerId={offer?.id}/>}
              </section>
            </div>
          </div>
          <section className='offer__map map'>
            <Map activeCity={activeCity} points={offersNear.map((item)=> item.location).slice(0,3)} selectedPoint={null} />
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            <div className='near-places__list places__list'>
              <NearOfferList offers={offersNear} cardAmount={3}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default Offer;
