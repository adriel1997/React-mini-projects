import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
} from 'react';
import {
  AppState,
  FilterType,
  TodoAppType,
  TodoItem,
  TodoStateData,
} from '../container/todo/todoTypes';
import todoReducers, { todoInitialState } from '../reducers/todoReducers';

export type TodoContextType = {
  loadTodo: (value?: FilterType) => void;
  addTodo: (value?: string) => void;
  toggleCompleteTodo: (item: TodoItem) => void;
  deleteTodo: (item: TodoItem) => void;
} & TodoStateData;

export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  appState: [],
  filterType: FilterType.all,
  loadTodo: () => {},
  addTodo: () => {},
  toggleCompleteTodo: () => {},
  deleteTodo: () => {},
});

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(todoReducers, todoInitialState);

  const loadTodo = useCallback(
    async (filterType: FilterType = FilterType.all) => {
      const type = TodoAppType.FETCH_TODO;
      try {
        dispatch({
          type: 'LOAD_TODO_REQUEST',
          payload: {
            type,
            id: -1,
          },
        });

        let url = 'http://localhost:3000/todoList';

        if (filterType !== FilterType.all) {
          url = `${url}?isDone=${filterType === FilterType.complete}`;
        }

        const res = await fetch(url);

        const todoList: TodoItem[] = await res.json();

        dispatch({
          type: 'LOAD_TODO_SUCCESS',
          payload: { todoList, filterType },
        });
      } catch (error) {
        dispatch({
          type: 'LOAD_TODO_FAIL',
          payload: {
            id: -1,
            type,
            error,
          },
        });
      }
    },
    [],
  );

  const addTodo = useCallback(async (text) => {
    const type = TodoAppType.ADD_TODO;
    try {
      dispatch({
        type: 'ADD_TODO_REQUEST',
        payload: {
          type,
          id: -1,
        },
      });

      const res = await fetch('http://localhost:3000/todoList', {
        method: 'POST',
        body: JSON.stringify({
          text,
          isDone: false,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const todoItem: TodoItem = await res.json();

      dispatch({ type: 'ADD_TODO_SUCCESS', payload: todoItem });
    } catch (error) {
      dispatch({
        type: 'ADD_TODO_FAIL',
        payload: {
          id: -1,
          type,
          error,
        },
      });
    }
  }, []);

  const toggleCompleteTodo = useCallback(async (item: TodoItem) => {
    const type = TodoAppType.UPDATE_TODO;
    try {
      dispatch({
        type: 'UPDATE_TODO_REQUEST',
        payload: {
          type,
          id: item.id,
        },
      });

      const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...item,
          isDone: !item.isDone,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      const todoItem: TodoItem = await res.json();

      dispatch({ type: 'UPDATE_TODO_SUCCESS', payload: todoItem });
    } catch (error) {
      dispatch({
        type: 'ADD_TODO_FAIL',
        payload: {
          type,
          id: item.id,
          error,
        },
      });
    }
  }, []);

  const deleteTodo = useCallback(async (item: TodoItem) => {
    const type = TodoAppType.DELETE;
    try {
      dispatch({
        type: 'DELETE_TODO_REQUEST',
        payload: {
          type,
          id: item.id,
        },
      });

      await fetch(`http://localhost:3000/todoList/${item.id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'DELETE_TODO_SUCCESS', payload: item });
    } catch (error) {
      dispatch({
        type: 'DELETE_TODO_FAIL',
        payload: {
          type,
          id: item.id,
          error,
        },
      });
    }
  }, []);

  const value = useMemo(
    () => ({ ...state, addTodo, toggleCompleteTodo, deleteTodo, loadTodo }),
    [state],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
