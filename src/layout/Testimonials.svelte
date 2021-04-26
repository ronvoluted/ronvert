<script>
import Testimonial from './testimonials/Testimonial.svelte';

const testimonials = [
  {
    name: 'Raj',
    quote: 'Lorem ipsum dolor sit amet. Magna ex ridens. Quod vere non facit sensu.'
  },
  {
    name: 'Jesse',
    quote: 'Ego amo is uber. Item, gratias ago tibi, quia solvente me ego vere opus pecuniam.'
  },
  {
    name: 'Dennis',
    quote: 'Úbi sum! Quis es! Quid vis!'
  }
];
</script>

<section id="testimonials">
  <div class="container">
    <h1>Real words from our users</h1>
    {#each testimonials as testimonial, i}
      <Testimonial {testimonial} alternate={i % 2 === 1} />
    {:else}
      <em>It appears no one enjoys this web app.</em>
    {/each}
  </div>
</section>

<style>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 2rem;
}

.container {
  max-width: 70rem;
}

h1 {
  margin: 2rem auto;
  margin-bottom: 3rem;
}

@media (min-width: 800px) {
  h1 {
    font-size: 2.4rem;
  }
}

@media (min-width: 1280px) {
  .container {
    width: 75vw;
  }
}
</style>
