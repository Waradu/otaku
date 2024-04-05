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

type AnimationFlowType = "start" | "default" | "end";
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
            rarity: .3
          },
        ],
      },
      happy: {
        animations: [
          {
            frames: [
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
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
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 250,
              },
            ],
            rarity: 1
          },
          {
            frames: [
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
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
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 250,
              },
            ],
            rarity: 1
          },
          {
            frames: [
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
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
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 250,
              },
            ],
            rarity: .5
          },
        ],
      },
      ill: {
        animations: [
          {
            frames: [
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 500,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 500,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 500,
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
            ],
            rarity: 1
          },
          {
            frames: [
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 125,
              },
              {
                speed: 500,
              },
              {
                speed: 125,
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
              {
                speed: 125,
              },
            ],
            rarity: .3
          }
        ]
      },
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
  animationFlowType: AnimationFlowType;
}

interface FrameResponse {
  path: string;
  speed: number;
}

function selectAnimationVariant(animations: Animation[]): number {
  let totalRarity = 0;
  animations.forEach(animation => {
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
    calculateTick() {
      const moodType = pet.data.moodType;
      const currentMoodAnimations = pet.current_animation.default[moodType as keyof AnimationCollection];

      if (currentMoodAnimations && currentMoodAnimations.animations.length > 0) {
        pet.current_frame += 1;
      
        if (pet.current_frame >= currentMoodAnimations.animations[pet.selectedAnimationVariant].frames.length) {
          pet.current_frame = 0;
          let newVariantIndex = selectAnimationVariant(currentMoodAnimations.animations);
          if (newVariantIndex !== -1) {
            pet.selectedAnimationVariant = newVariantIndex;
          }
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
          path: "/"+pet.current_animation.name+"/"+pet.animationFlowType+"/"+pet.data.moodType+"/"+(pet.selectedAnimationVariant+1).toString()+"/"+pet.current_frame.toString().padStart(3, "0")+".png",
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
