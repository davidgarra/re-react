import type { Fiber } from './types/common';
import { assertIsDefined } from './types/utils';

const deleteNode = (fiber: Fiber, parentNode: Node) => {
  if (fiber.node) {
    parentNode.removeChild(fiber.node);
  } else {
    assertIsDefined(fiber.child, 'fiber.child');
    deleteNode(fiber.child, parentNode);
  }
};

export default deleteNode;
