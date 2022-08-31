<script lang="ts">
  import { spring } from 'svelte/motion'

  const value = spring(0, {
    stiffness: 0.01,
    damping: 0.9,
  })
  const value2 = spring(0, {
    stiffness: 0.01,
    damping: 0.9,
  })
  const value3 = spring(0, {
    stiffness: 0.01,
    damping: 0.9,
  })
</script>

<div class="p-4 grid grid-cols-2 gap-2">
  <button
    on:mouseenter={() => value.set(100)}
    on:mouseleave={() => value.set(0, { soft: 1, hard: false })}
    class="btn btn-primary" />
  <button
    on:mouseenter={() => value2.set(100)}
    on:mouseleave={() => value2.set(0, { soft: 1, hard: false })}
    class="btn btn-accent" />
  <button
    on:mouseenter={() => value3.set(100)}
    on:mouseleave={() => value3.set(0, { soft: 1, hard: false })}
    class="btn btn-error" />
</div>

<div
  class="radial-progress text-rose-300"
  style="--value:{$value3}; --size:14rem; --thickness: 5px;">
  <div
    class="radial-progress text-yellow-300"
    style="--value:{$value2}; --size:12rem; --thickness: 2px;">
    <div
      class="radial-progress text-green-500"
      style="--value:{$value}; --size:10rem; --thickness: 1rem;">
      {$value.toFixed(1)}%
    </div>
  </div>
</div>
