import { Component } from '@angular/core';
import { TipCardComponent } from '../../shared/components/tip-card/tip-card.component';
import { injectContentFiles } from '@analogjs/content';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PostAttributes } from '../../shared/models/post-attributes';

export const routeMeta: RouteMeta = {
  title: 'Tips',
};
@Component({
  selector: 'app-tips-list',
  standalone: true,
  imports: [TipCardComponent, RouterModule, NgFor, HeaderComponent],
  template: `
    <app-header [title]="'Tips'" />

    <p class="lg:px-24 px-12 text-xl my-12">
      I post these on Twitter.
      <a
        href="https://twitter.com/nelsongutidev"
        class="link link-primary inline-flex gap-1 underline-offset-2 "
        >Follow
        <span class="inline-flex"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg> </span
      ></a>
      me if you want to see more of them.
    </p>

    <main class="flex flex-wrap justify-center gap-6 mb-6 px-4">
      @for (tip of tips; track tip) {
  
        <app-tip-card class="px-4" [tip]="tip"></app-tip-card>
      
}
    </main>
  `,
})
export default class TipsPageComponent {
  readonly tips = injectContentFiles<PostAttributes>((contentFile: any) => {
    return (
      contentFile.filename.includes('/src/content/tips') &&
      contentFile.attributes.published
    );
  })?.sort((a, b) =>
    new Date(a.attributes.date) > new Date(b.attributes.date) ? -1 : 1
  );
}
