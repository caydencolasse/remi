import { exampleHref } from '@/lib/example-href';

describe('exampleHref', () => {
  it('leaves static routes unchanged', () => {
    expect(exampleHref('/remii/about-you')).toBe('/remii/about-you');
  });

  it('fills one dynamic segment', () => {
    expect(exampleHref('/library/[id]')).toBe('/library/example');
  });

  it('fills a dynamic segment in the middle of a route', () => {
    expect(exampleHref('/plans/[id]/share', '42')).toBe('/plans/42/share');
  });
});
