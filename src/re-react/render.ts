import { globalState } from './globalState';
import type { Element, Node, Fiber } from './types/common';
import workLoop from './workLoop';

type Render = (element: Element, container: Node) => void;

const render: Render = (element, container) => {
  const root: Fiber = {
    type: element.type,
    node: container,
    props: {
      children: [element],
    },
    alternate: globalState.wipTreeRoot,
  };

  globalState.wipTreeRoot = root;
  globalState.nextUnitOfWork = root;
  globalState.deletions = [];
  requestIdleCallback(workLoop);
};

export default render;
