import { formatPercent } from "./scene-editor-export.js";

export function numeric(value, fallback = 0) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function effectiveLayout(responsive, mode) {
  return mode === "mobile"
    ? { ...(responsive.desktop || {}), ...(responsive.mobile || {}) }
    : { ...(responsive.desktop || {}) };
}

export function axisField(layout, first, second) {
  if (layout[first] !== undefined && layout[first] !== "auto") return first;
  if (layout[second] !== undefined && layout[second] !== "auto") return second;
  return first;
}

function splitCssArguments(value) {
  const output = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (character === "(") depth += 1;
    if (character === ")") depth -= 1;
    if (character === "," && depth === 0) {
      output.push(value.slice(start, index).trim());
      start = index + 1;
    }
  }
  output.push(value.slice(start).trim());
  return output;
}

export function configLengthToPixels(value, axis, compositionRect) {
  if (typeof value !== "string") return Number.NaN;
  const trimmed = value.trim();
  const axisSize = axis === "x" ? compositionRect.width : compositionRect.height;
  if (trimmed === "0") return 0;
  if (trimmed.endsWith("%")) return numeric(trimmed) / 100 * axisSize;
  if (trimmed.endsWith("px")) return numeric(trimmed);
  if (trimmed.endsWith("vw")) return numeric(trimmed) / 100 * window.innerWidth;
  if (trimmed.endsWith("vh")) return numeric(trimmed) / 100 * window.innerHeight;
  if (trimmed.endsWith("rem")) return numeric(trimmed) * numeric(getComputedStyle(document.documentElement).fontSize, 16);
  if (trimmed.endsWith("em")) return numeric(trimmed) * numeric(getComputedStyle(document.body).fontSize, 16);

  const functionMatch = trimmed.match(/^(min|max|clamp)\((.*)\)$/);
  if (functionMatch) {
    const values = splitCssArguments(functionMatch[2]).map((part) => configLengthToPixels(part, axis, compositionRect));
    if (values.some((part) => !Number.isFinite(part))) return Number.NaN;
    if (functionMatch[1] === "min") return Math.min(...values);
    if (functionMatch[1] === "max") return Math.max(...values);
    if (values.length === 3) return Math.max(values[0], Math.min(values[1], values[2]));
  }
  return Number.NaN;
}

export function valueInPercent(value, axis, compositionRect) {
  const pixels = configLengthToPixels(value, axis, compositionRect);
  const size = axis === "x" ? compositionRect.width : compositionRect.height;
  return Number.isFinite(pixels) && size ? pixels / size * 100 : numeric(value);
}

export function dimensionValueFromPixels(pixels, originalValue, axis, compositionRect) {
  const safePixels = Math.max(1, pixels);
  if (typeof originalValue === "string" && /^-?\d+(?:\.\d+)?vw$/.test(originalValue.trim())) {
    return `${Math.round((safePixels / window.innerWidth * 100) * 10) / 10}vw`;
  }
  if (typeof originalValue === "string" && /^-?\d+(?:\.\d+)?vh$/.test(originalValue.trim())) {
    return `${Math.round((safePixels / window.innerHeight * 100) * 10) / 10}vh`;
  }
  if (typeof originalValue === "string" && /^-?\d+(?:\.\d+)?px$/.test(originalValue.trim())) {
    return `${Math.round(safePixels * 10) / 10}px`;
  }
  if (typeof originalValue === "string" && /^-?\d+(?:\.\d+)?rem$/.test(originalValue.trim())) {
    const rootSize = numeric(getComputedStyle(document.documentElement).fontSize, 16);
    return `${Math.round((safePixels / rootSize) * 10) / 10}rem`;
  }
  if (typeof originalValue === "string" && /^-?\d+(?:\.\d+)?em$/.test(originalValue.trim())) {
    const fontSize = numeric(getComputedStyle(document.body).fontSize, 16);
    return `${Math.round((safePixels / fontSize) * 10) / 10}em`;
  }
  const size = axis === "x" ? compositionRect.width : compositionRect.height;
  return formatPercent(safePixels / Math.max(size, 1) * 100);
}

export function anchorFraction(value) {
  if (typeof value !== "string" || !value.trim().endsWith("%")) return 0;
  return numeric(value) / 100;
}

export function rotationDegrees(value) {
  if (typeof value !== "string") return 0;
  return value.trim().endsWith("deg") || value.trim() === "0" ? numeric(value) : 0;
}

export function pointerAngle(first, second) {
  return Math.atan2(second.y - first.y, second.x - first.x);
}

export function normaliseRadians(value) {
  let result = value;
  while (result > Math.PI) result -= Math.PI * 2;
  while (result < -Math.PI) result += Math.PI * 2;
  return result;
}
