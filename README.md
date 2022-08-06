# sodayo

[![NPM version](https://img.shields.io/npm/v/sodayo?color=a1b858&label=)](https://www.npmjs.com/package/sodayo)

A state management for React.

- Easy-to-use API
- Based on `useSyncExternalStore`
- Lightweight: Gzipped ≈ `0.2KB` (CJS + MJS + Types ≈ `0.7KB`)

This project is inspired by [Pinia](https://github.com/vuejs/pinia) and [Resso](https://github.com/nanxiaobei/resso).

## Installation
```bash
// NPM
$ npm i -S sodayo
// Yarn
$ yarn add sodayo
// PNPM
$ pnpm add sodayo
```

## Docs

### Getting Started
Similar to Pinia, sodayo recommends `src/stores` as a directory for storing the store. You can create this folder first.

### Creating a store

Let's create a new store - how about calling it "app"? (You need to create `app.(js|ts)` under `src/stores`)
Then, we need to initialize it.

```ts
// `src/stores/app.ts`
import { atom, defineStore } from "sodayo";

export const useAppStore = defineStore(() => { // See why it's so named below
  const count = atom(0);
  const inc = (n = 1) => { count.value += n; };
  return {
    count,
    inc,
  };
});
```

If you've used Vue and Pinia, this might be familiar. The way to create this Store comes from Pinia. And `atom` is a utility function that behaves like `ref` in `@vue/reactivity`. In `defineStore`, you can create functions to make changes to the `value` properties of these atoms, just as `inc` does. We call these functions `mutations`.

### Using a store in the component

In a component, you can do like this to access to the store.

```tsx
// `src/pages/some-page.tsx`
import { useAppStore } from "../stores/app";

function Page() {
  const store = useAppStore();

  return (
    <div>
      {store.count}
      <button type="button" onClick={() => store.inc()}>
        Add 1
      </button>
      <button type="button" onClick={() => store.inc(10)}>
        Add 10
      </button>
    </div>
  );
}
```

You might be confused - where is the `value` property of count? In fact, sodayo proxied the values internally so that you don't have to annoy and type `.value` in your code every time.

PS: By design, you can't modify the count in the component, you can only modify it through the mutation defined in the store. The top-level Proxy does not implement the modification operation on the value.

That's it! You already understand how to use sodayo. Go and develop your project!

### Advanced

#### Getters

Getter atoms are supported since v0.2.0. You can use it like this:
```ts
import { atom, defineStore, mota } from "sodayo";

export const useAppStore = defineStore(() => {
  const count = atom(0);
  const doubled = mota(() => count.value * 2);
  const inc = (n = 1) => { count.value += n; };
  return {
    count,
    doubled,
    inc,
  };
});
````
After that, you can use it like a normal atom.

## License

[MIT](./LICENSE) License © 2021 [Ray](https://github.com/so1ve)
