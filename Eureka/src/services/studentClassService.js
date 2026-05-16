const STORAGE_KEY = 'eureka_student_enrolled_class_ids';

export function getEnrolledClassIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map((id) => Number(id)) : [];
  } catch {
    return [];
  }
}

export function isEnrolledInClass(classId) {
  const id = Number(classId);
  return getEnrolledClassIds().includes(id);
}

export function enrollInClass(classId) {
  const id = Number(classId);
  if (Number.isNaN(id)) return;
  const ids = getEnrolledClassIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }
}

export function leaveClass(classId) {
  const id = Number(classId);
  const next = getEnrolledClassIds().filter((x) => x !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
