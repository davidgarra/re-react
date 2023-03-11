import type {
  ArrayElement,
  Atom,
  Element,
  HtmlElement,
  NullElement,
  Props,
  TextElement,
} from './types/common';

type CreateElement = (
  type: keyof HTMLElementTagNameMap,
  props: Props,
  ...children: (Atom | Element)[]
) => Element;

// TODO fare in modo che ritorni un HtmlElement in caso di HtmlElement come input
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

const createArrayElement = (child: HtmlElement[]): ArrayElement => ({
  type: 'ARRAY_ELEMENT',
  props: {
    children: child.map(
      (c, idx) =>
        createChild({
          ...c,
          props: { key: idx.toString(), ...c.props },
        }) as HtmlElement, // TODO fare in modo che ritorni un HtmlElement in caso di HtmlElement come input
    ),
  },
});

const createNullElement = (): NullElement => ({
  type: 'NULL_ELEMENT',
  props: {
    children: [],
  },
});

export default createElement;
