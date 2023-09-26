import { injectContent } from '@analogjs/content';
import { MetaTag } from '@analogjs/router';
import { ResolveFn } from '@angular/router';
import { lastValueFrom, take } from 'rxjs';

export const metatagsResolver: ResolveFn<MetaTag[]> = async (route, state) => {
  const content$ = injectContent<any>({
    customFilename: `blog/${route.params['slug']}`,
  });

  const content = await lastValueFrom(content$.pipe(take(1)));

  return content.attributes.meta || [];
};
