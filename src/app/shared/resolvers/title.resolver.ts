import { ResolveFn } from '@angular/router';

export const titleResolver: ResolveFn<string> = (route, state) => {
  // ToDO: Use data from frontmatter to add proper titles to blogs and tips
  const parentRoute = state.url.includes('tips') ? 'Tips' : 'Blog';
  const formattedSlug = route.params['slug'].replace(/-/g, ' ');
  return `${parentRoute} - ${formattedSlug}`;
};
