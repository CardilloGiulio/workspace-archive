import {
  AbstractMesh,
  Color3,
  ImportMeshAsync,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  TransformNode,
  Vector3,
} from "@babylonjs/core";

import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";

import type { SceneObjectData, Vector3Tuple } from "../types/sceneObjectData";
import { resolveModelUrl } from "../registries/modelRegistry";

import {
  debugOk,
  debugStep,
} from "../debug/debugLogger";

registerBuiltInLoaders();

export async function buildSceneObjects(
  scene: Scene,
  objects: SceneObjectData[]
): Promise<AbstractMesh[]> {
  debugStep("builder", `Building ${objects.length} object(s)`);

  const groups = createGroups(scene, objects);
  const meshes: AbstractMesh[] = [];

  for (const objectData of objects) {
    if (objectData.objectType === "group") {
      continue;
    }

    const builtMeshes = await buildSceneObject(scene, objectData, groups);
    meshes.push(...builtMeshes);
  }

  debugOk("builder", `Built ${meshes.length} mesh object(s)`);

  return meshes;
}

function createGroups(
  scene: Scene,
  objects: SceneObjectData[]
): Map<string, TransformNode> {
  const groups = new Map<string, TransformNode>();

  for (const data of objects) {
    if (data.objectType !== "group") {
      continue;
    }

    const group = new TransformNode(data.name, scene);

    group.position = toVector3(data.position ?? [0, 0, 0]);
    group.rotation = toVector3(getRotationInRadians(data));
    group.scaling = toVector3(data.scale ?? [1, 1, 1]);
    group.metadata = {
      name: data.name,
      objectType: "group",
    };

    groups.set(data.name, group);
  }

  return groups;
}

function getParentGroup(
  scene: Scene,
  groups: Map<string, TransformNode>,
  data: SceneObjectData
): TransformNode | null {
  if (!data.parentGroup) {
    return null;
  }

  const existingGroup = groups.get(data.parentGroup);

  if (existingGroup) {
    return existingGroup;
  }

  const fallbackGroup = new TransformNode(data.parentGroup, scene);
  groups.set(data.parentGroup, fallbackGroup);

  console.warn(`Group "${data.parentGroup}" was missing. Created at origin.`);

  return fallbackGroup;
}

async function buildSceneObject(
  scene: Scene,
  data: SceneObjectData,
  groups: Map<string, TransformNode>
): Promise<AbstractMesh[]> {
  if (data.objectType === "model") {
    return buildModelObject(scene, data, groups);
  }

  return [buildPrimitiveObject(scene, data, groups)];
}

async function buildModelObject(
  scene: Scene,
  data: SceneObjectData,
  groups: Map<string, TransformNode>
): Promise<AbstractMesh[]> {
  if (!data.modelKey) {
    throw new Error(`Model object "${data.name}" has no modelKey`);
  }

  debugStep("builder", `Loading model: ${data.modelKey}`);

  const modelUrl = resolveModelUrl(data.modelKey);
  const result = await ImportMeshAsync(modelUrl, scene);

  const root = new TransformNode(`${data.name}Root`, scene);
  const parentGroup = getParentGroup(scene, groups, data);

  if (parentGroup) {
    root.parent = parentGroup;
  }

  root.position = toVector3(data.position ?? [0, 0, 0]);
  root.rotation = toVector3(getRotationInRadians(data));
  root.scaling = toVector3(data.scale ?? [1, 1, 1]);

  const importedNodes = [
    ...result.meshes,
    ...result.transformNodes,
  ];

  const importedNodeSet = new Set(importedNodes);

  const topLevelNodes = importedNodes.filter((node) => {
    return !node.parent || !importedNodeSet.has(node.parent as TransformNode);
  });

  for (const node of topLevelNodes) {
    node.parent = root;
  }

  const collisionEnabled = shouldUseCameraCollision(data);

  for (const mesh of result.meshes) {
    const hasGeometry = mesh.getTotalVertices() > 0;

    mesh.isPickable = data.isPickable ?? false;
    mesh.checkCollisions = collisionEnabled && hasGeometry;

    applyMetadata(mesh, data, collisionEnabled && hasGeometry);
  }

  debugOk("builder", `Model loaded: ${data.modelKey}`);

  return result.meshes;
}

