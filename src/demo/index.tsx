import { render, createElement } from '@re-react';
import App from './App';
// import App from './App';

// const init = () => {
//   const container = document.getElementById('root');
//   if (container == null) return;

//   render(App, container);
// };

// init();

/** @jsx createElement */

const element = <App />;
const container = document.getElementById('root');
if (container != null) render(element, container);
