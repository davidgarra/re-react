import { globalState } from './globalState';
import type { Element, Fiber, HtmlElement } from './types/common';
import { assertIsDefined } from './types/utils';

const reconcileNode = (
  parent: Fiber,
  oldFiber: Fiber | null,
  element: Element,
): Fiber | null => {
  let newFiber: Fiber | null = null;
  const sameType = oldFiber && element && element.type == oldFiber.type;
  if (sameType) {
    // Update the node with the new props
    newFiber = {
      type: oldFiber.type,
      props: element.props,
      node: oldFiber.node,
      parent,
      alternate: oldFiber,
      effectTag: 'UPDATE',
    };
  }

  if (element && !sameType) {
    // Replace the node with a new one
    newFiber = {
      type: element.type,
      props: element.props,
      node: null,
      parent: parent,
      alternate: null,
      effectTag: 'PLACEMENT',
    };
  }

  if (oldFiber && !sameType) {
    // Mark the node for deletion
    oldFiber.effectTag = 'DELETION';
    globalState.deletions.push(oldFiber);
  }

  return newFiber;
};

const getNext = (
  fiber: Fiber,
  oldFiber: Fiber | null,
  children: Element[],
  index: number,
): [Fiber | null, Element] => {
  const element = children[index];
  if (fiber.type === 'ARRAY_ELEMENT') {
    oldFiber = fiber.alternate?.child ?? null;
    const key = (element as HtmlElement)?.props.key;
    while (oldFiber != null && oldFiber.props.key !== key) {
      oldFiber = oldFiber.sibling ?? null;
    }
    return [oldFiber, element];
  }

  if (index === 0) return [fiber.alternate?.child ?? null, element];

  return [oldFiber?.sibling ?? null, element];
};

const reconcileChildren = (fiber: Fiber, children: Element[]) => {
  let oldFiber: Fiber | null = null; // last rendered fiber
  let element: Element | null = null; // new element to reconcile
  let prevSibling: Fiber | null = null;

  /**
   * Iterate at the same time over the children of the old fiber and the array
   * of elements to reconcile.
   */
  let index = 0;
  while (index < children.length || oldFiber != null) {
    [oldFiber, element] = getNext(fiber, oldFiber, children, index);

    const newFiber = reconcileNode(fiber, oldFiber, element);

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      assertIsDefined(prevSibling!, 'prevSibling');
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
};

export default reconcileChildren;
