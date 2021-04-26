<script>
import { fly } from 'svelte/transition';
import { elasticOut, linear } from 'svelte/easing';
import { observeIntersection } from '../../logic/util';
import { reducedMotion } from '../../logic/stores';

const reduced = {
  y: 0,
  duration: 2_000,
  easing: linear,
  opacity: 0
}

const standard = {
  y: 50,
  duration: 1_500,
  easing: elasticOut,
  opacity: 0.5
}

let intersecting;
</script>

<svg viewBox="0 0 856 732" use:observeIntersection={{ threshold: 0.75, callback: () => intersecting = true }}>
  <g transform="matrix(1.89829 0 0 1.90433 545 216)">
    <path fill="#10294C" d="M-219-19C-67-56 67-68 129-73h1c7 0 12 6 12 13-3 49-7 143 0 236 0 7-5 13-11 13a3456 3456 0 00-348 57c-6 0-12-5-13-12-6-98-2-196 2-242 0-5 4-10 9-11z"/>
    <path fill="#FFB400" d="M164-83c-3 38-11 161 0 279 0 5-4 11-10 11a3408 3408 0 00-390 64h-3c-5-1-9-5-9-10-11-123-2-254 0-286 1-5 4-9 8-10 187-46 348-57 393-60 4 0 9 3 10 7l1 5zm-394 319c2 7 9 11 15 9 139-31 281-48 346-56 7 0 11-6 11-13-7-93-3-187 0-236v-1c-1-7-6-12-13-12-63 4-196 17-348 54-5 1-9 6-9 11-4 46-8 144-2 242v2z"/>
    <path fill="#10294C" d="M-21 218l2 2c0 1 0 2-2 3l-7 3-7 1-8 1h-7l-2-2c-1-1 0-2 1-3l7-2 8-2 7-1h8zM-273-53c186-47 347-58 392-60 16-1 38 5 44 25-1-4-6-7-10-7-45 3-206 14-392 60-5 1-8 5-9 10-2 32-11 164 0 286 0 5 4 9 9 10-22-1-41-11-43-27-11-123-2-255 1-288 0-4 3-8 8-9z"/>
    <path fill="#FFB400" d="M-253-38v2c0 1-1 2-3 2l-4-1-4-2a34 34 0 01-8-4l-1-2c-1-1 0-3 2-3h5l5 2 4 2 4 4z"/>
    <path fill="#F04E23" d="M-274 200l-1-15v-1c1-2 2-3 4-2l6 2 1 3a133 133 0 001 15c-1 2-3 3-4 2l-5-1-2-3z"/>
    <path fill="#FFB400" d="M-273 224l-1-7v-1c1-2 3-3 4-2l6 2 2 3v7l-4 2-5-2-2-2z"/>
    <!-- <slot></slot> -->

    <!-- {#if intersecting}
      <g in:fly={{ y: 50, duration: 1_500, easing: elasticOut, opacity: 0.5 }}>
        <slot></slot>
      </g>
    {/if} -->

    {#if intersecting}
      <g in:fly={ $reducedMotion ? reduced : standard }>
        <slot></slot>
      </g>
    {/if}
  </g>
</svg>
