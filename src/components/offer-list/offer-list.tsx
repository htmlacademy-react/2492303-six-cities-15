import { FC } from 'react';
import { OfferCard } from '../offer-card/offer-card';
import { Point, TOffersData } from '../../const';
import { POINTS } from '../../mocks/points';

export type TOfferListPageProps = {
  cardAmount: number;
  offersData: TOffersData[];
  setActiveOfferCardid: (e: number) => void;
  setSelectedPoint: (e: Point | undefined) => void;
};

export const OfferList: FC<TOfferListPageProps> = ({ cardAmount, offersData, setActiveOfferCardid, setSelectedPoint}) => (
  <div className='cities__places-list places__list tabs__content'>
    {
    // eslint-disable-next-line react/no-array-index-key
      (cardAmount > 0) && Array.from(new Array(cardAmount), (_, index) => <OfferCard offersData={offersData[index]} key={index} setActiveOfferCardid={setActiveOfferCardid} setSelectedPoint={setSelectedPoint} points={POINTS}/>)
    }
    {
      (cardAmount === 0) && 'there is no card'
    }
  </div>
);

