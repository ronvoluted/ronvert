<script>
import { spring } from 'svelte/motion';
import { reducedMotion } from '../logic/stores';

let text = 'lossless';
let scrollY;
let rotation = spring(0, { stiffness: 0.1, damping: 0.1 });

const useless = () => (text = '&nbsp;useless');
const lossless = () => (text = 'lossless');

$: rotation.set(scrollY);
</script>

<svelte:window bind:scrollY />

<section id="about">
  <div class="container">
    <div class="content">
      <h1>About this thing</h1>
      <!-- <img src="./media/asylum-escapee.jpg" alt="Ron Au"> -->
      <!-- <img src="./media/asylum-escapee.jpg" alt="Ron Au" style="transform: rotate({scrollY}deg)"> -->
      <!-- <img src="./media/asylum-escapee.jpg" alt="Ron Au" style="transform: rotate({$rotation}deg)"> -->
      <img src="./media/asylum-escapee.jpg" alt="Ron Au" style="transform: rotate({reducedMotion.gate($rotation)}deg)">
      <p>
        The creation of Ronvert is a reponse to the question: "Why not?" A <span
          on:mouseenter={useless}
          on:mouseleave={lossless}>{@html text}</span
        > file converter with zero online data transfer is something to behold. The creation of Ron Au on the other hand
        begs the question: "Why?"
      </p>
    </div>
  </div>
</section>

<style>
section {
  background-color: var(--primary-light);
}

h1 {
  grid-row: 1;
  grid-column: 1 / 3;
  text-align: center;
}

img {
  grid-row: 2;
  grid-column: 1;
  width: 10rem;
  margin: 1rem;
  border-radius: 50%;
  user-select: none;
}

span {
  display: inline-block;
}

p {
  grid-row: 2;
  grid-column: 2;
  text-align: justify;
}

@media (min-width: 600px) {
  p {
    text-align: left;
  }
}

@media (min-width: 900px) {
  .content {
    display: grid;
    grid-template-rows: 2;
    grid-template-columns: 2;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    max-width: 50rem;
    margin: 0 auto;
  }

  h1 {
    grid-column: 2;
    margin-left: 5%;
    text-align: left;
  }

  p {
    max-width: 40rem;
  }
}

@media (min-width: 1280px) {
  h1 {
    grid-column: 1 / 3;
    text-align: center;
  }
}
</style>
