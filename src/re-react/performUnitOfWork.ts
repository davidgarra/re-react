import createNode from './createNode';
import { globalState } from './globalState';
import reconcileChildren from './reconcileChildren';
import {
  Fiber,
  FiberWithFunctionComponent,
  FiberWithHTMLElement,
  hasFunctionComponent,
} from './types/common';

const updateFunctionComponent = (fiber: FiberWithFunctionComponent) => {
  globalState.wipFiber = fiber;
  globalState.hookIndex = 0;
  globalState.wipFiber.hooks = [];
  fiber.hooks = [];
  // 1. Execute the function to get the children
  const children = [fiber.type(fiber.props)];
  // 2. Create the fibers for the element’s children
  reconcileChildren(fiber, children);
};

const updateHTMLComponent = (fiber: FiberWithHTMLElement) => {
  // 1. Create the new node
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  // 2. Create the fibers for the element’s children
  reconcileChildren(fiber, fiber.props.children ?? []);
};

const performUnitOfWork = (fiber: Fiber): Fiber | null => {
  if (hasFunctionComponent(fiber)) {
    updateFunctionComponent(fiber);
  } else {
    updateHTMLComponent(fiber as FiberWithHTMLElement);
  }

  // 3. Select the next unit of work
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber: Fiber | null | undefined = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }

  return null;
};

export default performUnitOfWork;
