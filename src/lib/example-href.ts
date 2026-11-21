/**
 * Turns a route pattern from APP_ROUTES into a path that can be opened,
 * filling dynamic segments such as `[id]` with a sample value.
 */
export function exampleHref(route: string, sample = 'example'): string {
  return route.replace(/\[[^\]]+\]/g, sample);
}
