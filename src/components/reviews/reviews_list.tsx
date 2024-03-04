import { FC } from 'react';
import { ReviewsInfo } from './reviews_info';
import ReviewsData from '../../mocks/reviews';
import { ReviewUser } from './review_user';

export const ReviewsList: FC = () => (
  <ul className='reviews__list'>
    {ReviewsData.map((item) => (
      <li key={item.id} className='reviews__item'>
        <div className='reviews__user user'>
          <ReviewUser key={item.id} name={item.userName} img={item.img}/>
        </div>
        <div className='reviews__info'>
          <ReviewsInfo key={item.id} reviewData={item}/>
        </div>
      </li>
    ))}
  </ul>
);
