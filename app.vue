<template>
  <div>
    <div data-tauri-drag-region class="main" @click="moveRight" :class="{'dragging': isDragging}"></div>
  </div>
</template>

<script lang="ts">
import { appWindow, LogicalPosition } from '@tauri-apps/api/window';

const init_pos = await appWindow.innerPosition()

export default {
  data() {
    return {
      pos: init_pos,
      isDragging: false
    }
  },
  async mounted() {
    await appWindow.onMoved(async () => {
      this.pos = await appWindow.innerPosition();
    });

    document.querySelector(".main").addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
  },
  methods: {
    async move() {
      await appWindow.setPosition(new LogicalPosition(this.pos.x, this.pos.y))
    },
    async moveRight() {
      this.pos = await appWindow.innerPosition()
      this.pos.x += 20
      this.move()
    },
    handleMouseDown() {
      this.isDragging = true;
    },
    handleMouseUp() {
      console.log("tr");
      this.isDragging = false;
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
