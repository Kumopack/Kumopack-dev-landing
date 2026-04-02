/* eslint-disable @typescript-eslint/no-explicit-any */
export type Dictionary = Record<string, any>;

export function createTranslator(dict: Dictionary | null) {
  return (path: string): string => {
    if (!dict) return path;
    return (
      (path
        .split(".")
        .reduce(
          (obj: unknown, key: string) =>
            (obj as Record<string, unknown>)?.[key],
          dict,
        ) as string) || path
    );
  };
}
