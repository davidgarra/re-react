import type { Hook } from '.';
import { globalState } from '../globalState';
import { assertIsDefined } from '../types/utils';

type Destructor = () => void;
type Effect = () => Destructor | void;
type Dependencies = Array<unknown> | undefined;
export type UseEffect = {
  type: 'useEffect';
  destructor?: Destructor;
  dependencies?: Array<unknown>;
};

const isUseEffect = (hook: Hook): hook is UseEffect =>
  hook.type === 'useEffect';

const isNullableUseEffect = (hook?: Hook): hook is UseEffect | undefined =>
  hook == null || isUseEffect(hook);

const useEffect = (effect: Effect, dependencies?: Dependencies): void => {
  assertIsDefined(
    globalState.wipFiber,
    'useEffect must be called from within a function component',
  );
  const oldHook =
    globalState.wipFiber?.alternate?.hooks?.[globalState.hookIndex];

  if (!isNullableUseEffect(oldHook)) {
    throw new Error(
      `Re-React has detected a change in the order of hooks. This is not allowed.`,
    );
  }
  if (oldHook && dependencies?.length !== oldHook?.dependencies?.length) {
    throw new Error(
      `Re-React has detected a change in the number of dependencies. This is not allowed.`,
    );
  }
  const hook: UseEffect = {
    type: 'useEffect',
    destructor: oldHook?.destructor,
    dependencies,
  };

  const depsHaveChanged = dependencies?.some(
    (newDep, i) => newDep !== oldHook?.dependencies?.[i],
  );
  if (dependencies == null || oldHook == null || depsHaveChanged) {
    oldHook?.destructor?.();
    hook.destructor = effect() ?? undefined;
  }

  assertIsDefined(
    globalState.wipFiber?.hooks,
    'state.wipFiber.hooks is undefined',
  );
  globalState.wipFiber.hooks.push(hook);
  globalState.hookIndex++;
};

export default useEffect;
