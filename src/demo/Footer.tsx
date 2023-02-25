/** @jsx createElement */
import { createElement, FunctionComponent } from '@re-react';

type Props = {
  description: string;
  className?: string;
};

const Footer: FunctionComponent<Props> = ({ description, className }) => (
  <span className={className}>{description}</span>
);

export default Footer;
