// --- jsxFactory.d.ts ---
declare namespace JSX {
  // type Element = string;
  interface IntrinsicElements {
    [eleName: string]: unknown;
  }
}
