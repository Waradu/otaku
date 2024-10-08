<template>
  <div class="main">
    <img :src="`/pet${image}`" alt="pet" />
    <div class="actions">
      <button @click="dev">Dev</button>
      <button @click="close">Close</button>
    </div>
    <div class="overlay">
      <div class="body"></div>
      <!-- data-tauri-drag-region -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  LogicalPosition,
  LogicalSize,
  PhysicalPosition,
  PhysicalSize,
  WebviewWindow,
  appWindow,
} from "@tauri-apps/api/window";
const { $controller, $pet } = useNuxtApp();
import { emit, listen } from "@tauri-apps/api/event";
import type {
  EventNames,
  EventData,
  AnimationTypes,
  MoodType,
  Switch,
} from "~/types/controller";

function send(name: EventNames, data: EventData = {}) {
  emit(name, data);
}

const image = ref("");

function switchAnimation(animation: AnimationTypes, force: boolean = false) {
  $controller.switchAnimation(animation, force);
  const data = $controller.getCurrentFramePath();
  image.value = data.path;
}

await listen("down", (event) => {
  switchAnimation("raise", true);
});

await listen("up", (event) => {
  switchAnimation("idle", false);
});

async function dev() {
  const wvw = new WebviewWindow("settings", {
    url: "settings",
    fullscreen: false,
    height: 500,
    resizable: false,
    title: "Otaku - Settings",
    width: 300,
    decorations: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    center: false,
    maxHeight: 500,
    maxWidth: 300,
    minHeight: 500,
    minWidth: 300,
  });

  wvw.setPosition(await appWindow.innerPosition());
}

function close() {
  send("close");
  appWindow.close();
}

/* $controller.init() */
$controller.save();

var paused = false;
var speed: number = 0;

await listen("pause-play" as EventNames, (event: { payload: {} }) => {
  paused = !paused;
});

await listen("reset" as EventNames, (event: { payload: {} }) => {
  $controller.reset();
});

await listen("set-speed" as EventNames, (event: { payload: number }) => {
  speed = event.payload;
});

await listen("set-mood" as EventNames, (event: { payload: MoodType }) => {
  $controller.setMoodType(event.payload);
});

await listen("set-animation" as EventNames, (event: { payload: Switch }) => {
  switchAnimation(event.payload.type, event.payload.force);
});

function tick() {
  const data = $controller.getCurrentFramePath();
  image.value = data.path;
  var realspeed = Number(data.speed) + Number(speed);

  if (!paused) {
    $controller.calculateTick();
    send("pet-data", $pet);
    send("frame-data", data);
  } else {
    realspeed = 1;
  }

  setTimeout(() => {
    requestAnimationFrame(tick);
  }, realspeed);
}

send("resend");
tick();

/* onMounted(() => {
  document.querySelector(".main")?.addEventListener("mousedown", async () => {
    await appWindow.setCursorPosition(new LogicalPosition(125, 50))
  })
}) */
</script>

<style lang="scss">
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
  max-width: 250px;
  max-height: 250px;
  user-select: none;
  overflow: hidden;
  font-size: 14px;
}

.main {
  img {
    width: 100%;
    height: 100%;
    position: fixed;
    padding: 0px;
    bottom: 0;
    left: 0;
    transition: 0.1s;
    opacity: 1;
  }

  .actions {
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

    & > * {
      display: flex;
      gap: 5px;
    }

    button {
      padding-inline: 6px;
      font-size: 12px;
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    pointer-events: none;

    * {
      pointer-events: all;
    }

    .head {
      position: absolute;
      top: 20px;
      left: 50%;
      translate: -50% 0;
      width: 80px;
      height: 80px;

      .jaw {
        position: absolute;
        bottom: 5px;
        left: 5px;
        width: 30px;
        height: 15px;
      }
    }

    .body {
      position: absolute;
      bottom: 80px;
      left: 50%;
      translate: -50% 0;
      width: 90px;
      height: 180px;
    }
  }
}

/* #__nuxt:has(.main) {
  font-family: sans-serif;
  background-color: rgba(#9a0000, .2);
  border: 2px solid rgba(#d50000, .1);
  color: #fff;
  padding: 10px
} */
</style>
