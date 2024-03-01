import { FC } from 'react';
import { OfferCard } from '../offer-card/offer-card';
import { TOffersData } from '../../const';
import { POINTS } from '../../mocks/points';
import { TOffer } from '../../pages/main';

export type TOfferListPageProps = {
  cardAmount: number;
  offersData: TOffersData[];
  handlerHover: (offer?: TOffer) => void;
};

export const OfferList: FC<TOfferListPageProps> = ({ cardAmount, offersData, handlerHover}) => (
  <div className='cities__places-list places__list tabs__content'>
    {
    // eslint-disable-next-line react/no-array-index-key
      (cardAmount > 0) && Array.from(new Array(cardAmount), (_, index) => <OfferCard offersData={offersData[index]} key={index} handlerHover={handlerHover} points={POINTS}/>)
    }
    {
      (cardAmount === 0) && 'there is no card'
    }
  </div>
);

