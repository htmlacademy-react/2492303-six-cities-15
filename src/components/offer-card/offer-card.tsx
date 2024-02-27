import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, TOffersData } from '../../const';

export type TOfferCardPageProps = {
  offersData: TOffersData;
  setActiveOfferCardid: (e: number) => void;
}

export const OfferCard: FC<TOfferCardPageProps> = ({offersData, setActiveOfferCardid}) => {
  const handleMouseOver = () => {
    setActiveOfferCardid(offersData.id);
  };
  return(
    <article className="cities__card place-card">
      <div className="cities__image-wrapper place-card__image-wrapper" onMouseOver={handleMouseOver}>
        <Link to= {AppRoute.Offer}>
          <img
            className="place-card__image"
            src="img/room.jpg"
            width={260}
            height={200}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{offersData.price}€</b>
            <span className="place-card__price-text">
            /&nbsp;{offersData.period}
            </span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width={18}
              height={19}
            >
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In  </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: offersData.rating}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{offersData.name}</a>
        </h2>
        <p className="place-card__type">{offersData.type}</p>
      </div>
    </article>
  );
};
