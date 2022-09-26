import React, { memo } from 'react';
import cn from 'classnames';
import { AppState, TodoItem } from './todoTypes';
import { LocaleContext } from '../../context/localeContext';

type Props = {
  todoItem: TodoItem;
  toggleCompleteTodo: (todoItem: TodoItem) => void;
  deleteTodo: (todoItem: TodoItem) => void;
  updateTodoState?: AppState;
  deleteTodoState?: AppState;
};

const TodoListItem = ({
  todoItem,
  toggleCompleteTodo,
  deleteTodo,
  updateTodoState,
  deleteTodoState,
}: Props) => {
  console.log('todoList item');
  return (
    <li key={todoItem.id} className="flex items-center mx-4">
      <input
        type="checkbox"
        checked={todoItem.isDone}
        disabled={updateTodoState?.isLoading}
        onChange={() => toggleCompleteTodo(todoItem)}
        className={cn({
          'border-cyan-500 accent-slate-400': updateTodoState?.isLoading,
        })}
      />
      <p
        className="flex-1 px-4"
        style={{
          textDecoration: todoItem.isDone ? 'line-through' : 'none',
        }}
      >
        {todoItem.text}
      </p>
      <button
        type="button"
        className={cn('btn', {
          'bg-slate-400 hover:bg-slate-400 cursor-wait':
            deleteTodoState?.isLoading,
        })}
        disabled={deleteTodoState?.isLoading}
        onClick={() => deleteTodo(todoItem)}
      >
        Delete
      </button>
    </li>
  );
};

export default memo(TodoListItem);
