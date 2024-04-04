<template>
  <div>
    <div data-tauri-drag-region class="main" @click="$controller.increment();console.log($controller.getCounter())" :class="{'dragging': isDragging}">
      {{ $controller.getCounter() }}
    </div>
  </div>
</template>

<script lang="ts">
import { appWindow, LogicalPosition } from '@tauri-apps/api/window';
const { $controller } = useNuxtApp()

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
      const pos = await appWindow.innerPosition();
      this.pos = pos;
    });
  },
  methods: {
    async move() {
      await appWindow.setPosition(new LogicalPosition(this.pos.x, this.pos.y))
    },
    async moveRight() {
      this.pos = await appWindow.innerPosition()
      this.pos.x += 10
      this.move()
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
