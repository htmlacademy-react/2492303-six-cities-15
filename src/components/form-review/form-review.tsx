import { ChangeEvent, FC, useState } from 'react';

export const FormReview: FC = () => {
  const [formData, setFormData] = useState({
    rating: -1,
    review: ''
  });

  const handleFieldChange = (event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  };

  const raitings = [
    { value: 5, label: 'perfect'},
    { value: 4, label: 'good'},
    { value: 3, label: 'not good'},
    { value: 2, label: 'badly'},
    { value: 1, label: 'terribly'}
  ];
  return(
    <form className='reviews__form form' action='#' method='post'>
      <label className='reviews__label form__label' htmlFor='review'>
        Your review
      </label>
      <div className='reviews__rating-form form__rating'>
        {raitings.map(({ value, label }) => (
          <div key = {value}>
            <input className="form__rating-input visually-hidden" name="rating" id={`${value}-stars`} type="radio" value={value} onChange={handleFieldChange}/>
            <label className="reviews__rating-label form__rating-label" htmlFor={`${value}-stars`} title={label}>
              <svg className ="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        onChange={handleFieldChange}
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
          disabled={formData.rating < 1 || formData.review.length < 50 }
        >
          Submit
        </button>
      </div>
    </form>
  );
};
