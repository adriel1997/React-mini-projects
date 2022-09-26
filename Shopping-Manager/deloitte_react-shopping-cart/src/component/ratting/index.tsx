import React from 'react';
import cn from 'classnames';
import { StarIcon } from '@heroicons/react/20/solid';

type Props = {
  rate: number;
  count: number;
  displayReviewCount?: boolean;
};

const Ratting = ({ rate, count, displayReviewCount }: Props) => {
  return (
    <div>
      <h4 className="sr-only">Reviews</h4>
      <div className="flex items-center">
        <div className="flex items-center">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              data-testid="rating-icon"
              key={rating}
              className={cn('h-5 w-5 flex-shrink-0', {
                'text-orange-500': Math.round(rate) > rating,
                'text-orange-100': Math.round(rate) <= rating,
              })}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">{rate} out of 5 stars</p>
        {displayReviewCount && (
          <a
            data-testid="reviews-count"
            href="#"
            className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {count} reviews
          </a>
        )}
      </div>
    </div>
  );
};

export default Ratting;
