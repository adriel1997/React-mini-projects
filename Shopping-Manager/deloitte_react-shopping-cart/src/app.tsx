import React from 'react';
import Todo from './container/todo';
import { LocaleProvider } from './context/localeContext';
import { TodoProvider } from './context/todoContext';

type Props = {};

function App({}: Props) {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  );
}

export default App;

// import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
// import useCounter from './hooks/useCounter';

// const Child = ({ increment, obj }) => {
//   console.log('Child component');

//   // useEffect(() => {
//   //   const mouseMove = () => {
//   //     console.log('mouse move');
//   //   };

//   //   document.addEventListener('mousemove', mouseMove);

//   //   const interval = setInterval(() => {
//   //     console.log('interval');
//   //   }, 1000);

//   //   // componetWillUnmount
//   //   return () => {
//   //     document.removeEventListener('mousemove', mouseMove);
//   //     clearInterval(interval);
//   //   };
//   // }, []);

//   return (
//     <div>
//       <h1>{obj.a}</h1>
//       <h2>{obj.b}</h2>
//       <button onClick={increment}>Increment Counter</button>
//     </div>
//   );
// };

// const MemoChild = memo(Child, (prevProps, nextProps) => {
//   console.log('prevProps', prevProps);
//   console.log('nextProps', nextProps);

//   return false;
// });

// type Props = {};

// function App({}: Props) {
//   const { counter, increment, decrement } = useCounter();
//   const {
//     counter: value,
//     increment: incrementValue,
//     decrement: decrementValue,
//   } = useCounter();
//   // const [hasMounted, setHasMounted] = useState(false);

//   const h1Ref = useRef<HTMLHeadingElement>(null);
//   const hasMounted = useRef<boolean>(false);

//   // ComponentDidMount
//   // ComponentDidUpdate
//   useEffect(() => {
//     if (hasMounted.current) {
//       // const h1 = h1Ref.current;
//       // console.log(h1);
//       console.log('use Effect with value');
//     }
//   }, [value]);

//   // ComponentDidMount
//   useEffect(() => {
//     // const h1 = h1Ref.current;
//     // console.log(h1);
//     console.log('use Effect');
//     hasMounted.current = true;
//     // setHasMounted(true);
//   }, []);

//   const obj = { a: 1, b: 2 };

//   return (
//     <>
//       <h1 ref={h1Ref}>Heading</h1>
//       <div className="flex">
//         <button type="button" className="btn" onClick={increment}>
//           +
//         </button>
//         <p className="font-semibold text-4xl px-4">{counter}</p>
//         <button type="button" className="btn" onClick={decrement}>
//           -
//         </button>
//       </div>
//       <div className="flex">
//         <button type="button" className="btn" onClick={incrementValue}>
//           +
//         </button>
//         <p className="font-semibold text-4xl px-4">{value}</p>
//         <button type="button" className="btn" onClick={decrementValue}>
//           -
//         </button>
//       </div>
//       {counter < 5 && <MemoChild increment={increment} obj={obj} />}
//     </>
//   );
// }

// export default App;
