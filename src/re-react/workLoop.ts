import commitRoot from './commitRoot';
import { globalState } from './globalState';
import performUnitOfWork from './performUnitOfWork';

const workLoop: IdleRequestCallback = (deadline) => {
  /**
   * Split work into chunks and executing work until there is no more work,
   * or the browser needs to do something else
   */
  let shouldYield = false;
  while (globalState.nextUnitOfWork && !shouldYield) {
    globalState.nextUnitOfWork = performUnitOfWork(globalState.nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }

  if (!globalState.nextUnitOfWork && globalState.wipTreeRoot) {
    /**
     * If there is no next unit of work, we should commit the root to the dom
     * Here we already have the fully updated fiber tree
     */
    commitRoot();
  }

  requestIdleCallback(workLoop);
};

export default workLoop;
