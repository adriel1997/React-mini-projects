import React, {
  createContext,
  PropsWithChildren,
  useReducer,
  useState,
} from 'react';

type LocaleContextType = {
  locale: string;
  dispatch: React.Dispatch<{
    type: any;
    payload?: any;
  }>;
};

export const LocaleContext = createContext<LocaleContextType>({
  locale: 'english',
  dispatch: () => {},
});

const LocaleReducer = (state, { type }) => {
  switch (type) {
    case 'CHANGE_LOCALE':
      return state === 'english' ? 'french' : 'english';

    default:
      return state;
  }
};

export const LocaleProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(LocaleReducer, 'English');

  return (
    <LocaleContext.Provider value={{ locale: state, dispatch }}>
      {children}
    </LocaleContext.Provider>
  );
};
