import React, { memo } from 'react';
import cn from 'classnames';
import { FilterType } from './todoTypes';

type Props = {
  filterType: FilterType;
  loadTodo: (value?: FilterType) => void;
};

const TodoFilter = ({ filterType, loadTodo }: Props) => {
  console.log('TodoFilter Render');
  const handleFilter = (event) => {
    loadTodo(event.target.name);
  };

  const btnClass = (ft: FilterType) => {
    return cn('btn rounded-none flex-1', {
      'bg-orange-500 hover:bg-orange-700 focus:ring-orange-400':
        filterType === ft,
    });
  };

  return (
    <div className="flex w-full">
      <button
        className={btnClass(FilterType.all)}
        type="button"
        name={FilterType.all}
        onClick={handleFilter}
      >
        All
      </button>
      <button
        className={btnClass(FilterType.pending)}
        type="button"
        name={FilterType.pending}
        onClick={handleFilter}
      >
        Pending
      </button>
      <button
        className={btnClass(FilterType.complete)}
        type="button"
        name={FilterType.complete}
        onClick={handleFilter}
      >
        Completed
      </button>
    </div>
  );
};

export default memo(TodoFilter);
