import { globalState } from './globalState';
import type { Element, Fiber } from './types/common';
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

const reconcileChildren = (fiber: Fiber, children: Element[]) => {
  let oldFiber = fiber.alternate?.child ?? null; // last rendered fiber
  let prevSibling: Fiber | null = null;

  /**
   * Iterate at the same time over the children of the old fiber and the array
   * of elements to reconcile.
   */
  let index = 0;
  while (index < children.length || oldFiber != null) {
    const element = children[index]; // new element to reconcile

    const newFiber = reconcileNode(fiber, oldFiber, element);

    if (oldFiber) {
      oldFiber = oldFiber.sibling ?? null;
    }

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
