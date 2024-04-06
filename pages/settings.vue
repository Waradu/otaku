<template>
  <div>
    <div class="main" data-tauri-drag-region>
      <button @click="close">close</button>
      <button @click="changeMoodType('happy')">Happy</button>
      <button @click="changeMoodType('normal')">Normal</button>
      <button @click="changeMoodType('ill')">Ill</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { appWindow } from '@tauri-apps/api/window';
import { emit } from '@tauri-apps/api/event';

const { $controller, $pet } = useNuxtApp()

function close() {
  appWindow.close()
}

function changeMoodType(moodType: string) {
  emit('changeMoodType', { moodType: moodType });
}
</script>

<style lang="scss"></style>