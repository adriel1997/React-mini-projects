export enum FilterType {
  all = 'all',
  pending = 'pending',
  complete = 'complete',
}

export enum TodoAppType {
  FETCH_TODO = 'FETCH_TODO',
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE = 'DELETE',
}

export type TodoItem = {
  id: number;
  text: string;
  isDone: boolean;
};

export type AppState = {
  type: TodoAppType;
  isLoading: boolean;
  hasError?: boolean;
  errorMessage?: string;
  id: number;
};

export type TodoStateData = {
  todoList: TodoItem[];
  appState: AppState[];
  filterType: FilterType;
};
