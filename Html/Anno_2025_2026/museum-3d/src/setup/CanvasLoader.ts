export class CanvasLoader {
  static load(canvasId: string): HTMLCanvasElement {
    const canvas = document.getElementById(canvasId);

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(`Canvas with id "${canvasId}" was not found`);
    }

    return canvas;
  }
}
