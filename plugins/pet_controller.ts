import { animations } from "~/types/animations";
import type {
  Pet,
  Animation,
  QueueItem,
  MoodType,
  AnimationTypes,
  AnimationCollection,
  FrameResponse,
  AnimationFlow,
  AnimationFlowType,
  AnimationVariations,
  Frame,
} from "~/types/controller";

export default defineNuxtPlugin((nuxtApp) => {
  const pet: Pet = reactive({
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
  });

  const controller = {
    setMoodType(moodType: MoodType) {
      pet.current.mood = moodType;
      pet.current.frame = 0;
      pet.current.variant = 0;
    },
    switchAnimation(animation: AnimationTypes, force: boolean = false) {},
    calculateTick() {
      const animationFlow = pet.current.animation;
      const animationCollection = animationFlow?.[pet.current.flow];
      const animationMood = animationCollection?.[pet.current.mood];
      const animationVariant = animationMood?.animations[pet.current.variant];
      const animationFrame = animationVariant?.frames[pet.current.frame];

      if (
        !animationFlow ||
        !animationCollection ||
        !animationMood ||
        !animationVariant ||
        !animationFrame
      )
        {
          pet.current.frame = 0;
          pet.current.variant = 0;
          pet.current.mood = "normal";
          pet.current.flow = "default";
          pet.current.queue = [];
          pet.current.animation = animations.idle;
          console.log("animation reset due to error");
          return;
        };

      pet.current.frame += 1;

      if (pet.current.frame < animationVariant.frames.length) return;

      pet.current.frame = 0;

      if (pet.current.queue.length == 0) {
        pet.current.variant = 0;
        let newVariantIndex = this.selectAnimationVariant(
          animationMood.animations
        );
        if (newVariantIndex !== -1) {
          pet.current.variant = newVariantIndex;
        }
      }
    },
    getCurrentFramePath(): FrameResponse {
      const notFoundResponse: FrameResponse = {
        path: "/notfound.png",
        speed: 100,
      };

      const animationFlow = pet.current.animation;
      const animationCollection = animationFlow?.[pet.current.flow];
      const animationMood = animationCollection?.[pet.current.mood];
      const animationVariant = animationMood?.animations[pet.current.variant];
      const animationFrame = animationVariant?.frames[pet.current.frame];

      if (
        !animationFlow ||
        !animationCollection ||
        !animationMood ||
        !animationVariant ||
        !animationFrame
      )
        return notFoundResponse;

      const framePath =
        "/" +
        pet.current.animation.name +
        "/" +
        pet.current.flow +
        "/" +
        pet.current.mood +
        "/" +
        (pet.current.variant + 1).toString() +
        "/" +
        pet.current.frame.toString().padStart(3, "0") +
        ".png";

      return {
        path: framePath,
        speed: animationFrame.speed,
      } as FrameResponse;
    },
    selectAnimationVariant(animations: Animation[]): number {
      let totalRarity = 0;
      animations.forEach((animation) => {
        if (animation.rarity > 0) {
          totalRarity += animation.rarity;
        }
      });

      if (totalRarity === 0) return -1;

      let randomPoint = Math.random() * totalRarity;
      for (let i = 0; i < animations.length; i++) {
        if (animations[i].rarity > 0) {
          if (randomPoint < animations[i].rarity) {
            return i;
          }
          randomPoint -= animations[i].rarity;
        }
      }
      return -1;
    },
  };

  return {
    provide: {
      controller: controller,
      pet: pet,
    },
  };
});
