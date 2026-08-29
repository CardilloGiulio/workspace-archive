import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SCENES } from "../src/config/scenes/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");
const configured = new Set();

function collect(value) {
  if (typeof value === "string" && (value.startsWith("/assets/") || value.startsWith("/assets-optimized/"))) configured.add(value);
  else if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === "object") Object.values(value).forEach(collect);
}

collect(SCENES);
configured.add("/assets/audio/effects/dialogue-open.mp3");
configured.add("/assets/audio/effects/dialogue-next.mp3");

for (const scene of Object.values(SCENES)) {
  for (const prop of scene.props) {
    prop.lines?.forEach((line, index) => {
      const explicit = line[2];
      const number = String(index + 1).padStart(2, "0");
      configured.add(explicit || `/assets/audio/voices/giulio/${scene.id}/voice-${scene.id}-${prop.voiceId || prop.id}-${number}.mp3`);
    });
  }
}


const structuralErrors = [];
const controllerSource = fs.readFileSync(path.join(root, "src/ui/scene/scene-controller.js"), "utf8");
const motionSource = fs.readFileSync(path.join(root, "src/services/motion-service.js"), "utf8");
const sceneCss = fs.readFileSync(path.join(root, "src/styles/scene.css"), "utf8");
const sceneSources = fs.readdirSync(path.join(root, "src/config/scenes"))
  .filter((file) => /^advice\d+\.js$/.test(file))
  .map((file) => fs.readFileSync(path.join(root, "src/config/scenes", file), "utf8"))
  .join("\n");

if (controllerSource.includes("scene-shell scene--")) structuralErrors.push("Scene theme class is duplicated on the shell.");
if (!controllerSource.includes("data-scene-composition")) structuralErrors.push("Scene composition wrapper is missing.");
if (sceneSources.includes("scaleWithScene")) structuralErrors.push("Selective scaleWithScene flags are still present.");
if (!motionSource.includes('scale: ".25"') || motionSource.includes('transform: "scale(.25)')) structuralErrors.push("motion.pop still owns the composite transform.");
if (!sceneCss.includes(".scene-composition") || sceneCss.includes("scene-element--scene-scaled")) structuralErrors.push("Scene scaling is not owned only by the composition wrapper.");
if (SCENES.advice3.trigger.render !== "css" || SCENES.advice3.trigger.asset || SCENES.advice3.trigger.alternateAsset) structuralErrors.push("Advice 3 charger is not purely CSS-rendered.");

const missing = [...configured].filter((asset) => !fs.existsSync(path.join(publicRoot, asset.slice(1))));
const missingImages = missing.filter((asset) => !asset.endsWith(".mp3"));
const missingAudio = missing.filter((asset) => asset.endsWith(".mp3"));

const inventoryPath = path.join(publicRoot, "assets-optimized", "asset-inventory.json");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const inventoryMissing = inventory.filter((entry) => !fs.existsSync(path.join(publicRoot, entry.file.slice(1))));

console.log(`Configured asset paths: ${configured.size}`);
console.log(`Optimized image inventory: ${inventory.length}`);
console.log(`Missing images: ${missingImages.length}`);
console.log(`Missing audio (allowed until supplied): ${missingAudio.length}`);
console.log(`Missing optimized inventory files: ${inventoryMissing.length}`);
console.log(`Structural contradictions: ${structuralErrors.length}`);

if (missingImages.length) console.error("Missing image paths:\n" + missingImages.join("\n"));
if (inventoryMissing.length) console.error("Missing optimized inventory files:\n" + inventoryMissing.map((entry) => entry.file).join("\n"));
if (structuralErrors.length) console.error("Structural contradictions:\n" + structuralErrors.join("\n"));

if (missingImages.length || inventoryMissing.length || structuralErrors.length) process.exitCode = 1;
