import React from 'react';
import Rating from '..';
import { render, screen } from '@testing-library/react';

const setup = ({ ...params }) => {
  const props = {
    rate: 3.9,
    count: 3000,
  };
  render(<Rating {...props} {...params} />);
};

describe('test Rating Component', () => {
  beforeEach(() => {
    setup({});
  });

  test('should render Rating Component', () => {
    const h4 = screen.queryByRole('heading');
    expect(h4).toBeInTheDocument();
    expect(h4?.innerHTML).toBe('Reviews');
  });

  test('should display proper rating star', () => {
    const stars = screen.queryAllByTestId('rating-icon');
    expect(stars.length).toBe(5);
    for (let i = 0; i < stars.length - 1; i++) {
      const element = stars[i];
      expect(element).toHaveClass('text-orange-500');
    }
    expect(stars.at(-1)).toHaveClass('text-orange-100');
  });

  test('should display reviewCount', () => {
    const reviewLink = screen.queryByTestId('reviews-count');
    expect(reviewLink).toBeNull();
    setup({ displayReviewCount: true });
    const reviewLink1 = screen.queryByTestId('reviews-count');
    expect(reviewLink1).toBeInTheDocument();
  });
});
