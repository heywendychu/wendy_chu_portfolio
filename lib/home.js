import { getHome } from "./content";
import { toSections } from "@/components/Blocks";
import { slugify } from "./slugify";

// The Notion "home" page is split into sections by its top-level headings
// (e.g. "About me", "Contact"). A section's anchor is the first word of its
// title: "About me" → #about. The Work list is inserted at a heading called
// "Work" if there is one, otherwise right after the first section.
export function getHomeSections() {
  const { sections } = toSections(getHome().blocks);
  const withIds = sections.map((s) => ({
    ...s,
    id: slugify(s.title).split("-")[0] || null,
    kind: /^work\b/i.test(s.title) ? "work" : "content",
  }));
  if (!withIds.some((s) => s.kind === "work")) {
    withIds.splice(Math.min(1, withIds.length), 0, { title: "Work", id: "work", kind: "work", blocks: [] });
  }
  return withIds;
}

export function getNav() {
  return getHomeSections()
    .filter((s) => s.title && s.id)
    .map((s) => ({ id: s.id, label: s.title.toUpperCase() }));
}
