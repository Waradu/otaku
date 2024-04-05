<template>
  <div>
    <div class="details">
      <div class="name">{{ $pet.data.name }}</div>
      <div class="current_animation">Mood: {{ $pet.data.moodType }}</div>
      <div class="current_animation">Variant: {{ $pet.selectedAnimationVariant + 1 }}</div>
      <div class="current_animation">Frame: {{ $pet.current_frame }}</div>
      <div class="path">/pet{{ image }}</div>
    </div>
    <img :src="`/pet${image}`" alt="later">
    <div class="main" data-tauri-drag-region>
      <button @click="$controller.setMoodType('happy')">Happy</button>
      <button @click="$controller.setMoodType('normal')">Normal</button>
      <button @click="$controller.setMoodType('ill')">Ill</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $controller, $pet } = useNuxtApp()

const image = ref('');

function tick() {
  const data = $controller.getCurrentFramePath()
  
  image.value = data.path;

  $controller.calculateTick()
  setTimeout(() => {
    requestAnimationFrame(tick);
  }, data.speed);
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
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
  user-select: none;
  overflow: hidden;
  border-radius: 12px;
  font-size: 14px;
}

#__nuxt {
  font-family: sans-serif;
  background-color: rgba($color: #9a0000, $alpha: .6);
  border: 2px solid rgba($color: #d50000, $alpha: .5);
  color: #fff;
  padding: 10px
}

.main {
  width: 100%;
  height: 100%;
  z-index: 10;
  position: fixed;
  padding: 10px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: end;
  justify-content: end;
  gap: 5px;
  
  button {
    padding-inline: 6px;
    font-size: 12px;
  }
}

img {
  width: 55%;
  height: 55%;
  position: fixed;
  padding: 5px;
  top: 0;
  right: 0;
  transition: .1s;
  opacity: .5;
}

html:hover .details {
  opacity: 0;
}

html:hover img {
  width: 100%;
  height: 100%;
  padding: 0;
  top: 0;
  right: 0;
  opacity: 1;
}

html:hover #__nuxt {
  background-color: rgba($color: #9a0000, $alpha: 0);
  border: 2px solid rgba($color: #d50000, $alpha: 0);
}
</style>
