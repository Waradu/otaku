interface Frame {
  speed: number;
}

interface Animation {
  frames: Frame[];
  rarity: number;
}

interface AnimationVariations {
  animations: Animation[];
}

interface AnimationCollection {
  normal: AnimationVariations;
  happy: AnimationVariations | null;
  ill: AnimationVariations | null;
  poorCondition: AnimationVariations | null;
}

interface AnimationFlow {
  name: "idle",
  start: AnimationCollection | null;
  default: AnimationCollection;
  end: AnimationCollection | null;
  canBeInterrupted: boolean;
}

interface Animations {
  idle: AnimationFlow;
}

var animations: Animations = {
  idle: {
    name: "idle",
    start: null,
    default: {
      normal: {
        animations: [
          {
            frames: [
              {
                speed: 250,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 375,
              },
              {
                speed: 125,
              },
              {
                speed: 250,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
            ],
            rarity: 1
          },
          {
            frames: [
              {
                speed: 250,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 375,
              },
              {
                speed: 125,
              },
              {
                speed: 250,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
            ],
            rarity: 1
          },
          {
            frames: [
              {
                speed: 250,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 375,
              },
              {
                speed: 125,
              },
              {
                speed: 250,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
            ],
            rarity: 1
          },
        ],
      },
      happy: null,
      ill: null,
      poorCondition: null,
    },
    end: null,
    canBeInterrupted: true,
  },
};

type MoodType = "normal" | "happy" | "ill" | "poorCondition";

interface Data {
  name: string;
  xp: number;
  money: number;
  mood: number;
  moodType: MoodType;
  energy: number;
  hunger: number;
  thirst: number;
  isHappy: boolean;
  isIll: boolean;
  isInBadCondition: boolean;
}

interface Pet {
  data: Data;
  current_animation: AnimationFlow;
  fallback_animation: AnimationFlow;
  current_frame: number;
  selectedAnimationVariant: number;
}

interface FrameResponse {
  path: string;
  speed: number;
}

function selectAnimationVariant(animations: Animation[]): number {
  const weightedList: Animation[] = [];

  animations.forEach(animation => {
    const weight = animation.rarity >= 1 ? animation.rarity : 1 / animation.rarity;
    for (let i = 0; i < weight; i++) {
      weightedList.push(animation);
    }
  });

  const randomIndex = Math.floor(Math.random() * weightedList.length);
  return animations.indexOf(weightedList[randomIndex]);
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
    selectedAnimationVariant: 0
  });

  const controller = {
    timePassed: 0,
    setName(name: string) {
      pet.data.name = name;
    },
    calculateTick() {
      const moodType = pet.data.moodType;
      const currentMoodAnimations = pet.current_animation.default[moodType as keyof AnimationCollection];

      if (currentMoodAnimations && currentMoodAnimations.animations.length > 0) {
        pet.current_frame += 1;

        if (pet.current_frame >= currentMoodAnimations.animations[pet.selectedAnimationVariant].frames.length) {
          pet.current_frame = 0;
          pet.selectedAnimationVariant = selectAnimationVariant(currentMoodAnimations.animations);
        }
      }
      this.timePassed += 1;
    },
    getCurrentFramePath(): FrameResponse {
      const currentMoodAnimations =
        pet.current_animation.default[pet.data.moodType as keyof AnimationCollection];

      if (
        currentMoodAnimations &&
        currentMoodAnimations.animations.length > 0
      ) {
        const frameResponse: FrameResponse = {
          path: "/"+pet.current_animation.name+"/"+pet.data.moodType+"/"+(pet.selectedAnimationVariant+1).toString()+"/"+pet.current_frame.toString().padStart(3, "0")+".png",
          speed: currentMoodAnimations.animations[pet.selectedAnimationVariant].frames[pet.current_frame].speed,
        }
        return frameResponse;
      } else {
        return {
          path: "/notfound.png",
          speed: 1000
        };
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
