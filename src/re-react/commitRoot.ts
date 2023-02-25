import deleteNode from './deleteNode';
import { globalState } from './globalState';
import type { Fiber } from './types/common';
import { assertIsDefined } from './types/utils';
import updateNode from './updateNode';

const commitRoot = () => {
  assertIsDefined(globalState.wipTreeRoot, 'root');
  globalState.deletions.forEach(commitWork); // remove all nodes marked for deletion
  commitWork(globalState.wipTreeRoot.child);
  globalState.currentRoot = globalState.wipTreeRoot;
  globalState.wipTreeRoot = null;
};

const commitNode = (fiber: Fiber, parentNode: Node): boolean => {
  // add, remove or update the node
  if (fiber.effectTag === 'PLACEMENT' && fiber.node != null) {
    parentNode.appendChild(fiber.node);
  } else if (fiber.effectTag === 'UPDATE' && fiber.node != null) {
    assertIsDefined(fiber.alternate, 'fiber.alternate');
    updateNode(fiber.node, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag === 'DELETION') {
    deleteNode(fiber, parentNode);
    return false;
  }
  return true;
};

const getParentNode = (fiber: Fiber): Node => {
  let parent: Fiber | undefined | null = fiber.parent;
  while (!parent?.node) {
    parent = parent?.parent;
  }
  return parent.node;
};

const commitWork = (fiber?: Fiber | null) => {
  // add, remove or update nodes to the DOM
  if (!fiber) {
    return;
  }
  const parentNode = getParentNode(fiber);
  const shouldContinue = commitNode(fiber, parentNode);
  if (!shouldContinue) return;
  commitWork(fiber.child);
  commitWork(fiber.sibling);
};

export default commitRoot;
