import { render, screen } from '@testing-library/react';
import { ReviewsInfo } from './reviews_info';

describe('Component: Mistakes', () => {
  it('should render correct', () => {
    render(<ReviewsInfo reviewData={{id:'1',date: new Date(), user: {email:'', name:'', avatarUrl:'', isPro:false}, comment:'', rating:1}}/>);
    const reviewComment = screen.getByTestId('review-comment');
    const reviewTime = screen.getByTestId('review-time');

    expect(reviewComment).toBeInTheDocument();
    expect(reviewTime).toBeInTheDocument();
  });
});
