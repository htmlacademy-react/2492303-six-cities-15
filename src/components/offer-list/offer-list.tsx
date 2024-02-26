import { FC } from 'react';
import { OfferCard } from '../offer-card/offer-card';

export type TOfferListPageProps = {
  cardAmount: number;
  offersData: TOffersData[];
  setActiveOfferCardid: (e: number) => void;
};

export type TOffersData = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
};

export const OfferList: FC<TOfferListPageProps> = ({ cardAmount, offersData, setActiveOfferCardid}) => (
  <div className='cities__places-list places__list tabs__content'>
    {
    // eslint-disable-next-line react/no-array-index-key
      (cardAmount > 0) && Array.from(new Array(cardAmount), (_, index) => <OfferCard offersData={offersData[index]} key={index} setActiveOfferCardid={setActiveOfferCardid} />)
    }
    {
      (cardAmount === 0) && 'there is no card'
    }
  </div>
);

