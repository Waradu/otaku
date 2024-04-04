import { defineStore } from 'pinia'

export const useControllerStore = defineStore('controller', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})