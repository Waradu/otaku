<template>
  <div>
    <div class="main" data-tauri-drag-region :class="{ 'dragging': isDragging }">
      {{ pos.x }}, {{ pos.y }}
      <br>
      {{ isDragging }}
    </div>
  </div>
</template>

<script lang="ts">
import { appWindow, LogicalPosition } from '@tauri-apps/api/window';

export default {
  data() {
    return {
      pos: { x: 0, y: 0 },
      isDragging: false,
    }
  },
  async mounted() {
    const init_pos = await appWindow.innerPosition();
    this.pos = init_pos;

    await appWindow.onMoved(async () => {
      const pos = await appWindow.innerPosition();
      this.pos = pos;
    });

    window.addEventListener("mouseover", () => {
      this.isDragging = true
    })
  },
  methods: {
    async move() {
      await appWindow.setPosition(new LogicalPosition(this.pos.x, this.pos.y));
    },
    async moveRight() {
      this.pos = await appWindow.innerPosition();
      this.pos.x += 10;
      await this.move();
    }
  }
}
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#__nuxt {
  background-color: transparent;
  width: 250px;
  height: 250px;
  user-select: none;
}

.main {
  width: 250px;
  height: 250px;
  background-color: red;
  z-index: 100;
  position: fixed;
}

.dragging {
  background-color: green !important;
}
</style>
