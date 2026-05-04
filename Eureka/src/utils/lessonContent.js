export function lessonHasSlideContent(lesson) {
  const cards = lesson.contentCards || [];
  return cards.some((c) => (c.blocks || []).length > 0);
}
