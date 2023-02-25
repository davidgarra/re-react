/** @jsx createElement */
import { createElement } from '@re-react';
import type { FunctionComponent } from 'src/re-react/types/common';

const Title: FunctionComponent = ({ children }) => <h1>{children}</h1>;

export default Title;
