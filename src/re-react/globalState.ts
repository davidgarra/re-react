import type { Fiber } from './types/common';

type State = {
  wipTreeRoot: Fiber | null; // Fiber tree root
  nextUnitOfWork: Fiber | null; // Next fiber to process
  currentRoot: Fiber | null; // Last fiber tree committed to the DOM
  deletions: Fiber[]; // List of fibers to delete
  wipFiber: Fiber | null;
  hookIndex: number;
};

export const globalState: State = {
  wipTreeRoot: null,
  nextUnitOfWork: null,
  currentRoot: null,
  deletions: [],
  wipFiber: null, // Current fiber being processed
  hookIndex: 0, // Current hook index
};
