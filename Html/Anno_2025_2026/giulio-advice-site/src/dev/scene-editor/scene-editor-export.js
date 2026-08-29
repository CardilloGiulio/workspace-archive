const VALID_LENGTH = /^(?:-?\d+(?:\.\d+)?(?:%|px|vw|vh|rem|em)|auto|0)$/;
const VALID_ROTATION = /^(?:-?\d+(?:\.\d+)?deg|0)$/;
const ALLOWED_FIELDS = new Set(["left", "right", "top", "bottom", "width", "height", "rotate", "z"]);

function roundValue(value, unit = "%") {
  const rounded = Math.round(value * 10) / 10;
  return `${Number.isInteger(rounded) ? rounded.toFixed(0) : rounded}${unit}`;
}

export function formatPercent(value) {
  return roundValue(value, "%");
}

export function formatDegrees(value) {
  return roundValue(value, "deg");
}

export function validateLayout(layout) {
  const errors = [];
  const warnings = [];
  for (const [field, value] of Object.entries(layout)) {
    if (!ALLOWED_FIELDS.has(field)) {
      errors.push(`${field}: unsupported field`);
      continue;
    }
    const pattern = field === "rotate" ? VALID_ROTATION : field === "z" ? /^\d+$/ : VALID_LENGTH;
    if (typeof value !== "string" || !pattern.test(value.trim())) errors.push(`${field}: unsupported value ${value}`);
    const numeric = Number.parseFloat(value);
    if (field === "z" && Number.isFinite(numeric) && (numeric < 1 || numeric > 99)) errors.push("z must be between 1 and 99");
    if (["width", "height"].includes(field) && Number.isFinite(numeric) && numeric <= 0) errors.push(`${field} must be greater than zero`);
  }
  if (layout.left && layout.right && layout.left !== "auto" && layout.right !== "auto") errors.push("left and right conflict");
  if (layout.top && layout.bottom && layout.top !== "auto" && layout.bottom !== "auto") errors.push("top and bottom conflict");
  return { errors, warnings };
}

function assignNested(target, path, value) {
  let cursor = target;
  path.forEach((part, index) => {
    if (index === path.length - 1) cursor[part] = value;
    else cursor = cursor[part] ||= {};
  });
}

export function buildPatch(sceneId, mode, changes) {
  const output = {};
  for (const change of changes.values()) {
    assignNested(output, change.path, change.layout);
  }
  return {
    sceneId,
    viewport: mode,
    changes: output,
    generatedBy: "scene-layout-editor",
    generatedAt: new Date().toISOString()
  };
}

export function downloadPatch(patch) {
  const blob = new Blob([`${JSON.stringify(patch, null, 2)}\n`], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `scene-layout-${patch.sceneId}-${patch.viewport}.json`;
  anchor.hidden = true;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
