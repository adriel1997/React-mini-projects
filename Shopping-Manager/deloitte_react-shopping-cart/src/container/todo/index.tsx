import React, { useContext, useEffect } from 'react';
import { TodoContext } from '../../context/todoContext';
import TodoFilter from './todoFilter';
import TodoForm from './todoForm';
import TodoList from './todoList';

type Props = {};

const Todo = (props: Props) => {
  const {
    loadTodo,
    filterType,
    todoList,
    addTodo,
    toggleCompleteTodo,
    deleteTodo,
  } = useContext(TodoContext);

  useEffect(() => {
    loadTodo();
  }, []);

  return (
    <div className="flex flex-col h-screen items-center">
      <h1 className="text-4xl font-semibold py-4">Todo Application</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todoList={todoList}
        toggleCompleteTodo={toggleCompleteTodo}
        deleteTodo={deleteTodo}
      />
      <TodoFilter filterType={filterType} loadTodo={loadTodo} />
    </div>
  );
};

export default Todo;

// import React, {
//   useEffect,
//   useState,
//   useRef,
//   FormEvent,
//   useCallback,
//   useMemo,
// } from 'react';
// import { LocaleProvider } from '../../context/localeContext';
// import useAppState from '../../hooks/useAppState';
// import TodoFilterMemo from './todoFilter';
// import TodoFormMemo from './todoForm';
// import TodoListMemo from './todoList';
// import { AppState, FilterType, TodoAppType, TodoItem } from './todoTypes';

// type Props = {};

// const Todo = (props: Props) => {
//   const [todoList, setTodoList] = useState<TodoItem[]>([]);
//   const [filterType, setFilterType] = useState<FilterType>(FilterType.all);
//   const {
//     setLoadingState,
//     setSuccessState,
//     setErrorState,
//     fetchState,
//     filterState,
//     removeError,
//     errors,
//   } = useAppState();

//   const todoInputRef = useRef<HTMLInputElement>(null);

//   const loadTodos = useCallback(async (ft: FilterType) => {
//     const type = TodoAppType.FETCH_TODO;
//     try {
//       setLoadingState(type);
//       let url = 'http://localhost:3000/todoList';

//       if (ft !== FilterType.all) {
//         url = `${url}?isDone=${ft === FilterType.complete}`;
//       }

//       const res = await fetch(url);
//       const todoList = await res.json();
//       setTodoList(todoList);
//       setFilterType(ft);
//       setSuccessState(type);
//     } catch (error) {
//       setErrorState(type, error);
//     }
//   }, []);

//   const addTodo = useCallback(async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const type = TodoAppType.ADD_TODO;

//     try {
//       const todoInput = todoInputRef.current;
//       setLoadingState(type);

//       const res = await fetch('http://localhost:3000/todoList', {
//         method: 'POST',
//         body: JSON.stringify({
//           text: todoInput?.value || '',
//           isDone: false,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });

//       const todoItem: TodoItem = await res.json();

//       if (todoInput) {
//         setTodoList((val) => {
//           return [...val, todoItem];
//         });
//         todoInput.value = '';
//         setSuccessState(type);
//       }
//     } catch (error) {
//       setErrorState(type, error);
//     }
//   }, []);

//   const toggleCompleteTodo = useCallback(async (item: TodoItem) => {
//     const type = TodoAppType.UPDATE_TODO;
//     try {
//       setLoadingState(type, item.id);
//       const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
//         method: 'PUT',
//         body: JSON.stringify({ ...item, isDone: !item.isDone }),
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });

//       const todoItem: TodoItem = await res.json();

//       setTodoList((val) => {
//         const index = val.findIndex((x) => x.id === item.id);
//         return [...val.slice(0, index), todoItem, ...val.slice(index + 1)];
//       });

//       setSuccessState(type, item.id);
//     } catch (error) {
//       setErrorState(type, error, item.id);
//     }
//   }, []);

//   const deleteTodo = useCallback(async (item: TodoItem) => {
//     const type = TodoAppType.DELETE;
//     try {
//       setLoadingState(type, item.id);
//       await fetch(`http://localhost:3000/todoList/${item.id}`, {
//         method: 'DELETE',
//       });

