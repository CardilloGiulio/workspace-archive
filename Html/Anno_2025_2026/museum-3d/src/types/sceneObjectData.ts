export type ObjectType = "primitive" | "model" | "group";

export type ShapeType = "box" | "sphere" | "plane";

export type Vector3Tuple = [number, number, number];

export type RigidBodyType = "static" | "dynamic";

export type RigidBodyShape = "auto" | "box" | "sphere";

export type RigidBodyData = {
  enabled: boolean;
  type: RigidBodyType;
  shape?: RigidBodyShape;
  mass?: number;
  friction?: number;
  restitution?: number;
};

export type SceneObjectData = {
  name: string;

  objectType?: ObjectType;
  parentGroup?: string;

  shape?: ShapeType;
  modelKey?: string;

  width?: number;
  height?: number;
  depth?: number;
  size?: number;
  diameter?: number;

  position?: Vector3Tuple;
  rotation?: Vector3Tuple;
  rotationDegrees?: Vector3Tuple;
  scale?: Vector3Tuple;

  color?: Vector3Tuple;
  debugColor?: Vector3Tuple;
  image?: string;

  title?: string;
  description?: string;
  externalUrl?: string;

  isPickable?: boolean;
  collision?: boolean;

  visible?: boolean;
  visibility?: number;
  alpha?: number;
  colliderOnly?: boolean;

  rigidBody?: RigidBodyData;
};

export const SUPPORTED_OBJECT_TYPES: readonly ObjectType[] = [
  "primitive",
  "model",
  "group",
];

export const SUPPORTED_SHAPES: readonly ShapeType[] = [
  "box",
  "sphere",
  "plane",
];

export const SUPPORTED_RIGID_BODY_TYPES: readonly RigidBodyType[] = [
  "static",
  "dynamic",
];

export const SUPPORTED_RIGID_BODY_SHAPES: readonly RigidBodyShape[] = [
  "auto",
  "box",
  "sphere",
];
