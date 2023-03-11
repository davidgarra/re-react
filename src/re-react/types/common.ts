import type { Hook } from '../hooks';

export type Props<P = {}> = { [K in keyof P]: P[K] } & { key?: string };

export type Child = Element | Element[];

export type PropsWithChildren<P = {}> = Props<P> & { children?: Child[] };

export type HtmlElement = {
  type: keyof HTMLElementTagNameMap;
  props: PropsWithChildren;
};

export type TextElement = {
  type: 'TEXT_ELEMENT';
  props: {
    nodeValue: string;
    children: never[];
  };
};

export type ArrayElement = {
  type: 'ARRAY_ELEMENT';
  props: {
    children: Child[];
  };
};

export type NullElement = {
  type: 'NULL_ELEMENT';
  props: {
    children: never[];
  };
};

export type Element = HtmlElement | TextElement | ArrayElement | NullElement;

export type Atom = string | number | boolean | null | undefined; // the smallest unit of data taht can be passed as a children to createElement

export type Node = HTMLElement | Text;

export type FunctionComponent<P = {}> = (
  props: PropsWithChildren<P>,
) => Element;

export interface Fiber {
  node: Node | null; // DOM node
  type: Element['type'] | FunctionComponent; // type of the element
  parent?: Fiber | null; // parent in the fiber tree
  child?: Fiber | null; // first child in the fiber tree
  sibling?: Fiber | null; // next sibling in the fiber tree
  props: PropsWithChildren; // props of the element
  alternate?: Fiber | null; // fiber committed to the DOM in the previous commit
  effectTag?: 'UPDATE' | 'PLACEMENT' | 'DELETION'; // effect to apply to the node
  hooks?: Hook[]; // hooks used by the component
}

export interface FiberWithFunctionComponent extends Fiber {
  type: FunctionComponent;
}

export interface FiberWithHTMLElement extends Fiber {
  type: Element['type'];
}

export const isFunctionComponent = (
  type: Fiber['type'],
): type is FunctionComponent => type instanceof Function;

export const hasFunctionComponent = (
  fiber: Fiber,
): fiber is FiberWithFunctionComponent => isFunctionComponent(fiber.type);
