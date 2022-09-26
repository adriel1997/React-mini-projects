import React, { memo, useContext } from 'react';
import { TodoContext } from '../../context/todoContext';
import TodoListItem from './todoListItem';
import { AppState, FilterType, TodoItem } from './todoTypes';

type Props = {
  todoList: TodoItem[];
  toggleCompleteTodo: (todoItem: TodoItem) => void;
  deleteTodo: (todoItem: TodoItem) => void;
};

const TodoList = ({ todoList, toggleCompleteTodo, deleteTodo }: Props) => {
  console.log('TodoList render');

  return (
    <ul className="w-full flex flex-col gap-4 flex-1">
      {todoList.map((todoItem) => {
        return (
          <TodoListItem
            key={todoItem.id}
            todoItem={todoItem}
            deleteTodo={deleteTodo}
            toggleCompleteTodo={toggleCompleteTodo}
            // updateTodoState={unde}
            // deleteTodoState={deleteTodoItemState}
          />
        );
      })}
    </ul>
  );
};

export default memo(TodoList);
