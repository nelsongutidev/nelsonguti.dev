import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SocialsComponent } from '../shared/components/social/social.component';
import { RouteMeta } from '@analogjs/router';

export const routeMeta: RouteMeta = {
  title: 'Home',
};
@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="flex flex-col md:mt-12 mt-6">
      <h1
        class="font-montserrat lg:text-6xl text-4xl font-bold my-6 px-6 text-center"
      >
        Hi, I'm Nelson Gutierrez
      </h1>
      <div class="max-w-xl mb-6 mx-auto text-center px-2">
        <div class="flex-1">
          <app-socials class="mb-6" />
          <p class="font-pt-serif text-2xl mb-6 px-2">
            I write about Front End Development, Angular, RxJS and Javascript
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

        <div class="flex mt-6 justify-center">
          <img
            ngSrc="/images/me.jpeg"
            class="rounded"
            alt=""
            width="270"
            height="338"
          />
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col' },
  imports: [RouterLink, NgOptimizedImage, SocialsComponent],
})
export default class HomeComponent {}
