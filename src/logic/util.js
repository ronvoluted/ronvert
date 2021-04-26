const getRand = (max) => Math.floor(Math.random() * (max + 1));
const getRandRange = (min, max) => Math.random() * (max - min) + min;

const observeIntersection = (node, options) => {
  const observation = (entries) => {
    if (entries[0].intersectionRatio <= 0) return;

    if (entries[0].intersectionRatio > options.threshold) {
      options.callback();
      observer.unobserve(node);
    } else {
      observer.unobserve(node);
      observer.observe(node);
    }
  };

  const observer = new IntersectionObserver(observation);

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    }
  };
};

const wait = (ms) => new Promise((_) => setTimeout(_, ms));

/* Alternative to reducedMotion.gate() */

// import { get } from 'svelte/store';
// import { reducedMotion } from './stores.js';

// export const motion = (value, fallback = 0) => get(reducedMotion) ? fallback : value

export { getRand, getRandRange, observeIntersection, wait };
