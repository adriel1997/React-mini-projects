import { useCallback, useState } from 'react';

const useCounter = () => {
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => {
    setCounter((val) => val + 1);
  }, []);

  const decrement = useCallback(() => {
    setCounter((val) => val - 1);
  }, []);

  return {
    counter,
    increment,
    decrement,
  };
};

export default useCounter;
