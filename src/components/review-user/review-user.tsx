import { FC } from 'react';

export type TReviewsUserProps = {
  img: string;
  name: string;
  rating: number;
}

export const ReviewUser: FC<TReviewsUserProps> = (props) => (
  <>
    <div className='reviews__avatar-wrapper user__avatar-wrapper'>
      <img
        className='reviews__avatar user__avatar'
        src={props.img}
        width={54}
        height={54}
        alt='Reviews avatar'
      />
    </div>
    <span className='reviews__user-name'>{props.name}</span>
    <div className='reviews__rating rating'>
      <div className='reviews__stars rating__stars'>
        <span style={{ width: `${Math.round(Number(props?.rating)) * 20 }%`}} />
        <span className='visually-hidden'>Rating</span>
      </div>
    </div>
  </>
);
