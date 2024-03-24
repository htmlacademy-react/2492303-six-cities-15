import { FC } from 'react';
import { FavoritesCard } from '../favorites-card/favorites-card';
import { TOffer } from '../../const';

export type TFavoriteListPageProps = {
  cardAmount: number | undefined;
  favoriteData: TOffer[] | undefined;
};

export const FavoriteList: FC<TFavoriteListPageProps> = ({ cardAmount, favoriteData}) => (
  <div className='favorites__places'>

    {
      // eslint-disable-next-line react/no-array-index-key
      favoriteData && cardAmount && (cardAmount > 0) && Array.from(new Array(cardAmount), (_, index) => <FavoritesCard favoritesData={favoriteData[index]} key={index} />)
    }
    {
      (cardAmount === 0) && 'there is no card'
    }
  </div>

);


