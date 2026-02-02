export function buildPagination(current: number, total: number): Array<number | "..."> {
  if (total <= 8) return Array.from({ length: total }, (_, i) => i + 1);

  const out: Array<number | "..."> = [];
  const showLeft = Math.max(2, current - 1);
  const showRight = Math.min(total - 1, current + 1);

  out.push(1);

  if (showLeft > 2) out.push("...");

  for (let p = showLeft; p <= showRight; p++) out.push(p);

  if (showRight < total - 1) out.push("...");

  out.push(total);
  return out;
}
