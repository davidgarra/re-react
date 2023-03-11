import type {
  ArrayElement,
  Atom,
  Element,
  NullElement,
  Props,
  TextElement,
} from './types/common';

type CreateElement = (
  type: keyof HTMLElementTagNameMap,
  props: Props,
  ...children: (Atom | Element)[]
) => Element;

const createChild = (child: Atom | Element): Element => {
  if (Array.isArray(child)) {
    return createArrayElement(child);
  } else if (child === false || child == null) {
    return createNullElement();
  } else if (typeof child === 'object') {
    return child;
  } else {
    return createTextElement(child?.toString() ?? '');
  }
};

const createElement: CreateElement = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    children: children.map(createChild),
  },
});

const createTextElement = (text: string): TextElement => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text,
    children: [],
  },
});

const createArrayElement = (child: (Atom | Element)[]): ArrayElement => ({
  type: 'ARRAY_ELEMENT',
  props: {
    children: child.map(createChild),
  },
});

const createNullElement = (): NullElement => ({
  type: 'NULL_ELEMENT',
  props: {
    children: [],
  },
});

export default createElement;
