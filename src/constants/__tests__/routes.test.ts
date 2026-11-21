import fs from 'fs';
import path from 'path';

import { APP_ROUTES } from '@/constants/routes';

const repoRoot = path.resolve(__dirname, '../../..');
const appDir = path.join(repoRoot, 'src/app');

/** Maps a route file under src/app to its URL pattern. */
function fileToRoute(file: string): string {
  const withoutExt = file.replace(/\.tsx$/, '');
  const segments = withoutExt
    .split(path.sep)
    .filter((s) => !(s.startsWith('(') && s.endsWith(')')))
    .filter((s) => s !== 'index');
  return '/' + segments.join('/');
}

function routeFiles(dir: string, base = ''): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) return routeFiles(path.join(dir, entry.name), rel);
    if (!entry.name.endsWith('.tsx') || entry.name.startsWith('_')) return [];
    return [rel];
  });
}

describe('APP_ROUTES', () => {
  it('has no duplicate routes', () => {
    const routes = APP_ROUTES.map((r) => r.route);
    expect(new Set(routes).size).toBe(routes.length);
  });

  it('lists exactly the screens that exist under src/app', () => {
    const fromFiles = routeFiles(appDir).map(fileToRoute).sort();
    const fromList = APP_ROUTES.map((r) => r.route).sort();
    expect(fromList).toEqual(fromFiles);
  });

  it('points every mockup at a file that exists', () => {
    const missing = APP_ROUTES.filter((r) => r.mockup && !fs.existsSync(path.join(repoRoot, r.mockup)));
    expect(missing).toEqual([]);
  });
});
