import { animations } from "~/types/animations";
import type { Pet, Animation, QueueItem, MoodType, AnimationTypes, AnimationCollection, FrameResponse } from "~/types/controller";

function selectAnimationVariant(animations: Animation[]): number {
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
}

export default defineNuxtPlugin((nuxtApp) => {
  const pet: Pet = reactive({
    data: {
      name: "Joshua",
      xp: 0,
      money: 0,
      mood: 100,
      moodType: "normal",
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
    selectedAnimationVariant: 0,
    animationFlowType: "default",
  });
  var queue: QueueItem[] = [];

  const controller = {
    timePassed: 0,
    setName(name: string) {
      pet.data.name = name;
    },
    setMoodType(moodType: MoodType) {
      pet.data.moodType = moodType;
      pet.current_frame = 0;
      pet.selectedAnimationVariant = 0;
    },
    switchAnimation(animation: AnimationTypes, force: boolean = false) {
      if (pet.current_animation.canBeInterrupted || force) {
        pet.current_frame = 0;
        pet.selectedAnimationVariant = 0;
        pet.current_animation = animations[animation];
      } else {
        if (pet.current_animation.end != null) {
          queue.push({
            animationFlow: pet.current_animation,
            animationFlowType: "end",
          });
        }

        if (animations[animation].start != null) {
          queue.push({
            animationFlow: animations[animation],
            animationFlowType: "start",
          });
        }

        queue.push({
          animationFlow: animations[animation],
          animationFlowType: "default",
        });

        console.log(queue);
      }
    },
    calculateTick() {
      const moodType = pet.data.moodType;
      const currentMoodAnimations =
        pet.current_animation.default[moodType as keyof AnimationCollection];

      if (
        currentMoodAnimations &&
        currentMoodAnimations.animations.length > 0
      ) {
        pet.current_frame += 1;

        if (
          pet.current_frame >=
          currentMoodAnimations.animations[pet.selectedAnimationVariant].frames
            .length
        ) {
          pet.current_frame = 0;
          if (queue.length == 0) {
            let newVariantIndex = selectAnimationVariant(
              currentMoodAnimations.animations
            );
            if (newVariantIndex !== -1) {
              pet.selectedAnimationVariant = newVariantIndex;
            }
          } else {
            pet.selectedAnimationVariant = 0;
            pet.current_frame = 0;
            const nextItemInQueue = queue.shift()!;
            pet.current_animation = nextItemInQueue.animationFlow;
            pet.animationFlowType = nextItemInQueue.animationFlowType;
            let newVariantIndex = selectAnimationVariant(
              currentMoodAnimations.animations
            );
            if (newVariantIndex !== -1) {
              pet.selectedAnimationVariant = newVariantIndex;
            } else {
              pet.selectedAnimationVariant = 0;
            }
            this.timePassed = 0;
            return;
          }
        }
      }
      this.timePassed += 1;
    },
    getCurrentFramePath(): FrameResponse {
      const currentMoodAnimations =
        pet.current_animation.default[
          pet.data.moodType as keyof AnimationCollection
        ];

      if (
        currentMoodAnimations &&
        currentMoodAnimations.animations.length > 0
      ) {
        const frameResponse: FrameResponse = {
          path:
            "/" +
            pet.current_animation.name +
            "/" +
            pet.animationFlowType +
            "/" +
            pet.data.moodType +
            "/" +
            (pet.selectedAnimationVariant + 1).toString() +
            "/" +
            pet.current_frame.toString().padStart(3, "0") +
            ".png",
          speed:
            currentMoodAnimations.animations[pet.selectedAnimationVariant]
              .frames[pet.current_frame].speed,
        };
        return frameResponse;
      } else {
        return {
          path: "/notfound.png",
          speed: 1000,
        };
      }
    },
  };

  return {
    provide: {
      controller: controller,
      pet: pet,
    },
  };
});
