import type { Hook } from '.';
import { globalState } from '../globalState';
import type { Fiber } from '../types/common';
import { assertIsDefined } from '../types/utils';

type Action<T = unknown> = (prev: T) => T;

type SetState<T> = {
  (action: Action<T>): void;
  (state: T): void;
};

export type UseState = {
  type: 'useState';
  state: unknown;
  queue: Action[];
};

const isUseState = (hook: Hook): hook is UseState => hook.type === 'useState';

const isNullableUseState = (hook?: Hook): hook is UseState | undefined =>
  hook == null || isUseState(hook);

const useState = <T>(initial: T): [T, SetState<T>] => {
  assertIsDefined(
    globalState.wipFiber,
    'useState must be called from within a function component',
  );
  const oldHook =
    globalState.wipFiber?.alternate?.hooks?.[globalState.hookIndex];

  if (!isNullableUseState(oldHook)) {
    throw new Error(
      `Re-React has detected a change in the order of hooks. This is not allowed.`,
    );
  }
  const hook: UseState = {
    type: 'useState',
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState: SetState<T> = (actionOrState) => {
    const action =
      actionOrState instanceof Function ? actionOrState : () => actionOrState;
    hook.queue.push(action as Action);
    assertIsDefined(globalState.currentRoot, 'currentRoot');
    const root: Fiber = {
      type: globalState.currentRoot.type,
      node: globalState.currentRoot.node,
      props: globalState.currentRoot.props,
      alternate: globalState.currentRoot,
    };

    /* start new render phase for the current node */
    globalState.wipTreeRoot = root;
    globalState.nextUnitOfWork = root;
    globalState.deletions = [];
  };
  assertIsDefined(
    globalState.wipFiber?.hooks,
    'state.wipFiber.hooks is undefined',
  );
  globalState.wipFiber.hooks.push(hook);
  globalState.hookIndex++;
  return [hook.state as T, setState];
};

export default useState;
