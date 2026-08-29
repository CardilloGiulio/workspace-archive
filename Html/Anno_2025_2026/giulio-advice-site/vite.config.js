import { defineConfig } from "vite";
import { promises as fs } from "node:fs";
import { dirname, resolve } from "node:path";
import { SCENES } from "./src/config/scenes/index.js";

const OVERRIDE_FILE = resolve(process.cwd(), "src/dev/scene-editor/scene-layout-overrides.json");
const SCENE_LIST = Object.values(SCENES);
const SCENE_REGISTRY = new Map(SCENE_LIST.map((scene) => [scene.id, {
  characterLayouts: new Set(Object.keys(scene.character.layouts || {})),
  props: new Set((scene.props || []).map((entry) => entry.id)),
  effects: new Set((scene.effects || []).map((entry) => entry.id))
}]));
const ALLOWED_VIEWPORTS = new Set(["desktop", "mobile"]);
const ALLOWED_FIELDS = new Set(["left", "right", "top", "bottom", "width", "height", "rotate", "z"]);
const LENGTH_VALUE = /^(?:auto|0|-?\d+(?:\.\d+)?(?:%|px|vw|vh|rem|em))$/;
const ROTATE_VALUE = /^(?:0|-?\d+(?:\.\d+)?deg)$/;
const Z_VALUE = /^\d+$/;

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function assertOnlyKeys(object, allowed, context) {
  for (const key of Object.keys(object)) {
    if (!allowed.has(key)) throw new Error(`${context}: unsupported field ${key}`);
  }
}

function validateLayout(layout, context) {
  if (!isPlainObject(layout)) throw new Error(`${context}: layout must be an object`);
  assertOnlyKeys(layout, ALLOWED_FIELDS, context);
  const output = {};
  for (const [field, value] of Object.entries(layout)) {
    if (typeof value !== "string") throw new Error(`${context}.${field}: value must be a string`);
    const trimmed = value.trim();
    const valid = field === "rotate"
      ? ROTATE_VALUE.test(trimmed)
      : field === "z"
        ? Z_VALUE.test(trimmed)
        : LENGTH_VALUE.test(trimmed);
    if (!valid) throw new Error(`${context}.${field}: unsupported value`);
    const number = Number.parseFloat(trimmed);
    if ((field === "width" || field === "height") && Number.isFinite(number) && number <= 0) {
      throw new Error(`${context}.${field}: must be greater than zero`);
    }
    if (field === "z" && (!Number.isFinite(number) || number < 1 || number > 99)) {
      throw new Error(`${context}.${field}: must be between 1 and 99`);
    }
    output[field] = trimmed;
  }
  if (output.left && output.right && output.left !== "auto" && output.right !== "auto") {
    throw new Error(`${context}: left and right conflict`);
  }
  if (output.top && output.bottom && output.top !== "auto" && output.bottom !== "auto") {
    throw new Error(`${context}: top and bottom conflict`);
  }
  return output;
}

function validateViewportLayout(node, viewport, context) {
  if (!isPlainObject(node)) throw new Error(`${context}: expected an object`);
  assertOnlyKeys(node, new Set([viewport]), context);
  return { [viewport]: validateLayout(node[viewport] || {}, `${context}.${viewport}`) };
}

