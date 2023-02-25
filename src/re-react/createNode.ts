import type { FiberWithHTMLElement } from './types/common';
import updateNode from './updateNode';

const createNode = (fiber: FiberWithHTMLElement) => {
  const node =
    fiber.type == 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(fiber.type);

  updateNode(node, {}, fiber.props);

  return node;
};

export default createNode;
