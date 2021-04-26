import App from './App.svelte';
import { reducedMotion } from './logic/stores';

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

reducedMotion.set(mediaQuery.matches);

mediaQuery.addEventListener('change', () => reducedMotion.set(mediaQuery.matches));

const app = new App({
  target: document.body,
  intro: true
});

export default app;
