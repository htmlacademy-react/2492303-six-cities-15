import { FC } from 'react';
import { FavoritesCard } from '../favorites-card/favorites-card';

export type TFavoriteListPageProps = {
  cardAmount: number;
  favoriteData: TFavoriteData[];
};

export type TFavoriteData = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
};

export const FavoriteList: FC<TFavoriteListPageProps> = ({ cardAmount, favoriteData}) => (
  <div className="cities__places-list places__list tabs__content">
    {
      // eslint-disable-next-line react/no-array-index-key
      (cardAmount > 0) && Array.from(new Array(cardAmount), (_, index) => <FavoritesCard favoritesData={favoriteData[index]} key={index} />)
    }
    {
      (cardAmount === 0) && 'there is no card'
    }
  </div>
);


