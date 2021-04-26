import { get, writable } from 'svelte/store';

const convertFile = writable({});
const convertInProgress = writable(false);
const convertMode = writable(false);

const reducedMotionStore = () => {
  const store = writable(0);

  return {
    subscribe: store.subscribe,
    set: store.set,
    gate: (value, fallback = 0) => get(store) ? fallback : value
  };
};
const reducedMotion = reducedMotionStore();

export { convertMode, convertInProgress, convertFile, reducedMotion };
