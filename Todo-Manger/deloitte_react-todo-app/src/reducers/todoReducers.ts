import {
  FilterType,
  TodoAppType,
  TodoItem,
  TodoStateData,
} from '../container/todo/todoTypes';

export const todoInitialState = {
  todoList: [],
  appState: [],
  filterType: FilterType.all,
};

type RequestType = {
  type: TodoAppType;
  id: number;
};

type FailType = {
  type: TodoAppType;
  id: number;
  error: Error;
};

type LoadTodoRequestType = {
  type: 'LOAD_TODO_REQUEST';
  payload: RequestType;
};

type AddTodoRequestType = {
  type: 'ADD_TODO_REQUEST';
  payload: RequestType;
};

type UpdateTodoRequestType = {
  type: 'UPDATE_TODO_REQUEST';
  payload: RequestType;
};

type DeleteTodoRequestType = {
  type: 'DELETE_TODO_REQUEST';
  payload: RequestType;
};

type LoadTodoSuccessType = {
  type: 'LOAD_TODO_SUCCESS';
  payload: { todoList: TodoItem[]; filterType: FilterType };
};

type AddTodoSuccessType = { type: 'ADD_TODO_SUCCESS'; payload: TodoItem };

type UpdateTodoSuccessType = { type: 'UPDATE_TODO_SUCCESS'; payload: TodoItem };

type DeleteTodoSuccessType = { type: 'DELETE_TODO_SUCCESS'; payload: TodoItem };

type AddTodoFailType = { type: 'ADD_TODO_FAIL'; payload: FailType };

type UpdateTodoFailType = { type: 'UPDATE_TODO_FAIL'; payload: FailType };

type DeleteTodoFailType = { type: 'DELETE_TODO_FAIL'; payload: FailType };

type LoadTodoFailType = { type: 'LOAD_TODO_FAIL'; payload: FailType };

type TodoReducerType =
  | AddTodoRequestType
  | AddTodoSuccessType
  | AddTodoFailType
  | UpdateTodoRequestType
  | DeleteTodoRequestType
  | UpdateTodoSuccessType
  | UpdateTodoFailType
  | DeleteTodoFailType
  | DeleteTodoSuccessType
  | LoadTodoRequestType
  | LoadTodoSuccessType
  | LoadTodoFailType;

export default (state: TodoStateData, { type, payload }: TodoReducerType) => {
  switch (type) {
    case 'LOAD_TODO_REQUEST':
    case 'ADD_TODO_REQUEST':
    case 'UPDATE_TODO_REQUEST':
    case 'DELETE_TODO_REQUEST': {
      return {
        ...state,
        appState: [
          ...state.appState,
          {
            type: payload.type,
            isLoading: true,
            hasError: false,
            id: payload.id,
          },
        ],
      };
    }

    case 'LOAD_TODO_SUCCESS': {
      return {
        todoList: payload.todoList,
        filterType: payload.filterType,
        appState: state.appState.filter(
          (x) => x.type !== TodoAppType.FETCH_TODO,
        ),
      };
    }

    case 'ADD_TODO_SUCCESS': {
      return {
        ...state,
        todoList: [...state.todoList, payload],
        appState: state.appState.filter((x) => x.type !== TodoAppType.ADD_TODO),
      };
    }

    case 'UPDATE_TODO_SUCCESS': {
      const index = state.todoList.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        todoList: [
          ...state.todoList.slice(0, index),
          payload,
          ...state.todoList.slice(index + 1),
        ],
        appState: state.appState.filter(
          (x) => !(x.type === TodoAppType.UPDATE_TODO && x.id === payload.id),
        ),
      };
    }

    case 'DELETE_TODO_SUCCESS': {
      const index = state.todoList.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        todoList: [
          ...state.todoList.slice(0, index),
          ...state.todoList.slice(index + 1),
        ],
        appState: state.appState.filter(
          (x) => !(x.type === TodoAppType.UPDATE_TODO && x.id === payload.id),
        ),
      };
    }

    case 'LOAD_TODO_FAIL':
    case 'ADD_TODO_FAIL':
    case 'UPDATE_TODO_FAIL':
    case 'DELETE_TODO_FAIL': {
      return {
        ...state,
        appState: state.appState.map((x) => {
          if (x.type === payload.type && x.id === payload.id) {
            return {
              ...x,
              isLoading: false,
              hasError: true,
              errorMessage: payload.error.message,
            };
          }
          return x;
        }),
      };
    }

    default:
      return state;
  }
};
