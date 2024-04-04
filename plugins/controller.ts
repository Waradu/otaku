import { useControllerStore } from '~/store/controller';

const controllerStore = useControllerStore();

export default defineNuxtPlugin((nuxtApp) => {
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
