import { RouteMeta } from '@analogjs/router';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';

export const routeMeta: RouteMeta = {
  title: 'About',
};
@Component({
  selector: 'app-about',
  standalone: true,
  host: { class: 'flex flex-col flex-1' },
  imports: [RouterLink, NgOptimizedImage, HeaderComponent],
  template: `
    <app-header [title]="'About Me'" />

    <section class="lg:px-24 px-8 py-4 my-8">
      <div class="flex flex-col xl:flex-row gap-8 items-center">
        <div>
          <h1 class="md:text-5xl text-3xl font-bold mb-4">
            I'm currently working as a Senior Software Engineer at

            <a
              href="https://www.herodevs.com/"
              class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              HeroDevs
            </a>
          </h1>

          <p class="pr-8">
            I have {{ yearsOfExperience }} years of experience in the software
            industry. I'm also a big fan of open source software, and I'm always
            looking for new ways to contribute to the community. Passionate
            about the Angular framework, my initials are {{ initials }} after
            all. Some of my hobbies are playing piano and guitar, running,
            soccer and watching NBA games 🏀. I love spending time with my
            family, and I'm also a big fan of traveling.
          </p>
        </div>
        <img
          ngSrc="/images/family.jpeg"
          class="rounded-lg shadow-2xl"
          width="270"
          height="338"
        />
      </div>
    </section>
  `,
})
export default class AboutComponent {
  yearsOfExperience = new Date().getFullYear() - 2017;
  initials = '<ng />';
}