//       setTodoList((val) => {
//         const index = val.findIndex((x) => x.id === item.id);
//         return [...val.slice(0, index), ...val.slice(index + 1)];
//       });

//       setSuccessState(type, item.id);
//     } catch (error) {
//       setErrorState(type, error, item.id);
//     }
//   }, []);

//   const filterTodos = useCallback((filterType: FilterType) => {
//     loadTodos(filterType);
//   }, []);

//   useEffect(() => {
//     loadTodos(FilterType.all);
//   }, []);

//   const fetchTodoState = useMemo(
//     () => fetchState(TodoAppType.FETCH_TODO),
//     [fetchState],
//   );

//   const addTodoState = useMemo(
//     () => fetchState(TodoAppType.ADD_TODO),
//     [fetchState],
//   );

//   const updateTodoState = useMemo(
//     () => filterState(TodoAppType.UPDATE_TODO),
//     [filterState],
//   );

//   const deleteTodoState = useMemo(
//     () => filterState(TodoAppType.DELETE),
//     [filterState],
//   );

//   console.log(addTodoState);

//   if (fetchTodoState && fetchTodoState.isLoading) {
//     return (
//       <div className="h-screen flex justify-center items-center">
//         <h1 className="text-4xl font-semibold text-red-400">Loading....</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen items-center">
//       <h1 className="text-4xl font-semibold py-4">Todo Application</h1>
//       <TodoFormMemo
//         addTodo={addTodo}
//         ref={todoInputRef}
//         addTodoState={addTodoState}
//       />
//       <TodoListMemo
//         toggleCompleteTodo={toggleCompleteTodo}
//         deleteTodo={deleteTodo}
//         todoList={todoList}
//         updateTodoState={updateTodoState}
//         deleteTodoState={deleteTodoState}
//       />
//       <TodoFilterMemo filterTodos={filterTodos} filterType={filterType} />;
//       <div className="w-full">
//         {errors.map((x, i) => (
//           <div
//             key={x.id}
//             role="alert"
//             className="p-4 fixed right-0 max-w-screen-sm min-w-[320px]"
//             style={{
//               top: 100 * i,
//             }}
//           >
//             <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 flex justify-between">
//               <span>Danger</span>
//               <button type="button" onClick={() => removeError(x)}>
//                 X
//               </button>
//             </div>
//             <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
//               <p>{x.errorMessage}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Todo;

// import React, { Component, ChangeEvent, FormEvent, createRef } from 'react';
// import TodoFilter from './todoFilter';
// import TodoForm from './todoForm';
// import TodoList from './todoList';
// import { AppState, FilterType, TodoAppType, TodoItem } from './todoTypes';

// type Props = {};

// type State = {
//   todoList: TodoItem[];
//   filterType: FilterType;
//   error?: Error;
//   appState: AppState[];
// };

// const Todo =  () => {
//   state: State = {
//     todoList: [],
//     filterType: FilterType.all,
//     error: undefined,
//     appState: [],
//   };

//   todoInputRef = createRef<HTMLInputElement>();

//   // async componentDidMount() {
//   //   this.loadTodo(FilterType.all);
//   // }

//   const loadTodo = async (filterType: FilterType) => {

//     const type = TodoAppType.FETCH_TODO;
//     this.setLoadingState(type);
//     try {
//       let url = 'http://localhost:3000/todoList';

//       if (filterType !== FilterType.all) {
//         url = `${url}?isDone=${filterType === FilterType.complete}`;
//       }

//       const res = await fetch(url);
//       const todoList = await res.json();
//       this.setState({ todoList, filterType });
//       this.setSuccessState(type);
//     } catch (error) {
//       this.setErrorState(type, error);
//     }
//   };

//   const addTodo = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const type = TodoAppType.ADD_TODO;

//     try {
//       const todoInput = this.todoInputRef.current;
//       this.setLoadingState(type);

//       const res = await fetch('http://localhost:3000/todoList', {
//         method: 'POST',
//         body: JSON.stringify({
//           text: todoInput?.value || '',
//           isDone: false,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });

//       const todoItem: TodoItem = await res.json();