function validateChanges(changes, viewport, registry) {
  if (!isPlainObject(changes)) throw new Error("changes must be an object");
  assertOnlyKeys(changes, new Set(["character", "props", "trigger", "effects"]), "changes");
  const output = {};

  if (changes.character !== undefined) {
    if (!isPlainObject(changes.character)) throw new Error("changes.character must be an object");
    assertOnlyKeys(changes.character, new Set(["layouts"]), "changes.character");
    const layouts = changes.character.layouts || {};
    if (!isPlainObject(layouts)) throw new Error("changes.character.layouts must be an object");
    assertOnlyKeys(layouts, registry.characterLayouts, "changes.character.layouts");
    const cleanLayouts = {};
    for (const [layoutName, node] of Object.entries(layouts)) {
      cleanLayouts[layoutName] = validateViewportLayout(node, viewport, `changes.character.layouts.${layoutName}`);
    }
    if (Object.keys(cleanLayouts).length) output.character = { layouts: cleanLayouts };
  }

  if (changes.props !== undefined) {
    if (!isPlainObject(changes.props)) throw new Error("changes.props must be an object");
    assertOnlyKeys(changes.props, registry.props, "changes.props");
    const props = {};
    for (const [id, node] of Object.entries(changes.props)) {
      if (!isPlainObject(node)) throw new Error(`changes.props.${id} must be an object`);
      assertOnlyKeys(node, new Set(["layout"]), `changes.props.${id}`);
      props[id] = { layout: validateViewportLayout(node.layout || {}, viewport, `changes.props.${id}.layout`) };
    }
    if (Object.keys(props).length) output.props = props;
  }

  if (changes.trigger !== undefined) {
    if (!isPlainObject(changes.trigger)) throw new Error("changes.trigger must be an object");
    assertOnlyKeys(changes.trigger, new Set(["layout"]), "changes.trigger");
    output.trigger = { layout: validateViewportLayout(changes.trigger.layout || {}, viewport, "changes.trigger.layout") };
  }

  if (changes.effects !== undefined) {
    if (!isPlainObject(changes.effects)) throw new Error("changes.effects must be an object");
    assertOnlyKeys(changes.effects, registry.effects, "changes.effects");
    const effects = {};
    for (const [id, node] of Object.entries(changes.effects)) {
      if (!isPlainObject(node)) throw new Error(`changes.effects.${id} must be an object`);
      assertOnlyKeys(node, new Set(["layout"]), `changes.effects.${id}`);
      effects[id] = { layout: validateViewportLayout(node.layout || {}, viewport, `changes.effects.${id}.layout`) };
    }
    if (Object.keys(effects).length) output.effects = effects;
  }

  return output;
}

async function readOverrides() {
  try {
    const value = JSON.parse(await fs.readFile(OVERRIDE_FILE, "utf8"));
    return isPlainObject(value) ? value : {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
}

async function writeOverrides(overrides) {
  await fs.mkdir(dirname(OVERRIDE_FILE), { recursive: true });
  await fs.writeFile(OVERRIDE_FILE, `${JSON.stringify(overrides, null, 2)}\n`, "utf8");
}

function readJsonBody(request) {
  return new Promise((resolveBody, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error("Request body is too large"));
    });
    request.on("end", () => {
      try {
        resolveBody(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response, status, value) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(value));
}

function sceneEditorPersistencePlugin() {
  return {
    name: "scene-editor-development-persistence",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url || "/", "http://localhost").pathname;
        if (pathname !== "/__scene-editor/save" && pathname !== "/__scene-editor/reset") return next();

        try {
          if (pathname === "/__scene-editor/save" && request.method === "GET") {
            return sendJson(response, 200, await readOverrides());
          }

          if (pathname === "/__scene-editor/save" && request.method === "POST") {
            const body = await readJsonBody(request);
            if (!isPlainObject(body)) throw new Error("Request body must be an object");
            assertOnlyKeys(body, new Set(["sceneId", "viewport", "changes", "generatedBy", "generatedAt"]), "request");
            const registry = SCENE_REGISTRY.get(body.sceneId);
            if (!registry) throw new Error("Unknown scene ID");
            if (!ALLOWED_VIEWPORTS.has(body.viewport)) throw new Error("Unsupported viewport");
            const changes = validateChanges(body.changes || {}, body.viewport, registry);
            const overrides = await readOverrides();
            overrides[body.sceneId] ||= {};
            overrides[body.sceneId][body.viewport] = changes;
            if (!Object.keys(changes).length) delete overrides[body.sceneId][body.viewport];
            if (!Object.keys(overrides[body.sceneId]).length) delete overrides[body.sceneId];
            await writeOverrides(overrides);
            return sendJson(response, 200, { ok: true, overrides: overrides[body.sceneId] || {} });
          }

          if (pathname === "/__scene-editor/reset" && request.method === "POST") {
            const body = await readJsonBody(request);
            if (!isPlainObject(body)) throw new Error("Request body must be an object");
            assertOnlyKeys(body, new Set(["sceneId"]), "request");
            if (!SCENE_REGISTRY.has(body.sceneId)) throw new Error("Unknown scene ID");
            const overrides = await readOverrides();
            delete overrides[body.sceneId];
            await writeOverrides(overrides);
            return sendJson(response, 200, { ok: true });
          }

          return sendJson(response, 405, { ok: false, error: "Method not allowed" });
        } catch (error) {
          return sendJson(response, 400, { ok: false, error: error.message });
        }
      });
    }
  };
}

export default defineConfig({
  base: "/",
  publicDir: "public",
  plugins: [sceneEditorPersistencePlugin()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        dashboard: resolve(process.cwd(), "index.html"),
        ...Object.fromEntries(Object.keys(SCENES).map((id) => [id, resolve(process.cwd(), `${id}/index.html`)]))
      }
    }
  }
});
