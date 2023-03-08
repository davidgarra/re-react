import type { UseEffect } from './useEffect';
import type { UseState } from './useState';

export { default as useState } from './useState';
export { default as useEffect } from './useEffect';

export type Hook = UseState | UseEffect;
