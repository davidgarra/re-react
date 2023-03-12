import type { Hook } from '../hooks';

export type Props<P = {}> = { [K in keyof P]: P[K] };

export type PropsWithChildren<P = {}> = Props<P> & { children?: Element[] };

export type Element = HtmlElement | TextElement;

export type HtmlElement = {
  type: keyof HTMLElementTagNameMap;
  props: PropsWithChildren;
};

export type TextElement = {
  type: 'TEXT_ELEMENT';
  props: {
    nodeValue: string;
  };
};

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
