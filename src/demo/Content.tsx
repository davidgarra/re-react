/** @jsx createElement */
import { createElement, FunctionComponent } from '@re-react';

const Content: FunctionComponent = ({ children }) => (
  <div id="content">{children}</div>
);

export default Content;
