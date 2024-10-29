import { render, createElement } from '@re-react';
import App from './App';

const element = <App />;
const container = document.getElementById('root');
if (container != null) render(element, container);
