import { FC } from 'react';
import { AppRoute, AuthorizationStatus, TOffer } from '../../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addFavoriteAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';

export type TOfferCardPageProps = {
  favoritesData: TOffer;
}

export const FavoritesCard: FC<TOfferCardPageProps> = ({favoritesData}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (authorizationStatus === AuthorizationStatus.NoAuth){
      navigate(AppRoute.Login);
    }

    event.stopPropagation();
    dispatch(addFavoriteAction({status: Number(!favoritesData.isFavorite),offerId: favoritesData.id }));
  };

  return (
    <article className='favorites__card place-card'
      onClick={() => navigate(AppRoute.Offer.replace(':id', String(favoritesData?.id)))} style={{cursor : 'pointer'}}
    >
      {favoritesData.isPremium &&
        <div className="place-card__mark">
          <span> Premium </span>
        </div>}
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <img
          className='place-card__image'
          src={favoritesData?.previewImage}
          width={150}
          height={110}
          alt='Place image'
        />
      </div>
      <div className='favorites__card-info place-card__info'>
        <div className='place-card__price-wrapper'>
          <div className='place-card__price'>
            <b className='place-card__price-value'>{favoritesData?.price}</b>
            <span className='place-card__price-text'>
            /&nbsp;night
            </span>
          </div>
          <button
            className='place-card__bookmark-button place-card__bookmark-button--active button'
            type='button'
            onClick={handleClick}
          >
            <svg
              className='place-card__bookmark-icon'
              width={18}
              height={19}
            >
              <use xlinkHref='#icon-bookmark' />
            </svg>
            <span className='visually-hidden'>In bookmarks</span>
          </button>
        </div>
        <div className='place-card__rating rating'>
          <div className='place-card__stars rating__stars'>
            <span style={{ width: `${Math.round(favoritesData?.rating) * 20 }%`}} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          {favoritesData?.title}
        </h2>
        <p className='place-card__type'>{favoritesData?.type[0].toUpperCase() + favoritesData?.type.slice(1)}</p>
      </div>
    </article>
  );
};
