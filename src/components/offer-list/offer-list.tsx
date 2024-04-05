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
      (offers.length === 0) && 'there is no card'
    }
  </div>
);
