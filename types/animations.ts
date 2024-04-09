import type { Animations } from "~/types/controller";

export var animations: Animations = {
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
            rarity: 1,
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
            rarity: 1,
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
            rarity: 0.3,
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
            rarity: 1,
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
            rarity: 1,
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
            rarity: 0.5,
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
            rarity: 1,
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
            rarity: 0.3,
          },
        ],
      },
      poorCondition: {
        animations: [
          {
            frames: [
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 375 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 500 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 375 },
              { speed: 375 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
            ],
            rarity: 1,
          },
          {
            frames: [
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 375 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 500 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 375 },
              { speed: 375 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
            ],
            rarity: 1,
          },
        ],
      },
      canBeInterrupted: true,
    },
    end: null,
  },
  raise: {
    name: "raise",
    start: null,
    default: {
      normal: {
        animations: [
          {
            frames: [
              { speed: 500 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 375 },
            ],
            rarity: 1,
          },
          {
            frames: [
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
            ],
            rarity: 1,
          },
        ],
      },
      happy: {
        animations: [
          {
            frames: [
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
            ],
            rarity: 1,
          },
        ],
      },
      ill: {
        animations: [
          {
            frames: [
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 625 },
            ],
            rarity: 1,
          },
        ],
      },
      poorCondition: {
        animations: [
          {
            frames: [
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
              { speed: 125 },
            ],
            rarity: 1,
          },
        ],
      },
      canBeInterrupted: false,
    },
    end: {
      normal: {
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
            ],
            rarity: 1,
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
            ],
            rarity: 1,
          },
        ],
      },
      ill: {
        animations: [
          {
            frames: [{ speed: 125 }, { speed: 125 }, { speed: 125 }],
            rarity: 1,
          },
        ],
      },
      poorCondition: {
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
            ],
            rarity: 1,
          },
        ],
      },
      canBeInterrupted: false,
    },
  },
};