//       if (todoInput) {
//         this.setState(
//           ({ todoList }) => {
//             return {
//               todoList: [...todoList, todoItem],
//             };
//           },
//           () => {
//             todoInput.value = '';
//             this.setSuccessState(type);
//           },
//         );
//       }
//     } catch (error) {
//       this.setErrorState(type, error);
//     }
//   };

//   const toggleCompleteTodo = async (item: TodoItem) => {
//     const type = TodoAppType.UPDATE_TODO;
//     try {
//       this.setLoadingState(type, item.id);
//       const res = await fetch(`http://localhost:3000/todoList/${item.id}`, {
//         method: 'PUT',
//         body: JSON.stringify({ ...item, isDone: !item.isDone }),
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });

//       const todoItem: TodoItem = await res.json();

//       this.setState(({ todoList }, props) => {
//         const index = todoList.findIndex((x) => x.id === item.id);

//         return {
//           todoList: [
//             ...todoList.slice(0, index),
//             todoItem,
//             ...todoList.slice(index + 1),
//           ],
//         };
//       });
//       this.setSuccessState(type, item.id);
//     } catch (error) {
//       this.setErrorState(type, error, item.id);
//     }
//   };

//   const deleteTodo = async (item: TodoItem) => {
//     const type = TodoAppType.DELETE;
//     try {
//       this.setLoadingState(type, item.id);
//       await fetch(`http://localhost:3000/todoList/${item.id}`, {
//         method: 'DELETE',
//       });

//       this.setState(({ todoList }, props) => {
//         const index = todoList.findIndex((x) => x.id === item.id);
//         return {
//           todoList: [...todoList.slice(0, index), ...todoList.slice(index + 1)],
//         };
//       });
//       this.setSuccessState(type, item.id);
//     } catch (error) {
//       this.setErrorState(type, error, item.id);
//     }
//   };

//   const filterTodos = (filterType: FilterType) => {
//     this.loadTodo(filterType);
//   };

//   const removeError = (error: AppState) => {
//     this.setState(({ appState }) => {
//       return { appState: appState.filter((x) => x.id !== error.id) };
//     });
//   };

//   render() {
//     const { error, todoList, filterType, appState } = this.state;

//     const fetchTodoState = appState.find(
//       (x) => x.type === TodoAppType.FETCH_TODO,
//     );

//     const addTodoState = appState.find((x) => x.type === TodoAppType.ADD_TODO);

//     const updateTodoState = appState.filter(
//       (x) => x.type === TodoAppType.UPDATE_TODO,
//     );

//     const deleteTodoState = appState.filter(
//       (x) => x.type === TodoAppType.DELETE,
//     );

//     const errors = appState.filter((x) => x.hasError);

//     if (fetchTodoState && fetchTodoState.isLoading) {
//       return (
//         <div className="h-screen flex justify-center items-center">
//           <h1 className="text-4xl font-semibold text-red-400">Loading....</h1>
//         </div>
//       );
//     }

//     return (
//       <div className="flex flex-col h-screen items-center">
//         <h1 className="text-4xl font-semibold py-4">Todo Application</h1>
//         <TodoForm
//           addTodo={this.addTodo}
//           ref={this.todoInputRef}
//           addTodoState={addTodoState}
//         />

//         <TodoList
//           toggleCompleteTodo={this.toggleCompleteTodo}
//           deleteTodo={this.deleteTodo}
//           todoList={todoList}
//           updateTodoState={updateTodoState}
//           deleteTodoState={deleteTodoState}
//         />
//         <TodoFilter filterTodos={this.filterTodos} filterType={filterType} />

//         <div className="w-full">
//           {errors.map((x, i) => (
//             <div
//               key={x.id}
//               role="alert"
//               className="p-4 fixed right-0 max-w-screen-sm min-w-[320px]"
//               style={{
//                 top: 100 * i,
//               }}
//             >
//               <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 flex justify-between">
//                 <span>Danger</span>
//                 <button type="button" onClick={() => this.removeError(x)}>
//                   X
//                 </button>
//               </div>
//               <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
//                 <p>{x.errorMessage}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default Todo;
