import type { Element, Props, TextElement } from './types/common';

type CreateElement = (
  type: keyof HTMLElementTagNameMap,
  props: Props,
  ...children: Array<string | boolean | number | Element>
) => Element;

const createElement: CreateElement = (type, props, ...children): Element => ({
  type,
  props: {
    ...props,
    children: children.flatMap((child) => {
      if (child === false || child == null) return [];
      if (typeof child === 'object') return child;
      return createTextElement(child.toString());
    }),
  },
});

const createTextElement = (text: string): TextElement => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text,
  },
});

export default createElement;
