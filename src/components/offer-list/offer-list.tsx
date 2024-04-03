import { FC } from 'react';
import { TCity, TOffer } from '../../const';
import OfferCard from '../offer-card/offer-card';

export type TOfferListPageProps = {
  cardAmount: number;
  offers: TOffer[];
  handlerHover?: (offer?: TOffer) => void;
  city: TCity;
};

export const OfferList: FC<TOfferListPageProps> = ({ cardAmount, offers, handlerHover, city}) => (
  <div className='cities__places-list places__list tabs__content'>
    {
      (cardAmount > 0) && offers.filter((item) => item.city.name === city.name).map((item) => (
        <OfferCard key={item.id} offer={item} handlerHover={handlerHover} typeCard={'offer'}/>
      ))
    }
    {
      (cardAmount === 0) && 'there is no card'
    }
  </div>
);
