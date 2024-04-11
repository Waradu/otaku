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
    init() {
      pet.current.animation = animations.start;
      pet.current.mood = "normal";
      let newVariantIndex = this.selectAnimationVariant(
        animations.start.default[pet.current.mood].animations
      );
      if (newVariantIndex !== -1) {
        pet.current.variant = newVariantIndex;
      }
      pet.current.queue.push({
        flow: animations.idle,
        type: "default",
      });
    },
    setMoodType(moodType: MoodType) {
      pet.current.mood = moodType;
      pet.current.frame = 0;
      pet.current.variant = 0;
    },
    switchAnimation(animation: AnimationTypes, force: boolean = false) {
      if (force) {
        pet.current.frame = 0;
        pet.current.variant = 0;
        pet.current.animation = animations[animation];
        pet.current.queue = [];
        return;
      }

      var animationFlow = pet.current.animation;
      var animationCollection = animationFlow?.[pet.current.flow];
      var animationMood = animationCollection?.[pet.current.mood];
      var animationVariant = animationMood?.animations[pet.current.variant];
      var animationFrame = animationVariant?.frames[pet.current.frame];

      if (pet.current.queue.length != 0) {
        if (
          pet.current.queue[pet.current.queue.length - 1].flow.name == animation
        ) {
          var animationFlow =
            pet.current.queue[pet.current.queue.length - 1].flow;
          var animationCollection = animationFlow?.[pet.current.flow];
          var animationMood = animationCollection?.[pet.current.mood];
          var animationVariant = animationMood?.animations[pet.current.variant];
          var animationFrame = animationVariant?.frames[pet.current.frame];
        }
      }

      if (
        !animationFlow ||
        !animationCollection ||
        !animationMood ||
        !animationVariant ||
        !animationFrame
      ) {
        this.reset();
        return;
      }

      if (animationCollection.canBeInterrupted) {
        pet.current.frame = 0;
        pet.current.variant = 0;
        pet.current.animation = animations[animation];
        pet.current.queue = [];
      } else {
        if (pet.current.animation.end != null) {
          pet.current.queue.push({
            flow: pet.current.animation,
            type: "end",
          });
        }

        if (animations[animation].start != null) {
          pet.current.queue.push({
            flow: animations[animation],
            type: "start",
          });
        }

        pet.current.queue.push({
          flow: animations[animation],
          type: "default",
        });
      }
    },
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
      ) {
        this.reset();
        return;
      }

      pet.current.frame += 1;

      if (pet.current.frame < animationVariant.frames.length) return;

      pet.current.frame = 0;

      if (pet.current.queue.length == 0) {
        let newVariantIndex = this.selectAnimationVariant(
          animationMood.animations
        );
        if (newVariantIndex !== -1) {
          pet.current.variant = newVariantIndex;
        }
      } else {
        pet.current.variant = 0;
        const nextInQueue = pet.current.queue.shift();
        if (!nextInQueue) {
          this.reset();
          return;
        }
        pet.current.animation = nextInQueue.flow;
        pet.current.flow = nextInQueue.type;

        const newAnimationFlow = pet.current.animation;
        const newAnimationCollection = newAnimationFlow?.[pet.current.flow];
        const newAnimationMood = newAnimationCollection?.[pet.current.mood];
        const newAnimationVariant =
          newAnimationMood?.animations[pet.current.variant];
        const newAnimationFrame =
          newAnimationVariant?.frames[pet.current.frame];

        if (
          !newAnimationFlow ||
          !newAnimationCollection ||
          !newAnimationMood ||
          !newAnimationVariant ||
          !newAnimationFrame
        ) {
          this.reset();
          return;
        }

        let newVariantIndex = this.selectAnimationVariant(
          newAnimationMood.animations
        );
        if (newVariantIndex !== -1) {
          pet.current.variant = newVariantIndex;
        }
      }
    },
    reset() {
      pet.current.frame = 0;
      pet.current.variant = 0;
      pet.current.mood = "normal";
      pet.current.flow = "default";
      pet.current.queue = [];
      pet.current.animation = animations.idle;
      this.init();
      console.log("animation reset due to error");
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
