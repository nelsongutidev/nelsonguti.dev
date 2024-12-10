import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { titleResolver } from '../../shared/resolvers/title.resolver';
import { KofiButtonComponent } from '../../shared/components/kofi-button/kofi-button.component';

export const routeMeta: RouteMeta = {
  title: titleResolver,
};

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
    selector: 'app-blog-post',
    imports: [
        MarkdownComponent,
        AsyncPipe,
        NgIf,
        RouterLink,
        NgTemplateOutlet,
        KofiButtonComponent,
    ],
    template: `
    @if (post$ | async; as post) {

    <article
      class="flex flex-col prose prose-slate  dark:prose-invert md:max-w-4xl py-8 w-full px-4"
    >
      <ng-template [ngTemplateOutlet]="backButton" />
      <analog-markdown class="markdown" [content]="post.content" />
      <h3 class="text-2xl mb-2">Support</h3>
      <p class="mb-0">
        If you enjoyed this post and found it useful, consider buying me a
        coffee. Thanks in advance!
      </p>
      <app-kofi-button />
      <ng-template [ngTemplateOutlet]="backButton" />
    </article>
    <ng-template #backButton>
      <a
        routerLink="/blog"
        class="btn items-center mb-8 w-64 flex flex-row  btn-outline btn-neutral"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        <span>Back to Blog Posts</span></a
      >
    </ng-template>

    }
  `,
    host: { class: 'flex justify-center' }
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'blog',
  });
}
