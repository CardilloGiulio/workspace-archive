import {
  ArcRotateCamera,
  Engine,
  HemisphericLight,
  Scene,
  Vector3,
} from "@babylonjs/core";

type BabylonApp = {
  canvas: HTMLCanvasElement;
  engine: Engine;
  scene: Scene;
  camera: ArcRotateCamera;
  light: HemisphericLight;
};

export function createBabylonApp(canvasId: string): BabylonApp {
  const canvas = getCanvas(canvasId);
  const engine = createEngine(canvas);
  const scene = createScene(engine);
  const camera = createCamera(scene, canvas);
  const light = createLight(scene);

  return {
    canvas,
    engine,
    scene,
    camera,
    light,
  };
}

function getCanvas(canvasId: string): HTMLCanvasElement {
  const canvas = document.getElementById(canvasId);

  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error(`Canvas with id "${canvasId}" was not found`);
  }

  return canvas;
}

function createEngine(canvas: HTMLCanvasElement): Engine {
  return new Engine(canvas, true);
}

function createScene(engine: Engine): Scene {
  return new Scene(engine);
}

function createCamera(scene: Scene, canvas: HTMLCanvasElement): ArcRotateCamera {
  const camera = new ArcRotateCamera(
    "mainCamera",
    Math.PI / 10,
    Math.PI / 3,
    10,
    Vector3.Zero(),
    scene
  );

  camera.attachControl(canvas, true);

  return camera;
}

function createLight(scene: Scene): HemisphericLight {
  const light = new HemisphericLight(
    "mainLight",
    new Vector3(0, 1, 0),
    scene
  );

  light.intensity = 0.8;

  return light;
}