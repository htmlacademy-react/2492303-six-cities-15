import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, TOffer } from '../../const';
import { AddFavoriteAction } from '../../store/api-actions';
import { useAppDispatch } from '../hooks';
import { memo } from 'react';

export type TOfferCardPageProps = {
  offer: TOffer;
  handlerHover?: (offer?: TOffer) => void;
  typeCard: 'offer' | 'near';
}

const OfferCard: FC<TOfferCardPageProps> = ({offer, handlerHover, typeCard}) => {
  const dispatch = useAppDispatch();
  const handleMouseOver = () => {
    if (handlerHover){
      handlerHover(offer);
    }
  };
  const handleMouseOut = () => {
    if (handlerHover){
      handlerHover();
    }
  };
  const handleClick = (event: { stopPropagation: () => void}) => {
    event.stopPropagation();
    dispatch(AddFavoriteAction({status: Number(!offer.isFavorite),offerId: offer.id }));
  };
  const navigate = useNavigate();
  return(
    <div onClick={() => navigate(AppRoute.Offer.replace(':id', String(offer?.id)))} style={{cursor : 'pointer'}}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <article className= {typeCard === 'offer' ? 'cities__card place-card' : 'near-places__card place-card'}>
        {offer?.isPremium &&
            <div className="place-card__mark">
              <span>Premium</span>
            </div>}
        <div
          className= {typeCard === 'offer' ? 'cities__image-wrapper place-card__image-wrapper' : 'near-places__image-wrapper place-card__image-wrapper'}
        >
          <img
            className="place-card__image"
            src= {offer?.previewImage}
            width={260}
            height={200}
            alt="Place image"
          />
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{offer?.price}€</b>
              <span className="place-card__price-text">
                /&nbsp;{offer?.type}
              </span>
            </div>
            <button
              className= {offer?.isFavorite === false ? 'place-card__bookmark-button button' : 'place-card__bookmark-button place-card__bookmark-button--active button'}
              type="button"
              onClick={handleClick}
            >
              <svg
                className="place-card__bookmark-icon"
                width={18}
                height={19}
              >
                <use xlinkHref="#icon-bookmark" />
              </svg>
              <span className="visually-hidden">To bookmarks  </span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: offer?.rating * 20}} />s
              <span className="visually-hidden">{offer?.rating}</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{offer?.title}</a>
            {offer?.isFavorite}
          </h2>
          <p className="place-card__type">{offer?.type}</p>
        </div>
      </article>
    </div>
  );
};
const OfferMemo = memo(OfferCard);
export default OfferMemo;
