/** @jsx createElement */
import {
  createElement,
  FunctionComponent,
  useEffect,
  useState,
} from '@re-react';

const Counter: FunctionComponent = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('%c Counter Mount', 'color: green');
    return () => {
      console.log('%c Counter Unmount', 'color: green');
    };
  }, []);

  useEffect(() => {
    console.log('%c Counter Value: ' + counter, 'color: yellow');
  }, [counter]);

  return (
    <div>
      <p>{counter}</p>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        {'+'}
      </button>{' '}
      <button
        onClick={() => {
          setCounter((state) => state - 1);
        }}
      >
        {'-'}
      </button>
    </div>
  );
};

export default Counter;
