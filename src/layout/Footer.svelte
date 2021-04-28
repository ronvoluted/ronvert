<script>
import { onMount } from 'svelte';
import { getRand, getRandRange, observeIntersection, wait } from '../logic/util';
import { reducedMotion } from '../logic/stores';

let html;
let body;
let footer;
let spans;
let filter;

const tocksAudio = {};
let timeBackwardsAudio;
let timeForwardsAudio;
let dongAudio;

onMount(() => {
  html = document.querySelector('html');
  body = document.querySelector('body');
  spans = document.querySelectorAll('footer span');

  (() => {
    if ($reducedMotion) return;

    for (let i = 0; i <= 7; i++) {
      tocksAudio[i] = new Audio(`media/audio/tock-${i}.mp3`);
    }

    timeBackwardsAudio = new Audio('media/audio/time-backwards.mp3');
    timeForwardsAudio = new Audio('media/audio/time-forwards.mp3');
    dongAudio = new Audio('media/audio/dong.mp3');
  })();
});

const playTock = () => {
  tocksAudio[getRand(7)].play();
};

const backToTop = async () => {
  const squareKeys = [
    { clipPath: 'inset(0 0 0 0 round 0 0 0 0%)' },
    { clipPath: `inset(
                  max(100% - 100vh, (100% - 50vh - 50vw))
                  max(0px, 50vw - 50vh)
                  max(0px, 50vh - 50vw)
                  max(0px, 50vw - 50vh)
                  round 0 0 0 0)`
    }
  ];
  const squareOptions = { duration: 3_000, fill: 'forwards' };
  const squareAnimation = new Animation(new KeyframeEffect(body, squareKeys, squareOptions));

  const circleKeys = [
    { clipPath: `inset(
                  max(100% - 100vh, (100% - 50vh - 50vw))
                  max(0px, 50vw - 50vh)
                  max(0px, 50vh - 50vw)
                  max(0px, 50vw - 50vh)
                  round 50vmin 50vmin 50vmin 50vmin)`
    }
  ];
  const circleOptions = { duration: 500, easing: 'ease-in-out', fill: 'forwards' };
  const circleAnimation = new Animation(new KeyframeEffect(body, circleKeys, circleOptions));

  const shrinkKeys = [
    { transform: 'scale(0) rotate(-1turn)' }
  ];
  const shrinkOptions = { duration: 1_000, easing: 'ease-in-out', fill: 'forwards' };
  const shrinkAnimation = new Animation(new KeyframeEffect(body, shrinkKeys, shrinkOptions));

  const invertKeys = [
    { backdropFilter: 'invert(100%)' }
  ];
  const invertOptions = { duration: 3_000, easing: 'ease-out', fill: 'forwards' };
  const invertAnimation = new Animation(new KeyframeEffect(filter, invertKeys, invertOptions));

  const shakeKeys = [];
  for (let i = 0; i < 50; i++) {
    shakeKeys.push({ backgroundPosition: `${getRandRange(-1, 1)}rem ${getRandRange(-1, 1)}rem` });
  }
  const shakeOptions = { duration: 2_000, easing: 'ease-out', fill: 'forwards' };
  const shakeAnimation = new Animation(new KeyframeEffect(html, shakeKeys, shakeOptions));

  const resetKeys = [
    { backdropFilter: 'blur(5px) brightness(300%) saturate(200%)' },
    { backdropFilter: 'blur(0) brightness(100%) saturate(100%)' }
  ];
  const resetOptions = { duration: 5_000, easing: 'ease-in-out' };
  const resetAnimation = new Animation(new KeyframeEffect(filter, resetKeys, resetOptions));

  window.scrollTo(0, body.scrollHeight);

  html.style.overflow = 'hidden';
  html.style.backgroundImage = "url('/media/space.jpg')";
  body.style.transformOrigin = 'center calc(100% - 50vh)';
  filter.style.display = 'unset';

  await [...spans].reverse().reduce(async (a, span) => {
    await a, playTock();
    span.style.opacity = 0;
    await wait(1_000);
  }, null); 

  squareAnimation.play();
  invertAnimation.play();
  Array(4).fill().reduce(async (a) => {
    await a, playTock();
    await wait(1_000);
  }, null);
  await squareAnimation.finished;

  await wait(1_000);

  timeBackwardsAudio.play();
  circleAnimation.play();
  shrinkAnimation.play();
  await Promise.all([circleAnimation.finished, shrinkAnimation.finished]);

  await wait(1_500);

  timeForwardsAudio.play();
  shakeAnimation.play();
  await shakeAnimation.finished;

  await wait(1_200);

  html.style.scrollBehavior = 'initial';
  window.scrollTo({ top: 0, behavior: 'auto' });
  html.style.scrollBehavior = 'smooth';
  html.style.overflow = 'initial';
  html.style.backgroundImage = 'none';
  spans.forEach(span => span.style.opacity = '1');
  circleAnimation.cancel();
  shrinkAnimation.cancel();
  invertAnimation.cancel();
  dongAudio.play();
  resetAnimation.play();
  await resetAnimation.finished;

  filter.style.display = 'none';
};
</script>

<footer bind:this={footer} id="footer">
    <!-- <a href="#header">Back to top</a> -->
    <!-- PEW PEW PEW PEW -->
    {#if $reducedMotion}
      <a href="#header">Back to top</a>
    {:else}
      <button class="back-to-top" on:click={backToTop}>
        <span>Back </span><span>to </span><span>top</span>
      </button>
    {/if}
</footer>

<div bind:this={filter} class="filter"></div>

<style>
footer {
  display: grid;
  place-items: center;
  min-height: 4rem;
  height: 100%;
  margin: 0;
  padding: 0;
}

button {
  width: min-content;
  margin: 0;
  padding: 0;
  border-radius: 0;
  font-size: 1rem;
  font-weight: 500;
  filter: none;
  color: var(--secondary);
  background-color: transparent;
  transform: none;
  will-change: none;
  user-select: unset;
}

button:hover {
  text-decoration: underline;
}

.filter {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: none;
}
</style>
