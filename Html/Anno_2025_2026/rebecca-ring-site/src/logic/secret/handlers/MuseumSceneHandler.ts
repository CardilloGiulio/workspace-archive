import { museumSceneById, museumScenes } from "../../../store/museum/museumScenes";
import type { MuseumSceneRequest } from "../requests/MuseumSceneRequest";

export class MuseumSceneHandler {
  listScenes() {
    return museumScenes;
  }

  getDefaultScene() {
    return museumScenes[0];
  }

  resolve(request: MuseumSceneRequest) {
    return museumSceneById.get(request.sceneId) ?? this.getDefaultScene();
  }
}
