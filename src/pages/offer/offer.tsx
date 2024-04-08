import {Link, useNavigate, useParams} from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../components/hooks';
import { AddFavoriteAction, fetchFavoriteAction, fetchOfferAction, fetchOfferNearAction, logoutAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { FormReview } from '../../components/form-review/form-review';
import { OfferList } from '../../components/offer-list/offer-list';
import { TOffer, AuthorizationStatus, AppRoute } from '../../const';
import { cities } from '../../mocks/city';
import { NotFoundScreen } from '../not-found-screen/not-found-screen';
import Map from '../../components/map/map';
import { Reviews } from './../../components/reviews/reviews';

function Offer(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.DATA.offer);
  const favorite = useAppSelector((state) => state.DATA.favorites);
  useEffect (() => {
    dispatch(fetchOfferAction(String(params?.id)));
    dispatch(fetchFavoriteAction(''));
    dispatch(fetchOfferNearAction(String(params?.id)));
  }, [dispatch, params]);
  const activeCity = useAppSelector((state) => state.DATA.city);
  const OffersNear = useAppSelector((state) => state.DATA.offersNear);
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const hasError = useAppSelector(((state) => state.DATA.hasError));
  const user = useAppSelector((state) => state.USER.User);
  const isOfferLoading = useAppSelector((state) => state.DATA.isOfferLoading);
  const navigate = useNavigate();
  if (hasError) {
    return (
      <NotFoundScreen />
    );
  }
  const offersMap: TOffer[] = [...OffersNear.slice(0,3)];
  if(offer){
    offersMap.push(offer);
  }
  const handleClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth){
      navigate(AppRoute.Login);
      return;
    }
    dispatch(AddFavoriteAction({status: Number(!offer?.isFavorite),offerId: offer?.id }));
  };
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
            {authorizationStatus === AuthorizationStatus.Auth &&
            <nav className='header__nav'>
              <ul className='header__nav-list'>
                <li className='header__nav-item user'>
                  <Link
                    className='header__nav-link header__nav-link--profile'
                    to = {AppRoute.Favorites}
                  >
                    <div className='header__avatar-wrapper user__avatar-wrapper'></div>
                    <span className='header__user-name user__name'>
                      {user?.email}
                    </span>
                    <span className='header__favorite-count'>{favorite?.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={''} >
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
      {isOfferLoading && <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}> <MoonLoader /></div>}
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
              {offer?.isPremium &&
              <div className='offer__mark'>
                <span className='offer__mark'>Premium</span>
              </div>}
              <div className='offer__name-wrapper'>
                <h1 className='offer__name'>
                  {offer?.title}
                </h1>
                <button className= {`offer__bookmark-button button  ${offer?.isFavorite ? 'offer__bookmark-button--active button' : ''}`}
                  onClick = {() => {
                    handleClick();
                  }}
                >
                  <svg className='offer__bookmark-icon' width={31} height={33}>
                    <use xlinkHref='#icon-bookmark' />
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>
              <div className='offer__rating rating'>
                <div className='offer__stars rating__stars'>
                  <span style={{ width: `${Math.round(Number(offer?.rating)) * 20 }%`}} />
                  <span className='visually-hidden'>Rating </span>
                </div>
                <span className='offer__rating-value rating__value'>{offer?.rating}</span>
              </div>
              <ul className='offer__features'>
                <li className='offer__feature offer__feature--entire'>
                  {offer?.type}
                </li>
                <li className='offer__feature offer__feature--bedrooms'>
                  {offer?.bedrooms}{offer?.bedrooms === 1 ? ' Bedroom' : ' Bedrooms'}
                </li>
                <li className='offer__feature offer__feature--adults'>
                  Max {offer?.maxAdults} {offer?.maxAdults === 1 ? 'adult' : ' adults'}
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
                <Reviews />
                {authorizationStatus === AuthorizationStatus.Auth && <FormReview offerId={offer?.id}/>}
              </section>
            </div>
          </div>
          <section className='offer__map map'>
            <Map activeCity={activeCity} points={offersMap.map((item)=> item.location)} selectedPoint={offer?.location || null} />
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>
              Other places in the neighbourhood
            </h2>
            <div className='near-places__list places__list'>
              <OfferList offers={offersMap.slice(0,3)} city={offer?.city || cities[0]}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default Offer;
