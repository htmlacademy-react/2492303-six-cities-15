import { FC } from 'react';
import { TComments } from '../../const';

export type TReviewsInfoProps = {
  reviewData: TComments;
}

export const ReviewsInfo: FC<TReviewsInfoProps> = (props) => {
  const dateCreate = new Date (props.reviewData.date).toLocaleString('en-US', {month:'long', year:'numeric'});
  return (
    <div>
      <div className='reviews__rating rating'>
        <div className='reviews__stars rating__stars'>
          <span style={{ width: `${Math.round(Number(props?.reviewData.rating)) * 20 }%`}} />
          <span className='visually-hidden'>Rating</span>
        </div>
      </div>
      <p className='reviews__text' data-testid="review-comment">
        {props.reviewData.comment}
      </p>
      <time className='reviews__time' dateTime={String(props.reviewData.date)} data-testid="review-time">
        {dateCreate};
      </time>
    </div>
  );
};
