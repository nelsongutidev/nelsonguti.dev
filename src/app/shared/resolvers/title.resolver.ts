import { ResolveFn } from '@angular/router';

export const titleResolver: ResolveFn<string> = (route, state) => {
  console.log('state: ', state);
  console.log('oute: ', route);
  return route.params['slug'];
};
