import { FC } from 'react';
import { ReviewsList } from './reviews_list';

export type TReviewsProps = {
  cntReviews: number;
}

export const Reviews: FC<TReviewsProps> = ({cntReviews}) => (
  <div>
    <h2 className='reviews__title'>
      Reviews · <span className='reviews__amount'>{cntReviews}</span>
    </h2>
    <ReviewsList/>
  </div>
);
