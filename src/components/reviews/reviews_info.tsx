import { FC } from 'react';
import { TReviewData } from '../../const';

export type TReviewsInfoProps = {
  reviewData: TReviewData;
}

export const ReviewsInfo: FC<TReviewsInfoProps> = (props) => (
  <div>
    <p className='reviews__text'>
      {props.reviewData.note}
    </p>
    <time className='reviews__time' dateTime={props.reviewData.time}>
      {props.reviewData.month}
    </time>
  </div>
);
