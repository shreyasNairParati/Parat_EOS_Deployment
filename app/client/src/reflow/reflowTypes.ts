import type { OccupiedSpace } from "constants/CanvasEditorConstants";

export const HORIZONTAL_RESIZE_MIN_LIMIT = 2;
export const VERTICAL_RESIZE_MIN_LIMIT = 4;

export enum ReflowDirection {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  TOPLEFT = "TOP|LEFT",
  TOPRIGHT = "TOP|RIGHT",
  BOTTOMLEFT = "BOTTOM|LEFT",
  BOTTOMRIGHT = "BOTTOM|RIGHT",
  UNSET = "UNSET",
}

export enum SpaceAttributes {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

export enum MathComparators {
  min = "min",
  max = "max",
}

export interface GridProps {
  parentColumnSpace: number;
  parentRowSpace: number;
  maxGridColumns: number;
  paddingOffset?: number;
}

export interface CollisionAccessors {
  direction: SpaceAttributes;
  oppositeDirection: SpaceAttributes;
  perpendicularMax: SpaceAttributes;
  perpendicularMin: SpaceAttributes;
  parallelMax: SpaceAttributes;
  parallelMin: SpaceAttributes;
  mathComparator: MathComparators;
  oppositeMathComparator: MathComparators;
  directionIndicator: 1 | -1;
  isHorizontal: boolean;
  plane: "vertical" | "horizontal";
}

export interface Delta {
  X: number;
  Y: number;
}

export type CollidingSpace = BlockSpace & {
  direction: ReflowDirection;
  collidingValue: number;
  collidingId: string;
  isHorizontal: boolean;
  order: number;
  fixedHeight?: number;
};

export type SecondOrderCollision = BlockSpace & {
  children: {
    [key: string]: BlockSpace & {
      direction: ReflowDirection;
      isHorizontal: boolean;
      processed?: boolean;
    };
  };
};

export interface SecondOrderCollisionMap {
  [key: string]: SecondOrderCollision;
}

export interface MovementLimitMap {
  [key: string]: { canVerticalMove: boolean; canHorizontalMove: boolean };
}
export interface CollidingSpaceMap {
  horizontal: CollisionMap;
  vertical: CollisionMap;
}

export interface CollisionMap {
  [key: string]: CollidingSpace;
}

export type CollisionTree = BlockSpace & {
  direction: ReflowDirection;
  children?: {
    [key: string]: CollisionTree;
  };
  collidingValue: number;
  collidingId: string;
  isHorizontal: boolean;
  order: number;
  fixedHeight?: number;
};

export interface SpaceMovementMap {
  [key: string]: DirectionalMovement[];
}

export interface DirectionalMovement {
  maxMovement: number;
  directionalIndicator: 1 | -1;
  coordinateKey: "X" | "Y";
  isHorizontal: boolean;
}

export interface CollisionTreeCache {
  [spaceId: string]: {
    [direction: string]: {
      value: number;
      occupiedLength?: number;
      occupiedSpace?: number;
      currentEmptySpaces?: number;
      childNode?: CollisionTree;
    };
  };
}

export interface ReflowedSpace {
  X?: number;
  Y?: number;
  width?: number;
  height?: number;
  horizontalOccupiedLength?: number;
  verticalOccupiedLength?: number;
  x?: number;
  y?: number;
  maxX?: number;
  maxY?: number;
  directionX?: ReflowDirection;
  directionY?: ReflowDirection;
  dimensionXBeforeCollision?: number;
  dimensionYBeforeCollision?: number;
  horizontalMaxOccupiedSpace?: number;
  horizontalEmptySpaces?: number;
  verticalMaxOccupiedSpace?: number;
  verticalEmptySpaces?: number;
}

export interface ReflowedSpaceMap {
  [key: string]: ReflowedSpace;
}

export interface PrevReflowState {
  prevSpacesMap: SpaceMap;
  prevCollidingSpaceMap: CollidingSpaceMap;
  prevMovementMap: ReflowedSpaceMap;
  prevSecondOrderCollisionMap: SecondOrderCollisionMap;
}

export type BlockSpace = OccupiedSpace & {
  isDropTarget?: boolean;
  fixedHeight?: number;
};

export interface SpaceMap {
  [id: string]: BlockSpace;
}

export interface DirectionalVariables {
  [key: string]: {
    [direction: string]: [number, number, CollisionAccessors, ReflowDirection];
  };
}

export interface OrientationAccessors {
  primary: "horizontal" | "vertical";
  secondary: "horizontal" | "vertical";
}
