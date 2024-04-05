<template>
  <div>
    <div class="name">{{ $pet.data.name }}</div>
    <div class="details">
      <div class="money">Money: {{ $pet.data.money }}$</div>
      <div class="energy">Energy: {{ $pet.data.energy }}%</div>
      <div class="xp">XP: {{ $pet.data.xp }}</div>
      <div class="mood">Mood: {{ $pet.data.mood }}%</div>
      <div class="hunger">Hunger: {{ $pet.data.hunger }}%</div>
      <div class="thirst">Thirst: {{ $pet.data.thirst }}%</div>
      <div class="thirst">Happy: {{ $pet.data.isHappy }}, Ill: {{ $pet.data.isIll }}, Bad: {{ $pet.data.isInBadCondition
        }}</div>
      <div class="current_animation">{{ $pet.current_animation.name }} | {{ $pet.current_frame }}</div>
      <div class="time_passed">{{ $controller.timePassed }}</div>
    </div>
    <div class="main" data-tauri-drag-region>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $controller, $pet } = useNuxtApp()

function tick() {
  $controller.calculateTick()

  setTimeout(() => {
    requestAnimationFrame(tick);
  }, 1000 / $controller.fps);
}

tick()
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#__nuxt {
  background-color: transparent;
  width: 250px;
  height: 250px;
  user-select: none;
  overflow: hidden;
  border-radius: 12px;
}

#__nuxt {
  font-family: sans-serif;
  background-color: rgba($color: #9a0000, $alpha: .5);
  border: 2px solid rgba($color: #d50000, $alpha: .5);
  color: #fff;
  padding: 10px
}

.main {
  width: 250px;
  height: 250px;
  z-index: 100;
  position: fixed;
  padding: 10px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