function buildPrimitiveObject(
  scene: Scene,
  data: SceneObjectData,
  groups: Map<string, TransformNode>
): Mesh {
  debugStep("builder", `Creating primitive: ${data.name}`);

  const mesh = createShape(scene, data);
  const parentGroup = getParentGroup(scene, groups, data);

  if (parentGroup) {
    mesh.parent = parentGroup;
  }

  applyObjectValues(mesh, data);
  applyMaterial(scene, mesh, data);
  applyMetadata(mesh, data, shouldUseCameraCollision(data));

  return mesh;
}

function createShape(scene: Scene, data: SceneObjectData): Mesh {
  if (!data.shape) {
    throw new Error(`Primitive object "${data.name}" has no shape`);
  }

  switch (data.shape) {
    case "box":
      return MeshBuilder.CreateBox(
        data.name,
        {
          width: data.width ?? data.size ?? 1,
          height: data.height ?? data.size ?? 1,
          depth: data.depth ?? data.size ?? 1,
        },
        scene
      );

    case "sphere":
      return MeshBuilder.CreateSphere(
        data.name,
        {
          diameter: data.diameter ?? data.size ?? 1,
        },
        scene
      );

    case "plane":
      return MeshBuilder.CreatePlane(
        data.name,
        {
          width: data.width ?? data.size ?? 1,
          height: data.height ?? data.size ?? 1,
        },
        scene
      );

    default:
      throw new Error(`Unsupported primitive shape for "${data.name}"`);
  }
}

function applyObjectValues(mesh: Mesh, data: SceneObjectData): void {
  mesh.position = toVector3(data.position ?? [0, 0, 0]);
  mesh.rotation = toVector3(getRotationInRadians(data));
  mesh.scaling = toVector3(data.scale ?? [1, 1, 1]);

  mesh.isPickable = data.isPickable ?? false;
  mesh.checkCollisions = shouldUseCameraCollision(data);

  mesh.isVisible = data.visible ?? true;
  mesh.visibility = data.visibility ?? 1;
}

function applyMaterial(scene: Scene, mesh: Mesh, data: SceneObjectData): void {
  const material = new StandardMaterial(`${data.name}Material`, scene);

  material.backFaceCulling = false;

  if (data.image) {
    material.diffuseTexture = new Texture(data.image, scene);
  } else {
    const color = data.debugColor ?? data.color ?? [1, 1, 1];
    material.diffuseColor = new Color3(color[0], color[1], color[2]);
  }

  if (data.alpha !== undefined) {
    material.alpha = data.alpha;
  }

  mesh.material = material;
}

function applyMetadata(
  mesh: AbstractMesh,
  data: SceneObjectData,
  collisionEnabled: boolean
): void {
  mesh.metadata = {
    name: data.name,
    objectType: data.objectType ?? "primitive",
    parentGroup: data.parentGroup,
    shape: data.shape,
    modelKey: data.modelKey,
    title: data.title,
    description: data.description,
    externalUrl: data.externalUrl,
    isPickable: data.isPickable ?? false,
    collision: collisionEnabled,
    visible: data.visible,
    visibility: data.visibility,
    alpha: data.alpha,
    colliderOnly: data.colliderOnly ?? false,
    rigidBody: data.rigidBody,
  };
}

function shouldUseCameraCollision(data: SceneObjectData): boolean {
  if (data.collision !== undefined) {
    return data.collision;
  }

  return data.rigidBody?.enabled === true && data.rigidBody.type === "static";
}

function getRotationInRadians(data: SceneObjectData): Vector3Tuple {
  if (data.rotation) {
    return data.rotation;
  }

  if (!data.rotationDegrees) {
    return [0, 0, 0];
  }

  return [
    degreesToRadians(data.rotationDegrees[0]),
    degreesToRadians(data.rotationDegrees[1]),
    degreesToRadians(data.rotationDegrees[2]),
  ];
}

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toVector3(value: Vector3Tuple): Vector3 {
  return new Vector3(value[0], value[1], value[2]);
}
