<template>
  <div class="settings">
    <div class="details">
      <div class="name">Name: {{ petData.petData.name }}</div>
      <div class="current_animation">Mood: {{ petData.current.mood }} | Variant: {{ petData.current.variant + 1 }}
      </div>
      <div class="current_animation">Frames: {{ ticks }} | Frame: {{ petData.current.frame }}</div>
      <div class="path">/pet{{ frameData.path }}</div>
      <div class="queue">
        Queue: [
        <div class="item" v-for="item in petData.current.queue">
          - Flow: {{ item.flow.name }} | Type: {{ item.type }}
        </div>
        ]
      </div>
    </div>
    <div class="main" data-tauri-drag-region>
      <div class="actions">
        <button @click="send('reset');ticks=0">Reset</button>
        <button @click="send('pause-play')">Pause/Play</button>
        <button @click="close">close</button>
      </div>
      <div class="animation">
        <button @click="send('set-animation', { type:'idle', force: false } as EventData)">Idle</button>
        <button @click="send('set-animation', { type:'raise', force: false } as EventData)">Raise</button>
      </div>
      <div class="state">
        <button @click="send('set-mood', 'happy');mood='happy'">Happy</button>
        <button @click="send('set-mood', 'normal');mood='normal'">Normal</button>
        <button @click="send('set-mood', 'ill');mood='ill'">Ill</button>
        <button @click="send('set-mood', 'poorCondition');mood='poorCondition'">Poor</button>
      </div>
      <div class="speed">
        Speed:
        <input @input="send('set-speed', speed);" v-model="speed" type="range" name="" id="" min="0" value="0"
          step="200" max="2000">
        +{{ speed }}ms
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { appWindow } from '@tauri-apps/api/window';
import { emit, listen } from '@tauri-apps/api/event';
import type { EventNames, EventData, PetData, FrameResponse, Pet, MoodType } from '~/types/controller'
import { animations } from '~/types/animations';

function send(name: EventNames, data: EventData = {}) {
  emit(name, data)
}

var speed = ref(0)
var mood = ref('normal' as MoodType)

var ticks = 0;

var petData = ref({
  petData: {
    name: "Joshua",
    xp: 0,
    money: 0,
    mood: 100,
    energy: 100,
    hunger: 100,
    thirst: 100,
  },
  current: {
    animation: animations.idle,
    frame: 0,
    variant: 0,
    mood: "normal",
    flow: "default",
    queue: [],
  },
} as Pet)

const frameData = ref({
  path: "",
  speed: 0
} as FrameResponse)

await listen('pet-data' as EventNames, (event: { payload: Pet }) => {
  petData.value = event.payload
  ticks++
})

await listen('frame-data' as EventNames, (event: { payload: FrameResponse }) => {
  frameData.value = event.payload
})

await listen('resend' as EventNames, (event: { payload: {} }) => {
  send('set-speed', speed.value);
  send('set-mood', mood.value);
})

await listen('close' as EventNames, (event: { payload: {} }) => {
  close()
})

function close() {
  appWindow.close()
}
</script>

<style lang="scss">
html,
body,
#__nuxt {
  background-color: transparent;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
  font-size: 14px;
}

#__nuxt {
  font-family: sans-serif;
  background-color: black;
  color: green;
  padding: 20px;
  border-radius: 8px;
}

.settings {
  .main {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
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
}
</style>
