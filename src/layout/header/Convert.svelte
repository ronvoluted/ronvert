<script>
import { fade, fly } from 'svelte/transition';
import { cubicIn, elasticOut, quintIn } from 'svelte/easing';
import { convertInProgress, convertFile, reducedMotion } from '../../logic/stores';

let unboxingInProgress;
let shaking;

const finish = (node) => {
  unboxingInProgress = false;
  shaking = false;

  if ($reducedMotion) {
    return fade(node, { duration: 1_000, easing: quintIn });
  }

  return {
    duration: 2_000,
    easing: elasticOut,
    css: (t, u) => `transform:
      scale(${2 - t}, ${0.1 + t * 0.9})
      translateY(${20 - t * 20}%)
      rotate(${u * 20}deg)`
  };
};
</script>

<div class="convert">
  <!-- PEW PEW -->
  <!-- {#if $convertInProgress}
    <div class="box" in:fade={{ duration: 500 }}
    >
      <img src="./media/blue-box.svg" alt="Box representing input file" role="presentation">
    </div>
  {:else}
    <a class="box" href={$convertFile.URL} download={$convertFile.name} in:finish>
      <img src="./media/blue-box.svg" alt="Box representing input file" role="presentation">
    </a>
  {/if} -->

  <!-- PEW PEW PEW -->
  <!-- {#if $convertInProgress}
    <div class="box" class:shaking in:fade={{ duration: 500 }}
      on:introend={() => unboxingInProgress = true}
    >
      <img src="./media/blue-box.svg" class:shaking alt="Box representing input file" role="presentation">
    </div>
  {:else}
    <a class="box" href={$convertFile.URL} download={$convertFile.name} in:finish>
      <img src="./media/blue-box.svg" alt="Box representing input file" role="presentation">
    </a>
  {/if}

  {#if unboxingInProgress}
    {#each {length: 4} as _, i}
      <img class="shoe" class:big={i === 3} src="./media/shoe.svg" alt="" role="presentation"
        style="left: {i === 3 ? 25 : 22.5 + i * 20}%"
        transition:fly={{ y: -100, duration: 250, delay: i * 500, easing: cubicIn }}
        on:introend={() => {
          shaking = i >= 2;
          unboxingInProgress = i !== 3;
        }}
      >
    {/each}
  {/if} -->

  <!-- PEW PEW PEW A11Y-->
  {#if $convertInProgress}
    <div class="box" class:shaking in:fade={{ duration: 500 }} out:fade={{ duration: reducedMotion.gate(0, 500) }}
      on:introend={() => unboxingInProgress = reducedMotion.gate(true, false)}
    >
      <img src="./media/blue-box.svg" class:shaking alt="Box representing input file" role="presentation">
    </div>
  {:else}
    <a class="box" href={$convertFile.URL} download={$convertFile.name} in:finish>
      <img src="./media/blue-box.svg" alt="Box representing input file" role="presentation">
    </a>
  {/if}

  {#if unboxingInProgress && !$reducedMotion}
    {#each {length: 4} as _, i}
      <img class="shoe" class:big={i === 3} src="./media/shoe.svg" alt="" role="presentation"
        style="left: {i === 3 ? 25 : 22.5 + i * 20}%"
        transition:fly={{ y: -100, duration: 250, delay: i * 500, easing: cubicIn }}
        on:introend={() => {
          shaking = i >= 2;
          unboxingInProgress = i !== 3;
        }}
      >
    {/each}
  {/if}
</div>

<style>
.convert {
  display: grid;
  place-items: center;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 60%;
  overflow: hidden;
  background-image: url('/media/convert-bg.png');
  box-shadow: 0.25rem 0.5rem 0.75rem hsl(0, 0%, 20%);
}

.box {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 15%;
  bottom: 15%;
}

.box.shaking {
  animation: 0.1s shake ease-in-out 2s alternate infinite;
}
@keyframes shake {
  from { transform: rotate(1deg) }
}

.box > img {
  width: 70%;
  height: 70%;
  transform-origin: bottom;
  transition: transform 0.25s ease 0.3s;
  will-change: transform;
}
@media (prefers-reduced-motion) {
  .box > img {
    transition: transform 0s ease 0.5s;
  }
}

.box > img.shaking {
  transform: scale(2, 0.1);
}

a.box {
  cursor: pointer;
}

a.box::after {
  content: 'DOWNLOAD';
  position: absolute;
  font-size: 140%;
  font-weight: 700;
  text-align: center;
  color: var(--secondary);
  text-shadow: 0 0 10px var(--secondary-dark);
  left: 50%;
  bottom: 19%;
  transform: translateX(-50%);
  z-index: 30;
}

.shoe {
  position: absolute;
  top: 10%;
  width: 15%;
}

.shoe.big {
  top: unset;
  bottom: 15%;
  width: 50%;
}
</style>
