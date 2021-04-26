<script>
import Panel from './Panel.svelte';
import Raj from './Raj.svelte';
import Jesse from './Jesse.svelte';
import Dennis from './Dennis.svelte';

export let testimonial;
export let alternate;

const people = { Raj, Jesse, Dennis };
</script>

<div class="testimonial {testimonial.name.toLowerCase()}" class:alternate>
  <div class="svg">
    <Panel>
      <svelte:component this={people[testimonial.name]} />
    </Panel>
  </div>
  <div class="text">
    <h2>{testimonial.name}</h2>
    <p>❝ {testimonial.quote} ❞</p>
  </div>
</div>

<style>
.testimonial {
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  z-index: 5;
}

.svg {
  margin: 1rem auto;
  width: 90%;
  max-width: 25rem;
  z-index: 5;
}

.alternate > .svg {
  transform: scaleX(-1);
}

.text {
  margin: 0 auto;
  width: clamp(15rem, 100%, 25rem);
  z-index: 5;
}

h2 {
  margin-bottom: 0rem;
  color: var(--secondary-dark);
}

p {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 2rem;
}

@media (min-width: 800px) {
  .testimonial {
    width: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  .text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2,
  p {
    width: 100%;
    text-align: right;
    padding: 0;
    margin: 0;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  .alternate > .svg {
    grid-row: 1;
    grid-column: 2;
  }

  .alternate h2,
  .alternate p {
    grid-row: 1;
    grid-column: 1;
    text-align: left;
  }
}
</style>
