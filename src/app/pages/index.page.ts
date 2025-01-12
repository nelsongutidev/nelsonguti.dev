import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialsComponent } from '../shared/components/social/social.component';
import { RouteMeta } from '@analogjs/router';
import { SvgSitenameAnimationComponent } from '../shared/components/svg-sitename-animation/svg-sitename-animation.component';

export const routeMeta: RouteMeta = {
  title: 'Nelson Gutierrez - Angular Blog',
};
@Component({
  selector: 'app-home',
  template: `
    <div class="flex flex-col md:mt-12 mt-6">
      <div class="max-w-xl mb-6 mx-auto text-center px-2">
        <div class="flex-1">
          <h1 class="font-pt-serif text-5xl  mb-6 px-2">
            Hi, I'm Nelson Gutierrez!
          </h1>
          <app-socials class="mb-6" />
          <p class="text-xl mb-6 px-2">
            I'm a software engineer passionate about web development, Angular,
            and JavaScript. I write about what I learn around these topics.
          </p>

          <div class="flex justify-center gap-x-4">
            <button
              routerLink="/blog"
              routerLinkActive="active"
              class="btn btn-outline btn-primary"
            >
              Read the blog
            </button>
            <button
              routerLink="/tips"
              routerLinkActive="active"
              class="btn btn-outline btn-neutral"
            >
              Check the tips
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col' },
  imports: [RouterLink, SocialsComponent],
})
export default class HomeComponent {}
