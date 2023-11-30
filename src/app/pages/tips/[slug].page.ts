import { injectContent, MarkdownComponent } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { titleResolver } from './../../shared/resolvers/title.resolver';
import { KofiButtonComponent } from '../../shared/components/kofi-button/kofi-button.component';

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

export const routeMeta: RouteMeta = {
  title: titleResolver,
};

@Component({
  selector: 'app-tip',
  standalone: true,
  template: `
    @if (tip$ | async; as tip) {

    <article
      class="flex flex-col prose prose-slate  dark:prose-invert md:max-w-4xl py-8 w-full px-4"
    >
      <a
        routerLink="/tips"
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
        <span>Back to Tips</span></a
      >
      <analog-markdown
        class="markdown"
        [content]="tip.content"
      ></analog-markdown>
      <h3 class="text-2xl mb-2">Support</h3>
      <p class="mb-0">
        If you enjoyed this tip and found it useful, consider buying me a
        coffee. Thanks in advance!
      </p>
      <app-kofi-button />
    </article>

    }
  `,
  host: { class: 'flex justify-center' },
  imports: [
    MarkdownComponent,
    AsyncPipe,
    NgIf,
    RouterLink,
    KofiButtonComponent,
  ],
})
export default class TipComponent {
  readonly tip$ = injectContent<any>({
    param: 'slug',
    subdirectory: 'tips',
  });
}
