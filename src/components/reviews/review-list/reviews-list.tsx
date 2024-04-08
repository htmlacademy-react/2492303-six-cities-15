import { FC } from 'react';
import { ReviewsInfo } from '../review-info/reviews-info';
import { ReviewUser } from '../review-user/review-user';
import { TComments} from '../../../const';

export type TReviewDataProps = {
  ReviewsData?: TComments[];
};

export const ReviewsList: FC<TReviewDataProps> = ({ReviewsData}) => (
  <ul className='reviews__list'>
    {ReviewsData && ReviewsData.slice(0,10).map((item) => (
      <li key={item.id} className='reviews__item'>
        <div className='reviews__user user'>
          <ReviewUser key={item.id} name={item.user.name} img={item.user.avatarUrl}/>
        </div>
        <div className='reviews__info'>
          <ReviewsInfo key={item.id} reviewData={item}/>
        </div>
      </li>
    ))}
  </ul>
);

