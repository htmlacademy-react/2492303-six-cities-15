import { FC } from 'react';
import { TOffer } from '../../const';
import { NearCard } from '../offer-card/near-card';

export type TOfferListPageProps = {
  cardAmount: number;
  offers: TOffer[];
};

export const NearOfferList: FC<TOfferListPageProps> = ({ cardAmount, offers}) => (
  <div className='cities__places-list places__list tabs__content'>
    {
      offers && cardAmount && (cardAmount > 0) && Array.from(new Array(cardAmount), (_, index) => <NearCard key={index} offer={offers[index]}/>)
    }
    {
      (cardAmount === 0) && 'there is no card'
    }
  </div>
);
