// Relative, not "@/", so the Studio's seed script can import this file too.
import type { PostBlock, Span } from "../content/posts";

/** The parts of a Sanity rich-text block this site reads. */
type PtSpan = { _type: string; text?: string; marks?: string[] | null };
type PtBlock = {
  _type: string;
  style?: string | null;
  listItem?: string | null;
  children?: PtSpan[] | null;
  markDefs?: { _key: string; _type: string; href?: string | null }[] | null;
};

const STYLES: Record<string, Exclude<PostBlock["type"], "ul" | "ol">> = {
  normal: "p",
  h2: "h2",
  h3: "h3",
  blockquote: "quote",
  note: "note",
};

/** One block's text as plain text plus, when anything is bold, italic or linked, formatted spans. */
function inline(block: PtBlock): { text: string; spans?: Span[] } {
  const links = new Map((block.markDefs ?? []).filter((d) => d._type === "link" && d.href).map((d) => [d._key, d.href!]));
  const spans: Span[] = (block.children ?? [])
    .filter((c) => c._type === "span" && c.text)
    .map((c) => {
      const marks = c.marks ?? [];
      const href = marks.map((m) => links.get(m)).find(Boolean);
      return {
        text: c.text!,
        ...(marks.includes("strong") ? { bold: true } : {}),
        ...(marks.includes("em") ? { italic: true } : {}),
        ...(href ? { href } : {}),
      };
    });
  const text = spans.map((s) => s.text).join("");
  const formatted = spans.some((s) => s.bold || s.italic || s.href);
  return formatted ? { text, spans } : { text };
}

/**
 * Sanity rich text → the site's article blocks. Consecutive list items become
 * one list (nesting is flattened), empty paragraphs are dropped, and anything
 * that isn't a text block is ignored.
 */
export function toPostBlocks(value: unknown): PostBlock[] {
  if (!Array.isArray(value)) return [];
  const out: PostBlock[] = [];
  for (const block of value as PtBlock[]) {
    if (block?._type !== "block") continue;
    const { text, spans } = inline(block);
    if (!text.trim()) continue;

    if (block.listItem) {
      const type = block.listItem === "number" ? "ol" : "ul";
      let list = out[out.length - 1];
      if (list?.type !== type) {
        list = { type, items: [] };
        out.push(list);
      }
      if (!("items" in list)) continue;
      list.items.push(text);
      if (spans || list.itemSpans) {
        // Keep itemSpans aligned with items once any item is formatted.
        list.itemSpans ??= list.items.slice(0, -1).map((t) => [{ text: t }]);
        list.itemSpans.push(spans ?? [{ text }]);
      }
      continue;
    }
    out.push({ type: STYLES[block.style ?? "normal"] ?? "p", text, ...(spans ? { spans } : {}) });
  }
  return out;
}

/** Spans → Sanity children plus the link annotations they point at. Plain text keeps its original key. */
function children(key: string, text: string, spans?: Span[]) {
  if (!spans) return { markDefs: [], children: [{ _type: "span", _key: `${key}s`, text, marks: [] as string[] }] };
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const out = spans.map((s, i) => {
    const marks: string[] = [];
    if (s.bold) marks.push("strong");
    if (s.italic) marks.push("em");
    if (s.href) {
      markDefs.push({ _key: `${key}l${i}`, _type: "link", href: s.href });
      marks.push(`${key}l${i}`);
    }
    return { _type: "span", _key: `${key}s${i}`, text: s.text, marks };
  });
  return { markDefs, children: out };
}

/**
 * The site's article blocks → Sanity rich text, for seeding. Keys are stable so
 * re-runs diff cleanly. Bold, italic and links carry over (see toPostBlocks).
 */
export function fromPostBlocks(blocks: PostBlock[]) {
  const style = { p: "normal", h2: "h2", h3: "h3", quote: "blockquote", note: "note" } as const;
  const block = (key: string, text: string, spans: Span[] | undefined, extra: Record<string, unknown>) => ({
    _type: "block",
    _key: key,
    ...children(key, text, spans),
    ...extra,
  });
  return blocks.flatMap((b, i) =>
    "items" in b
      ? b.items.map((item, j) =>
          block(`b${i}i${j}`, item, b.itemSpans?.[j], { style: "normal", listItem: b.type === "ol" ? "number" : "bullet", level: 1 }),
        )
      : [block(`b${i}`, b.text, b.spans, { style: style[b.type] })],
  );
}
