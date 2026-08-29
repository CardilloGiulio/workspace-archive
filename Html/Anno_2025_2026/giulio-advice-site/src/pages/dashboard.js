import { logger } from "../services/logger.js";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatTime(value) {
  try { return new Intl.DateTimeFormat("it-IT", { dateStyle: "short", timeStyle: "medium" }).format(new Date(value)); }
  catch { return value; }
}

function summariseDetail(detail) {
  if (!detail || Object.keys(detail).length === 0) return "—";
  return Object.entries(detail).slice(0, 8).map(([key, value]) => `${escapeHtml(key)}: ${escapeHtml(typeof value === "object" ? JSON.stringify(value) : value)}`).join(" · ");
}

export function initDashboardPage() {
  const body = document.getElementById("log-body");
  const empty = document.getElementById("log-empty");
  const pageFilter = document.getElementById("filter-page");
  const search = document.getElementById("filter-search");

  function render() {
    const all = logger.getLogs().slice().reverse();
    const query = search.value.trim().toLowerCase();
    const page = pageFilter.value;
    const filtered = all.filter((entry) => {
      if (page && entry.path !== page) return false;
      if (!query) return true;
      return `${entry.type} ${entry.path} ${JSON.stringify(entry.detail)}`.toLowerCase().includes(query);
    }).slice(0, 400);

    body.innerHTML = filtered.map((entry) => `
      <tr>
        <td>${escapeHtml(formatTime(entry.timestamp))}</td>
        <td><code>${escapeHtml(entry.path)}</code></td>
        <td><span class="event-chip event-chip--${entry.type.includes("failed") || entry.type.includes("error") ? "error" : "normal"}">${escapeHtml(entry.type)}</span></td>
        <td>${summariseDetail(entry.detail)}</td>
      </tr>
    `).join("");
    empty.hidden = filtered.length > 0;

    document.getElementById("stat-total").textContent = all.length;
    document.getElementById("stat-visits").textContent = all.filter((entry) => entry.type === "page_entered").length;
    document.getElementById("stat-interactions").textContent = all.filter((entry) => entry.type === "object_interacted" || entry.type === "reveal_button_clicked").length;
    document.getElementById("stat-errors").textContent = all.filter((entry) => entry.type === "asset_failed" || entry.type.includes("error")).length;
  }

  pageFilter.addEventListener("change", render);
  search.addEventListener("input", render);
  document.getElementById("clear-logs").addEventListener("click", () => {
    if (confirm("Svuotare il registro locale?")) logger.clear();
  });
  document.getElementById("export-logs").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(logger.getLogs(), null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `giulio-logs-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    logger.log("logs_exported");
  });
  logger.subscribe(render);
  render();
}
