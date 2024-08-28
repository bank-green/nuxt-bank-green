<template>
  <div ref="container">
&nbsp;
  </div>
</template>

<script setup>
console.log('rendering')
const { container } = useLottieScroller({
  path: '/anim/piggy.json?v=2',
  actions: [
    { visibility: [0.0, 0.2], frames: [0, 75] },
    { visibility: [0.2, 0.4], frames: [75, 210] },
    { visibility: [0.4, 1], frames: [210, 493] },
  ],
})
</script>
