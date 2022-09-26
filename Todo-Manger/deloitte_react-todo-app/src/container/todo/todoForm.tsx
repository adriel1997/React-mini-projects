import React, { useRef, useContext, memo } from 'react';
import cn from 'classnames';
import { AppState } from './todoTypes';
import { LocaleContext } from '../../context/localeContext';
import { TodoContext } from '../../context/todoContext';

type Props = {
  addTodo: (value?: string) => void;
};

const TodoForm = ({ addTodo }: Props) => {
  console.log('TodoForm Render');
  const todoInputRef = useRef<HTMLInputElement>(null);
  // const { addTodo } = useContext(TodoContext);

  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(todoInputRef.current?.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="todoInput" hidden>
        Todo Text
      </label>
      <input
        type="text"
        ref={todoInputRef}
        id="todoInput"
        required
        placeholder="write yout todo here.."
      />
      <button
        // disabled={addTodoState?.isLoading}
        className={cn('btn rounded-l-none', {
          // 'bg-slate-400 hover:bg-slate-400 cursor-wait':
          //   addTodoState?.isLoading,
        })}
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
};

export default memo(TodoForm);
