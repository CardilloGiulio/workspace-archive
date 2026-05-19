import {
  SUPPORTED_RIGID_BODY_SHAPES,
  SUPPORTED_RIGID_BODY_TYPES,
  SUPPORTED_SHAPES,
  type RigidBodyData,
  type RigidBodyShape,
  type RigidBodyType,
  type SceneObjectData,
  type ShapeType,
  type Vector3Tuple,
} from "../types/sceneObjectData";

import {
  debugStep,
  debugOk,
  debugWarn,
} from "../debug/debugLogger";

const jsonModules = import.meta.glob<unknown>(
  "../json/scene-objects/*.json",
  {
    eager: true,
    import: "default",
  }
);

export function loadObjectsFromJsonFolder(): SceneObjectData[] {
  debugStep("objectLoader", "Searching object JSON files");

  const jsonFiles = Object.entries(jsonModules);

  if (jsonFiles.length === 0) {
    debugWarn(
      "objectLoader",
      "No JSON files found in src/json/scene-objects/"
    );

    return [];
  }

  debugOk("objectLoader", `JSON files found: ${jsonFiles.length}`);

  const loadedObjects: SceneObjectData[] = [];
  let rejectedObjects = 0;

  for (const [filePath, jsonData] of jsonFiles) {
    const possibleObjects = Array.isArray(jsonData) ? jsonData : [jsonData];

    for (const possibleObject of possibleObjects) {
      if (isSceneObjectData(possibleObject)) {
        loadedObjects.push(possibleObject);
      } else {
        rejectedObjects++;
        debugWarn("objectLoader", `Rejected invalid object from ${filePath}`);
      }
    }
  }

  debugOk("objectLoader", `Valid objects loaded: ${loadedObjects.length}`);

  if (rejectedObjects > 0) {
    debugWarn("objectLoader", `Rejected objects: ${rejectedObjects}`);
  }

  return loadedObjects;
}

function isSceneObjectData(value: unknown): value is SceneObjectData {
  if (!isRecord(value)) {
    return false;
  }

  if (typeof value.name !== "string") {
    return false;
  }

  if (!isShapeType(value.shape)) {
    return false;
  }

  if (!isOptionalNumber(value.width)) return false;
  if (!isOptionalNumber(value.height)) return false;
  if (!isOptionalNumber(value.depth)) return false;
  if (!isOptionalNumber(value.size)) return false;
  if (!isOptionalNumber(value.diameter)) return false;

  if (!isOptionalVector3Tuple(value.position)) return false;
  if (!isOptionalVector3Tuple(value.rotation)) return false;
  if (!isOptionalVector3Tuple(value.rotationDegrees)) return false;
  if (!isOptionalVector3Tuple(value.color)) return false;

  if (!isOptionalString(value.image)) return false;
  if (!isOptionalString(value.title)) return false;
  if (!isOptionalString(value.description)) return false;
  if (!isOptionalString(value.externalUrl)) return false;

  if (!isOptionalBoolean(value.isPickable)) return false;
  if (!isOptionalBoolean(value.collision)) return false;

  if (!isOptionalRigidBodyData(value.rigidBody)) return false;

  return true;
}

function isRigidBodyData(value: unknown): value is RigidBodyData {
  if (!isRecord(value)) {
    return false;
  }

  if (typeof value.enabled !== "boolean") {
    return false;
  }

  if (!isRigidBodyType(value.type)) {
    return false;
  }

  if (!isOptionalRigidBodyShape(value.shape)) return false;

  if (!isOptionalNumber(value.mass)) return false;
  if (!isOptionalNumber(value.friction)) return false;
  if (!isOptionalNumber(value.restitution)) return false;

  return true;
}

function isOptionalRigidBodyData(
  value: unknown
): value is RigidBodyData | undefined {
  return value === undefined || isRigidBodyData(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isShapeType(value: unknown): value is ShapeType {
  return (
    typeof value === "string" &&
    SUPPORTED_SHAPES.includes(value as ShapeType)
  );
}

function isRigidBodyType(value: unknown): value is RigidBodyType {
  return (
    typeof value === "string" &&
    SUPPORTED_RIGID_BODY_TYPES.includes(value as RigidBodyType)
  );
}

function isRigidBodyShape(value: unknown): value is RigidBodyShape {
  return (
    typeof value === "string" &&
    SUPPORTED_RIGID_BODY_SHAPES.includes(value as RigidBodyShape)
  );
}

function isOptionalRigidBodyShape(
  value: unknown
): value is RigidBodyShape | undefined {
  return value === undefined || isRigidBodyShape(value);
}

function isOptionalNumber(value: unknown): boolean {
  return value === undefined || typeof value === "number";
}

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === "string";
}

function isOptionalBoolean(value: unknown): boolean {
  return value === undefined || typeof value === "boolean";
}

function isOptionalVector3Tuple(
  value: unknown
): value is Vector3Tuple | undefined {
  return value === undefined || isVector3Tuple(value);
}

function isVector3Tuple(value: unknown): value is Vector3Tuple {
  return (
    Array.isArray(value) &&
    value.length === 3 &&
    value.every((item) => typeof item === "number")
  );
}