import { FC } from 'react';
import { TOffer } from '../../const';
import { useAppDispatch } from '../hooks';
import { AddFavoriteAction } from '../../store/api-actions';

export type TOfferCardPageProps = {
  favoritesData: TOffer;
}

export const FavoritesCard: FC<TOfferCardPageProps> = ({favoritesData}) => {
  const dispatch = useAppDispatch();
  return (
    <article className='favorites__card place-card'>
      {favoritesData.isPremium && <div className="place-card__mark">
        <span> Premium </span>
      </div>}
      <div className='favorites__image-wrapper place-card__image-wrapper'>
        <a href='#'>
          <img
            className='place-card__image'
            src={favoritesData?.previewImage}
            width={150}
            height={110}
            alt='Place image'
          />
        </a>
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
            onClick={() => {
              dispatch(AddFavoriteAction({status: Number(!favoritesData.isFavorite),offerId: favoritesData.id }));
            }}
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
            <span style={{ width: '80%' }} />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <h2 className='place-card__name'>
          <a href='#'>{favoritesData?.title}</a>
        </h2>
        <p className='place-card__type'>{favoritesData?.type}</p>
      </div>
    </article>
  );
};
