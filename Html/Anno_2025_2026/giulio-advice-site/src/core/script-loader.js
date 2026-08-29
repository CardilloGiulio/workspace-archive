import { logger } from "../services/logger.js";
import { settings } from "../services/settings.js";
import { createServiceCollector } from "../services/service-collector.js";
import { initSettingsPanel } from "../ui/settings-panel.js";
import { initAssetCache } from "../services/cache-service.js";

export async function bootApplication() {
  settings.init();
  logger.init();
  createServiceCollector(logger);
  initSettingsPanel();
  initAssetCache();

  const page = document.body.dataset.page;
  logger.log("script_pipeline_started", { page });
  try {
    if (page === "dashboard") {
      const { initDashboardPage } = await import("../pages/dashboard.js");
      initDashboardPage();
    } else if (page === "advice") {
      const { initAdvicePage } = await import("../pages/advice.js");
      await initAdvicePage();
    } else {
      throw new Error(`Unknown page module: ${page}`);
    }
    if (
      page === "advice" &&
      import.meta.env.DEV &&
      import.meta.env.VITE_ENABLE_SCENE_EDITOR === "true"
    ) {
      await import("../dev/scene-editor/scene-editor.js");
    }
    logger.log("script_pipeline_completed", { page });
  } catch (error) {
    logger.log("script_pipeline_failed", { page, message: error.message, stack: error.stack });
    const main = document.querySelector("main");
    if (main && !main.children.length) main.innerHTML = '<p class="fatal-fallback">La pagina ha incontrato un errore, ma il registro locale è ancora disponibile.</p>';
    console.error(error);
  }
}
