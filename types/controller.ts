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

export interface Data {
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

export interface Pet {
  data: Data;
  current_animation: AnimationFlow;
  fallback_animation: AnimationFlow;
  current_frame: number;
  selectedAnimationVariant: number;
  animationFlowType: AnimationFlowType;
}

export interface FrameResponse {
  path: string;
  speed: number;
}

export interface QueueItem {
  animationFlow: AnimationFlow;
  animationFlowType: AnimationFlowType;
}