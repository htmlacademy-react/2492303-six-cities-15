import { FC } from 'react';
import { TCity, TOffer } from '../../const';
import OfferCard from '../offer-card/offer-card';

export type TOfferListPageProps = {
  offers: TOffer[];
  handlerHover?: (offer?: TOffer) => void;
  city: TCity;
};

export const OfferList: FC<TOfferListPageProps> = ({ offers, handlerHover, city}) => (
  <div className='cities__places-list places__list tabs__content'>
    {
      (offers.length > 0) && offers.filter((item) => item.city.name === city.name).map((item) => (
        <OfferCard key={item.id} offer={item} handlerHover={handlerHover} typeCard={'offer'}/>
      ))
    }
    {
      (offers.length === 0) &&
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    }
  </div>
);
