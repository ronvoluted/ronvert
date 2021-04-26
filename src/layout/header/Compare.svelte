<script>
import { elasticOut } from 'svelte/easing';

let clientWidth;
let value = 50;

$: clipPos = 100 - value + '%';
$: handlePos = clientWidth * (value / 100) + 'px';

let slide = () => ({
  duration: 2_000,
  easing: elasticOut,
  tick: (t) => value = t * 50
});
</script>

<!-- <div class="comparison" bind:clientWidth in:slide> -->
<div class="comparison" bind:clientWidth>
  <img class="before" src="./media/box-before.png" alt="Carboard box labelled 12 megabytes before conversion">
  <img class="after" src="./media/box-after.png" alt="Carboard box labelled 12 megabytes after conversion" style="clip-path: inset(0 {clipPos} 0 0)">
  <div class="slider">
    <div class="handle" style="transform: translateX({handlePos})" role="presentation">
      <img class="knob" src="./media/knob.svg" alt="" role="presentation">
    </div>
    <input type="range" min="0" max="100" bind:value>
  </div>
</div>

<style>
.comparison {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 60%;
  overflow: hidden;
  background-image: url('/media/convert-bg.png');
  box-shadow: 0.25rem 0.5rem 0.75rem hsl(0, 0%, 20%);
}

img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
}

.after {
  z-index: 5;
  will-change: clip-path;
}

.slider {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.handle {
  width: 0.3rem;
  height: 100%;
  position: absolute;
  transform-origin: center;
  will-change: transform;
  pointer-events: none;
  background: #fff;
}

.knob {
  position: absolute;
  height: 3rem;
  width: 3rem;
  top: 50%;
  left: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%);
}

input {
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  appearance: none;
  background: none;
}
input::-webkit-slider-thumb {
  height: 24rem;
  width: 3rem;
  appearance: none;
  visibility: hidden;
  cursor: col-resize;
}
input::-moz-range-thumb { /* Can't comma combine this with above selectors */
  height: 24rem;
  width: 3rem;
  appearance: none;
  visibility: hidden;
  cursor: col-resize;
}
</style>
