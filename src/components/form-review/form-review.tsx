import { ChangeEvent, FC, Fragment, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { AddCommentAction } from '../../store/api-actions';
import { FormEvent } from 'react';

export type TFormReviewrops = {
  offerId?: string;
}

export const FormReview: FC<TFormReviewrops> = ({offerId}) => {
  const [formData, setFormData] = useState({
    rating: -1,
    comment: ''
  });

  const dispatch = useAppDispatch();
  const handleFieldChange = (event:ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setFormData({...formData, rating: parseInt(value, 10)});
  };

  const handleCommentChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
    const { value} = event.target;
    setFormData({...formData, comment: value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (formData) {
      dispatch(AddCommentAction({
        comment: formData.comment,
        rating: Number(formData.rating),
        offerId: offerId
      }));
      setFormData({rating:-1, comment:''});
    }
  };

  const raitings = [
    { value: 5, label: 'perfect'},
    { value: 4, label: 'good'},
    { value: 3, label: 'not good'},
    { value: 2, label: 'badly'},
    { value: 1, label: 'terribly'}
  ];
  return(
    <form className='reviews__form form' action='#' method='post' onSubmit={handleSubmit}>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        {raitings.map(({ value, label }) => (
          <Fragment key = {value}>
            <input className="form__rating-input visually-hidden" name="rating" id={`${value}-stars`} type="radio"
              onChange={handleFieldChange} value={value} checked={formData.rating === value}
            />
            <label className="reviews__rating-label form__rating-label" htmlFor={`${value}-stars`} title={label}>
              <svg className ="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='comment'
        name='comment'
        placeholder='Tell how was your stay, what you like and what can be improved'
        onChange={handleCommentChange}
        value={formData.comment}
      />
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
          To submit review please make sure to set{' '}
          <span className='reviews__star'>rating</span> and describe
          your stay with at least{' '}
          <b className='reviews__text-amount'>50 characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={formData.rating < 1 || formData.comment.length < 50 }
        >
          Submit
        </button>
      </div>
    </form>
  );
};
