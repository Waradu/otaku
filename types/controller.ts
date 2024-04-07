import { animations } from "~/types/animations";

export interface Frame {
  speed: number;
}

export interface Animation {
  frames: Frame[];
  rarity: number;
}

export interface AnimationVariations {
  animations: Animation[];
}

export interface AnimationCollection {
  normal: AnimationVariations;
  happy: AnimationVariations | null;
  ill: AnimationVariations | null;
  poorCondition: AnimationVariations | null;
  canBeInterrupted: boolean;
}

export type AnimationFlowType = "start" | "default" | "end";
export type AnimationTypes = "idle" | "raise";
export interface AnimationFlow {
  name: AnimationTypes;
  start: AnimationCollection | null;
  default: AnimationCollection;
  end: AnimationCollection | null;
}

export interface Animations {
  idle: AnimationFlow;
  raise: AnimationFlow;
}

export type MoodType = "normal" | "happy" | "ill" | "poorCondition";

export interface PetData {
  name: string;
  xp: number;
  money: number;
  mood: number;
  energy: number;
  hunger: number;
  thirst: number;
}

export interface AnimationData {
  animation: AnimationFlow;
  frame: number;
  variant: number;
  mood: MoodType;
  flow: AnimationFlowType;
  queue: QueueItem[];
}

export interface Pet {
  petData: PetData;
  current: AnimationData;
}

export interface FrameResponse {
  path: string;
  speed: number;
}

export interface QueueItem {
  flow: AnimationFlow;
  type: AnimationFlowType;
}