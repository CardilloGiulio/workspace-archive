const modelModules = import.meta.glob<string>(
  "../objects/*.{gltf,glb}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

export function resolveModelUrl(modelKey: string): string {
  const matchingEntry = Object.entries(modelModules).find(([path]) => {
    return path.endsWith(`/${modelKey}`);
  });

  if (!matchingEntry) {
    throw new Error(`Model not found in src/objects: ${modelKey}`);
  }

  return matchingEntry[1];
}
