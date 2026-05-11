import {
  AbstractMesh,
  Color3,
  Mesh,
  MeshBuilder,
  PointerEventTypes,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

import type { Observer, PointerInfo } from "@babylonjs/core";
import type { UpdateContext } from "../../update/UpdateContext";

import { debugOk, debugWarn } from "../../debug/debugLogger";

const PLAYER_BODY_NAME = "playerBody";
const AIM_MARKER_NAME = "playerAimMarker";

const PLAYER_HEIGHT = 1.7;
const PLAYER_RADIUS = 0.35;
const PLAYER_SPEED = 3.5;
const STOP_DISTANCE = 0.08;

const AIM_MARKER_VERTICAL_OFFSET = 0.12;
const LOOK_SENSITIVITY = 0.0045;
const DRAG_THRESHOLD_PIXELS = 4;
const MAX_CAMERA_PITCH = 1.2;

export class PlayerController {
  private playerBody: Mesh | null = null;
  private aimMarker: Mesh | null = null;
  private pointerObserver: Observer<PointerInfo> | null = null;
  private targetPosition: Vector3 | null = null;
  private enabled = false;

  private pointerIsDown = false;
  private pointerHasDragged = false;
  private lastPointerX = 0;
  private lastPointerY = 0;

  private readonly openedDoors = new Set<string>();
  private readonly originalDoorPositions = new WeakMap<AbstractMesh, Vector3>();

  enable(context: UpdateContext): void {
    this.enabled = true;

    this.ensurePlayerBody(context);
    this.ensureAimMarker(context.scene);

    context.camera.detachControl();
    context.camera.checkCollisions = false;
    context.camera.applyGravity = false;

    this.clearCameraMotion(context);
    this.installPointerControls(context);
    this.reportWalkableMeshes(context.scene);
    this.reportDoorMeshes(context.scene);
  }

  disable(context: UpdateContext): void {
    this.enabled = false;
    this.targetPosition = null;
    this.pointerIsDown = false;
    this.pointerHasDragged = false;

    this.hideAimMarker();
    this.removePointerControls(context.scene);
    this.clearCameraMotion(context);
  }

  update(context: UpdateContext): void {
    if (!this.enabled) {
      return;
    }

    this.updateAimMarker(context);
    this.moveTowardTarget(context);
  }

  private ensurePlayerBody(context: UpdateContext): void {
    if (this.playerBody) {
      this.playerBody.position.copyFrom(context.camera.position);
      return;
    }

    const body = MeshBuilder.CreateSphere(
      PLAYER_BODY_NAME,
      {
        diameter: PLAYER_RADIUS * 2,
        segments: 12,
      },
      context.scene
    );

    body.position.copyFrom(context.camera.position);
    body.isVisible = false;
    body.isPickable = false;
    body.checkCollisions = true;
    body.ellipsoid = new Vector3(PLAYER_RADIUS, PLAYER_HEIGHT / 2, PLAYER_RADIUS);
    body.ellipsoidOffset = new Vector3(0, 0, 0);

    body.metadata = {
      name: PLAYER_BODY_NAME,
      objectType: "player",
    };

    this.playerBody = body;
  }

  private ensureAimMarker(scene: Scene): void {
    if (this.aimMarker) {
      return;
    }

    const marker = MeshBuilder.CreateCylinder(
      AIM_MARKER_NAME,
      {
        diameter: 0.35,
        height: 0.015,
        tessellation: 32,
      },
      scene
    );

    const material = new StandardMaterial("playerAimMarkerMaterial", scene);
    material.diffuseColor = new Color3(0, 0, 0);
    material.alpha = 0.85;

    marker.material = material;
    marker.isPickable = false;
    marker.isVisible = false;

    this.aimMarker = marker;
  }

  private installPointerControls(context: UpdateContext): void {
    this.removePointerControls(context.scene);

    this.pointerObserver = context.scene.onPointerObservable.add((pointerInfo) => {
      if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
        this.handlePointerDown(pointerInfo);
        return;
      }

      if (pointerInfo.type === PointerEventTypes.POINTERMOVE) {
        this.handlePointerMove(context, pointerInfo);
        return;
      }

      if (pointerInfo.type === PointerEventTypes.POINTERUP) {
        this.handlePointerUp(context, pointerInfo);
      }
    });
  }

  private removePointerControls(scene: Scene): void {
    if (!this.pointerObserver) {
      return;
    }

    scene.onPointerObservable.remove(this.pointerObserver);
    this.pointerObserver = null;
  }

  private handlePointerDown(pointerInfo: PointerInfo): void {
    const event = pointerInfo.event as PointerEvent;

    if (event.button !== 0) {
      return;
    }

    this.pointerIsDown = true;
    this.pointerHasDragged = false;
    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
  }

  private handlePointerMove(context: UpdateContext, pointerInfo: PointerInfo): void {
    if (!this.pointerIsDown) {
      return;
    }

    const event = pointerInfo.event as PointerEvent;
    const deltaX = event.clientX - this.lastPointerX;
    const deltaY = event.clientY - this.lastPointerY;

    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;

    if (Math.abs(deltaX) + Math.abs(deltaY) < DRAG_THRESHOLD_PIXELS) {
      return;
    }

    this.pointerHasDragged = true;
    this.rotateCamera(context, deltaX, deltaY);
  }

  private handlePointerUp(context: UpdateContext, pointerInfo: PointerInfo): void {
    const event = pointerInfo.event as PointerEvent;

    if (event.button !== 0) {
      return;
    }

    const shouldHandleClick = this.pointerIsDown && !this.pointerHasDragged;

    this.pointerIsDown = false;
    this.pointerHasDragged = false;

    if (!shouldHandleClick) {
      return;
    }

    this.handleClick(context);
  }

  private rotateCamera(
    context: UpdateContext,
    deltaX: number,
    deltaY: number
  ): void {
    context.camera.rotation.y += deltaX * LOOK_SENSITIVITY;
    context.camera.rotation.x += deltaY * LOOK_SENSITIVITY;
    context.camera.rotation.x = clamp(
      context.camera.rotation.x,
      -MAX_CAMERA_PITCH,
      MAX_CAMERA_PITCH
    );
  }

  private updateAimMarker(context: UpdateContext): void {
    const groundPick = this.pickWalkableGround(context);

    if (!groundPick || !this.aimMarker) {
      this.hideAimMarker();
      return;
    }

    this.aimMarker.position.copyFrom(groundPick.point);
    this.aimMarker.position.y += AIM_MARKER_VERTICAL_OFFSET;
    this.aimMarker.isVisible = true;
  }

  private handleClick(context: UpdateContext): void {
    const doorPick = this.pickDoor(context);

    if (doorPick) {
      this.openDoor(context.scene, doorPick.doorId);
      return;
    }

    const groundPick = this.pickWalkableGround(context);

    if (!groundPick || !this.playerBody) {
      return;
    }

    this.targetPosition = new Vector3(
      groundPick.point.x,
      this.playerBody.position.y,
      groundPick.point.z
    );
  }

  private moveTowardTarget(context: UpdateContext): void {
    if (!this.playerBody || !this.targetPosition) {
      return;
    }

    const current = this.playerBody.position;
    const toTarget = this.targetPosition.subtract(current);
    toTarget.y = 0;

    const distance = toTarget.length();

    if (distance <= STOP_DISTANCE) {
      this.targetPosition = null;
      return;
    }

    const stepDistance = Math.min(distance, PLAYER_SPEED * context.deltaTime);
    const movement = toTarget.normalize().scale(stepDistance);

    this.playerBody.moveWithCollisions(movement);
    context.camera.position.copyFrom(this.playerBody.position);
  }

  private pickWalkableGround(
    context: UpdateContext
  ): { point: Vector3; mesh: AbstractMesh } | null {
    const pick = context.scene.pick(
      context.scene.pointerX,
      context.scene.pointerY,
      (mesh) => this.isWalkableMesh(mesh),
      false,
      context.camera
    );

    if (!pick?.hit || !pick.pickedPoint || !pick.pickedMesh) {
      return null;
    }

    return {
      point: pick.pickedPoint.clone(),
      mesh: pick.pickedMesh,
    };
  }

  private pickDoor(context: UpdateContext): { doorId: string; mesh: AbstractMesh } | null {
    const pick = context.scene.pick(
      context.scene.pointerX,
      context.scene.pointerY,
      (mesh) => this.isClickableDoorMesh(mesh),
      false,
      context.camera
    );

    if (!pick?.hit || !pick.pickedMesh) {
      return null;
    }

    const metadata = pick.pickedMesh.metadata as DoorMetadata | null;

    if (!metadata?.doorId) {
      return null;
    }

    return {
      doorId: metadata.doorId,
      mesh: pick.pickedMesh,
    };
  }

  private openDoor(scene: Scene, doorId: string): void {
    if (this.openedDoors.has(doorId)) {
      return;
    }

    const doorMeshes = scene.meshes.filter((mesh) => {
      const metadata = mesh.metadata as DoorMetadata | null;
      return metadata?.doorId === doorId;
    });

    for (const mesh of doorMeshes) {
      const metadata = mesh.metadata as DoorMetadata | null;

      if (!metadata) {
        continue;
      }

      if (metadata.doorPart === "blocker") {
        mesh.checkCollisions = false;
        mesh.isPickable = false;
        mesh.isVisible = false;
        metadata.collision = false;
        metadata.isOpen = true;
        continue;
      }

      mesh.isPickable = false;
      metadata.isOpen = true;

      const offset = metadata.openOffset;

      if (!offset) {
        continue;
      }

      const originalPosition = this.getOriginalDoorPosition(mesh);
      mesh.position = originalPosition.add(new Vector3(offset[0], offset[1], offset[2]));
    }

    this.openedDoors.add(doorId);
    debugOk("door", `Opened ${doorId}`);
  }

  private getOriginalDoorPosition(mesh: AbstractMesh): Vector3 {
    const existing = this.originalDoorPositions.get(mesh);

    if (existing) {
      return existing.clone();
    }

    const original = mesh.position.clone();
    this.originalDoorPositions.set(mesh, original);

    return original.clone();
  }

  private isWalkableMesh(mesh: AbstractMesh): boolean {
    const metadata = mesh.metadata as { walkable?: boolean } | null;
    return metadata?.walkable === true;
  }

  private isClickableDoorMesh(mesh: AbstractMesh): boolean {
    const metadata = mesh.metadata as DoorMetadata | null;

    return (
      metadata?.doorId !== undefined &&
      metadata.doorPart !== "blocker" &&
      metadata.isOpen !== true
    );
  }

  private reportWalkableMeshes(scene: Scene): void {
    const count = scene.meshes.filter((mesh) => this.isWalkableMesh(mesh)).length;

    if (count === 0) {
      debugWarn("player", "No walkable meshes found. Check walkable JSON and builder metadata.");
      return;
    }

    debugOk("player", `Walkable meshes ready: ${count}`);
  }

  private reportDoorMeshes(scene: Scene): void {
    const count = scene.meshes.filter((mesh) => this.isClickableDoorMesh(mesh)).length;

    if (count === 0) {
      debugWarn("door", "No clickable door meshes found. Check door JSON and builder metadata.");
      return;
    }

    debugOk("door", `Clickable door meshes ready: ${count}`);
  }

  private hideAimMarker(): void {
    if (this.aimMarker) {
      this.aimMarker.isVisible = false;
    }
  }

  private clearCameraMotion(context: UpdateContext): void {
    context.camera.cameraDirection.set(0, 0, 0);
    context.camera.cameraRotation.set(0, 0);
  }
}

type DoorMetadata = {
  doorId?: string;
  doorPart?: "leaf" | "handle" | "blocker";
  openOffset?: [number, number, number];
  collision?: boolean;
  isOpen?: boolean;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
