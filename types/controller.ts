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
  happy: AnimationVariations;
  ill: AnimationVariations;
  poorCondition: AnimationVariations;
  canBeInterrupted: boolean;
}

export type AnimationFlowType = "start" | "default" | "end";
export type AnimationTypes = "idle" | "raise" | "start";
export interface AnimationFlow {
  name: AnimationTypes;
  start: AnimationCollection | null;
  default: AnimationCollection;
  end: AnimationCollection | null;
}

export interface Animations {
  idle: AnimationFlow;
  raise: AnimationFlow;
  start: AnimationFlow;
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

export type EventNames = 'pet-data' | 'set-mood' | 'set-animation' | 'frame-data' | 'reset' | 'set-speed' | 'pause-play' | 'resend' | 'close'
export type Switch = { type: AnimationTypes, force: boolean }
export type EventData = Pet | MoodType | Switch | FrameResponse | {} | number