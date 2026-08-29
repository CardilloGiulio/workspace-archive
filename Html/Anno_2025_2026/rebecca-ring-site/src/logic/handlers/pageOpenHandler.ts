import type { Trigger } from "../types";

export function handlePageOpen(trigger: Extract<Trigger, { type: "PAGE_OPENED" }>) {
  document.documentElement.dataset.route = trigger.payload.route;
}
