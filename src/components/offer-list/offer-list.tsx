import { FC } from 'react';
import { OfferCard } from '../offer-card/offer-card';
import { TCity, TOffer, TOffersData } from '../../const';
import { POINTS } from '../../mocks/points';

export type TOfferListPageProps = {
  cardAmount: number;
  offersData: TOffersData[];
  handlerHover: (offer?: TOffer) => void;
  city: TCity;
};

export const OfferList: FC<TOfferListPageProps> = ({ cardAmount, offersData, handlerHover, city}) => (
  <div className='cities__places-list places__list tabs__content'>
    {
      (cardAmount > 0) && offersData.filter((item) => item.city.id === city.id).map((item) => (
        <OfferCard key={item.id} offersData={item} handlerHover={handlerHover} points={POINTS}/>
      ))
    }
    {
      (cardAmount === 0) && 'there is no card'
    }
  </div>
);

