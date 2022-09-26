import { useCallback, useMemo, useState } from 'react';
import { AppState, TodoAppType } from '../container/todo/todoTypes';

const useAppState = () => {
  const [appState, setAppState] = useState<AppState[]>([]);

  const setLoadingState = useCallback((type: TodoAppType, id: number = -1) => {
    setAppState((val) => {
      return [...val, { type, isLoading: true, hasError: false, id }];
    });
  }, []);

  const setSuccessState = useCallback((type: TodoAppType, id: number = -1) => {
    setAppState((val) => {
      return val.filter((x) => !(x.type === type && x.id === id));
    });
  }, []);

  const setErrorState = useCallback(
    (type: TodoAppType, error: Error, id: number = -1) => {
      setAppState((val) => {
        return val.map((x) => {
          if (x.type === type && x.id === id) {
            return {
              ...x,
              isLoading: false,
              hasError: true,
              errorMessage: error.message,
            };
          }
          return x;
        });
      });
    },
    [],
  );

  const removeError = useCallback((error: AppState) => {
    setAppState((val) => val.filter((x) => x.id !== error.id));
  }, []);

  const fetchState = useCallback(
    (type: any) => {
      return appState.find((x) => x.type === type);
    },
    [appState],
  );

  const filterState = useCallback(
    (type: any) => {
      return appState.filter((x) => x.type === type);
    },
    [appState],
  );

  const errors = useMemo(() => appState.filter((x) => x.hasError), [appState]);

  return {
    setLoadingState,
    setSuccessState,
    setErrorState,
    fetchState,
    filterState,
    removeError,
    errors,
  };
};

export default useAppState;
