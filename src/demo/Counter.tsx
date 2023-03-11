/** @jsx createElement */
import {
  createElement,
  FunctionComponent,
  useEffect,
  useState,
} from '@re-react';

function shuffle<T>(array: T[]) {
  return array.sort(() => Math.random() - 0.5);
}

const inputList = [
  <input key="uno" type="text" name="uno" placeholder="uno" />,
  <input key="due" type="text" name="due" placeholder="due" />,
  <input key="tre" type="text" name="tre" placeholder="tre" />,
];

const list = shuffle([0, 1, 2]).map((index) => inputList[index]);

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
      {shuffle([0, 1, 2]).map((index) => inputList[index])}
    </div>
  );
};

export default Counter;
