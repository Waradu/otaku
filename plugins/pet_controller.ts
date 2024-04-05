interface Animation {
  name: string;
  frames: number;
  variations: string[];
  hasHappy: boolean;
  hasIll: boolean;
  hasBadCondition: boolean;
  can_be_interrupted: boolean;
}

interface Animations {
  idle: Animation;
  walk: Animation;
}

var animations: Animations = {
  idle: {
    name: "idle",
    frames: 3,
    variations: [],
    hasHappy: true,
    hasIll: true,
    hasBadCondition: true,
    can_be_interrupted: true,
  },
  walk: {
    name: "walk",
    frames: 4,
    variations: [],
    hasHappy: true,
    hasIll: true,
    hasBadCondition: true,
    can_be_interrupted: true,
  },
};

interface Data {
  name: string;
  xp: number;
  money: number;
  mood: number;
  energy: number;
  hunger: number;
  thirst: number;
  isHappy: boolean;
  isIll: boolean;
  isInBadCondition: boolean;
}

interface Pet {
  data: Data;
  current_animation: Animation;
  fallback_animation: Animation;
  current_frame: number;
}

export default defineNuxtPlugin((nuxtApp) => {
  const fps = 4;

  const pet: Pet = reactive({
    data: {
      name: "Joshua",
      xp: 0,
      money: 0,
      mood: 100,
      energy: 100,
      hunger: 100,
      thirst: 100,
      isHappy: true,
      isIll: false,
      isInBadCondition: false,
    },
    current_animation: animations.idle,
    fallback_animation: animations.idle,
    current_frame: 0,
  });

  const controller = {
    fps: fps,
    timePassed: 0,
    setName(name: string) {
      pet.data.name = name;
    },
    calculateTick() {
      pet.current_frame = (pet.current_frame + 1) % pet.current_animation.frames;
      this.timePassed += 1
      if (this.timePassed % 100 === 0) {
        pet.data.hunger -= 1;
        pet.data.thirst -= 2;
      }
    }
  };

  return {
    provide: {
      controller: controller,
      pet: pet,
    },
  };
});
