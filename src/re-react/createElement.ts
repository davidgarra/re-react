import type { Children, Element, Props } from './types/common';

type CreateElement = (
  type: keyof HTMLElementTagNameMap,
  props: Props,
  ...children: Children
) => Element;

const createElement: CreateElement = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    children: children.flatMap((child) =>
      typeof child === 'object' || child === false ? child : createTextElement(child),
    ),
  },
});

const createTextElement = (text: string) => ({
  type: 'TEXT_ELEMENT' as const,
  props: {
    nodeValue: text,
    children: [],
  },
});

export default createElement;
