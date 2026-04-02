export type Dictionary = Record<string, unknown>;

export function createTranslator(dict: Dictionary | null) {
  return (path: string): string => {
    if (!dict) return path;
    return (
      (path.split(".").reduce((obj: unknown, key: string) => (obj as Record<string, unknown>)?.[key], dict) as string) ||
      path
    );
  };
}
