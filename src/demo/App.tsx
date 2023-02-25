/** @jsx createElement */
import { createElement, FunctionComponent } from '@re-react';
import Content from './Content';
import Counter from './Counter';
import Footer from './Footer';
import Title from './Title';

const App: FunctionComponent = () => (
  <div id="container">
    <Content>
      <Title>{'Re-React'}</Title>
      <Counter />
    </Content>
    <Footer description="Developed by David Garra"></Footer>
  </div>
);

export default App;
