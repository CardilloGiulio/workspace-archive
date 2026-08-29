export type AppRoute = "/" | "/giochi" | "/finale" | "/museo";

export type Trigger =
  | {
      type: "PAGE_OPENED";
      payload: {
        route: AppRoute;
      };
    }
  | {
      type: "GAME_COMPLETED";
      payload: {
        completedAt: string;
      };
    }
  | {
      type: "GAME_RESET";
    }
  | {
      type: "FINAL_SCENE_STARTED";
    };

export type TriggerHandler = (trigger: Trigger) => void;
