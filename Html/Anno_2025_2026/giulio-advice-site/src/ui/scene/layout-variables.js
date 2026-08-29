const LAYOUT_FIELDS = Object.freeze([
  "left", "right", "top", "bottom", "width", "height", "z", "opacity",
  "display", "anchorX", "anchorY", "origin", "rotate", "maxWidth",
  "fontSize", "padding", "borderWidth", "shadow", "position", "filter"
]);

function variableName(mode, namespace, field) {
  const prefix = namespace ? `${namespace}-` : "";
  return `--${mode}-${prefix}${field.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

function resolveMobile(desktop = {}, mobile = {}) {
  const resolved = { ...desktop, ...mobile };

  if (Object.hasOwn(mobile, "left") && !Object.hasOwn(mobile, "right")) resolved.right = "auto";
  if (Object.hasOwn(mobile, "right") && !Object.hasOwn(mobile, "left")) resolved.left = "auto";
  if (Object.hasOwn(mobile, "top") && !Object.hasOwn(mobile, "bottom")) resolved.bottom = "auto";
  if (Object.hasOwn(mobile, "bottom") && !Object.hasOwn(mobile, "top")) resolved.top = "auto";

  return resolved;
}

export function applyResponsiveVariables(element, responsive = {}, namespace = "") {
  if (!element) return;
  const values = {
    desktop: responsive.desktop || {},
    mobile: resolveMobile(responsive.desktop, responsive.mobile)
  };

  for (const mode of ["desktop", "mobile"]) {
    for (const field of LAYOUT_FIELDS) {
      const name = variableName(mode, namespace, field);
      element.style.removeProperty(name);
      const value = values[mode][field];
      if (value !== undefined && value !== null && value !== "") {
        element.style.setProperty(name, String(value));
      }
    }
  }
}
