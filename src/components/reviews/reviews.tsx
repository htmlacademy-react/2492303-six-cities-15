import { FC, useEffect } from 'react';
import { ReviewsList } from './reviews_list';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchOfferCommentsAction } from '../../store/api-actions';
import { makeSortedReviews } from '../../store/offer-process/selectors';


export const Reviews: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const reviewsData = useAppSelector(makeSortedReviews);

  useEffect (() => {
    if (params.id) {
      dispatch(fetchOfferCommentsAction(params.id));
    }
  }, [dispatch, params.id]);

  return (
    <div>
      <h2 className='reviews__title'>
      Reviews · <span className='reviews__amount'>{reviewsData?.length}</span>
      </h2>
      <ReviewsList ReviewsData = {reviewsData}/>
    </div>
  );
};
