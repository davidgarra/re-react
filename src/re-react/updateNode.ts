import type { PropsWithChildren } from './types/common';

const isEvent = (key: string) => key.startsWith('on');

const excludeChildren = (key: string) => key !== 'children';

const isNew =
  <P>(prev: PropsWithChildren<P>, next: PropsWithChildren<P>) =>
  (key: keyof PropsWithChildren<P>) =>
    prev[key] !== next[key];

const isGone =
  <P>(prev: PropsWithChildren<P>, next: PropsWithChildren<P>) =>
  (key: keyof PropsWithChildren<P>) =>
    !(key in next);

const updateNode = (
  node: Node,
  prevProps: PropsWithChildren<any>,
  nextProps: PropsWithChildren<any>,
) => {
  // Remove old or changed event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter((key) => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      node.removeEventListener(eventType, prevProps[name]);
    });

  // Remove old properties
  Object.keys(prevProps)
    .filter(excludeChildren)
    .filter(isGone(prevProps, nextProps))
    .forEach((name) => {
      (node as any)[name] = '';
    });

  // Set new or changed properties
  Object.keys(nextProps)
    .filter(excludeChildren)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      (node as any)[name] = nextProps[name];
    });

  // Add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      node.addEventListener(eventType, nextProps[name]);
    });
};

export default updateNode;
