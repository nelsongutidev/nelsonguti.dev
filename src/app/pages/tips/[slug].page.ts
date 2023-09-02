import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
  selector: 'app-tip',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf, RouterLink],
  template: `
    <ng-container *ngIf="tip$ | async as tip">
      <article
        class="flex flex-col prose prose-slate  dark:prose-invert md:max-w-4xl py-16 w-full px-4"
      >
        <a routerLink="/tips" class="btn items-center mb-8 w-64 flex flex-row"
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
      </article>
    </ng-container>
  `,
  host: { class: 'flex justify-center' },
})
export default class TipComponent {
  readonly tip$ = injectContent<any>({
    param: 'slug',
    subdirectory: 'tips',
  });

  ngOnInit() {
    this.tip$.subscribe((tips) => {
      console.log(tips);
    });
  }
}
