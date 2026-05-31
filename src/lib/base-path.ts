const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const basePath = rawBasePath.replace(/\/$/, '');

export function withBasePath(path: string): string {
  if (!basePath || !path.startsWith('/')) {
    return path;
  }
  return `${basePath}${path}`;
}
