/**
 * Create a short, human-friendly display id for entities when the backend
 * doesn't provide one. Example: formatAdminDisplayId('uuid-...') -> '#ADM-005'
 */
export function formatDisplayId(prefix: string, id?: string) {
  if (!id) return "";
  if (typeof id !== "string") return "";
  if (id.startsWith("#")) return id;

  const p = String(prefix ?? "").replace(/^#/, "").toUpperCase();

  // Simple deterministic hash -> numeric suffix (000-999)
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) % 1000000;
  }
  const num = String(h % 1000).padStart(3, "0");
  return `#${p}-${num}`;
}

/**
 * Prefer backend display ids when available; otherwise hash the raw id.
 */
export function formatDisplayIdSafe(
  prefix: string,
  displayId?: string,
  id?: string,
) {
  if (typeof displayId === "string" && displayId.trim()) {
    return displayId.startsWith("#") ? displayId : `#${displayId}`;
  }
  return formatDisplayId(prefix, id);
}

export function formatAdminDisplayId(id?: string) {
  return formatDisplayId("ADM", id);
}
