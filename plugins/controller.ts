import { createPinia } from 'pinia';
import { useControllerStore } from '~/store/controller';

export default defineNuxtPlugin((nuxtApp) => {
  const controllerStore = useControllerStore();

  const controller = {
    increment() {
      controllerStore.increment()
    },
    getCounter() {
      return controllerStore.count;
    }
  }

  return {
    provide: {
      controller: controller
    },
  };
})
