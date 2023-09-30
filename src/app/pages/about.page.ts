import { RouteMeta } from '@analogjs/router';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HerodevsLogoComponent } from '../shared/components/herodevs-logo/herodevs-logo.component';

export const routeMeta: RouteMeta = {
  title: 'About',
};
@Component({
  selector: 'app-about',
  standalone: true,
  host: { class: 'flex flex-col flex-1' },
  imports: [
    RouterLink,
    NgOptimizedImage,
    HeaderComponent,
    HerodevsLogoComponent,
  ],
  template: `
    <app-header [title]="'About Me'" />

    <section class="lg:px-24 px-8 py-4 my-8">
      <div class="flex flex-col gap-8 ">
        <h1 class="md:text-5xl text-3xl mb-4 pt-2">
          <span
            >I'm currently working as a Senior Software Engineer at
            <a
              href="https://www.herodevs.com/"
              target="_blank"
              class="inline-flex"
            >
              <app-herodevs-logo class="relative top-2" /> </a
            >.
          </span>
        </h1>

        <h3 class="md:text-2xl text-xl my-4">
          Along with this, I'm a co-organizer of the
          <a
            href="https://twitter.com/angular_meetup"
            target="_blank"
            class="link link-hover"
            >Angular Community Meetup (Spanish Chapter)</a
          >
          and the
          <a
            href="https://twitter.com/AngularCR"
            target="_blank"
            class="link link-hover"
            >Angular Costa Rica Meetups.</a
          >
        </h3>
      </div>
    </section>
  `,
})
export default class AboutComponent {
  yearsOfExperience = new Date().getFullYear() - 2017;
  initials = '<ng />';
}
