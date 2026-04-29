export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Create a short, human-friendly display id for entities when the backend
 * doesn't provide one. Example: formatAdminDisplayId('uuid-...') -> '#ADM-005'
 */
export function formatDisplayId(prefix: string, id?: string) {
  if (!id) return "";
  if (typeof id !== "string") return "";
  // If already looks like a display id, return as-is
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

export function formatAdminDisplayId(id?: string) {
  return formatDisplayId("ADM", id);
}
