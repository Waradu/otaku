<template>
  <div>
    <div class="details">
      <div class="current_animation">Mood: {{ $pet.current.mood }} | Variant: {{ $pet.current.variant + 1 }}
      </div>
      <div class="current_animation">Ticks: {{ ticks }} | Frame: {{ $pet.current.frame }}</div>
      <div class="path">/pet{{ image }}</div>
    </div>
    <img :src="`/pet${image}`" alt="later">
    <div class="main" data-tauri-drag-region>
      <div class="animation">
        <button @click="switchAnimation('idle')">Idle</button>
        <button @click="switchAnimation('raise')">Raise</button>
      </div>
      <div class="state">
        <button @click="$controller.setMoodType('happy')">Happy</button>
        <button @click="$controller.setMoodType('normal')">Normal</button>
        <button @click="$controller.setMoodType('ill')">Ill</button>
        <button @click="$controller.setMoodType('poorCondition')">Poor</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogicalPosition, WebviewWindow, appWindow } from '@tauri-apps/api/window'
import type { AnimationTypes } from '~/types/controller';
const { $controller, $pet } = useNuxtApp()
 
const image = ref('');

var ticks = 0;
var lastLoop = new Date();
var fps = 0;

function switchAnimation(animation: AnimationTypes, force: boolean = false) {
  $controller.switchAnimation(animation, force)
  const data = $controller.getCurrentFramePath()
  image.value = data.path;
}

$controller.init()

function tick() {
  const data = $controller.getCurrentFramePath()
  image.value = data.path;
  $controller.calculateTick()

  ticks++;
  var thisLoop = new Date();
  fps = Math.round(1000 / (+thisLoop - +lastLoop));
  lastLoop = thisLoop;

  setTimeout(() => {
    requestAnimationFrame(tick);
  }, data.speed);
}

tick()

/* onMounted(() => {
  document.querySelector(".main")?.addEventListener("mousedown", async () => {
    await appWindow.setCursorPosition(new LogicalPosition(125, 50))
  })
}) */
</script>

<style lang="scss">
img {
  width: 55%;
  height: 55%;
  position: fixed;
  padding: 5px;
  bottom: 0;
  left: -5px;
  transition: .1s;
  opacity: .5;
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
  flex-direction: column;
  gap: 5px;

  &>* {
    display: flex;
    gap: 5px;
  }

  button {
    padding-inline: 6px;
    font-size: 12px;
  }
}

html:hover .details {
  opacity: .5;
}

html:hover img {
  width: 100%;
  height: 100%;
  padding: 0;
  opacity: 1;
}

html:hover #__nuxt {
  background-color: rgba(#9a0000, 0);
  border: 2px solid rgba(#d50000, 0);
}
</style>