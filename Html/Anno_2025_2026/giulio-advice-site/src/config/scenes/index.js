import advice1 from "./advice1.js";
import advice2 from "./advice2.js";
import advice3 from "./advice3.js";
import advice4 from "./advice4.js";
import advice5 from "./advice5.js";
import advice6 from "./advice6.js";
import advice7 from "./advice7.js";
import advice8 from "./advice8.js";

export const SCENES = Object.freeze({ advice1, advice2, advice3, advice4, advice5, advice6, advice7, advice8 });

export function getScene(id) {
  return SCENES[id] ?? null;
}
