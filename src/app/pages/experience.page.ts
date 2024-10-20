import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/components/header/header.component';

type Experience = {
  id: string;
  year: number;
  description: string;
  employer: string;
};

export const routeMeta: RouteMeta = {
  title: 'Experience',
};
@Component({
  selector: 'app-experience',
  standalone: true,
  host: { class: 'flex flex-col flex-1' },
  template: `
    <app-header [title]="'Experience'" />

    <section class="lg:px-24 px-8 py-4 my-8">
      <ul
        class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
      >
        @for (experience of experiences; track experience.id){

        <li>
          <div class="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-5 w-5"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div
            class="mb-10"
            [class.timeline-end]="$index === 0 || $index % 2 === 0"
            [class.md:text-end]="!($index % 2 === 0)"
            [class.timeline-start]="!($index % 2 === 0)"
          >
            <time class="font-mono italic">{{ experience.year }}</time>
            <div class="text-lg font-black">{{ experience.employer }}</div>
            {{ experience.description }}
          </div>
          <hr />
        </li>
        }
      </ul>
    </section>
  `,
  imports: [HeaderComponent],
})
export default class ExperienceComponent {
  experiences: Experience[] = [
    {
      id: '5',
      year: 2024,
      employer: 'Cloudera',
      description:
        "Staff Software Developer. I get to work developing and supporting the Front End of Cloudera’s Data Flow Experience, working on two of their amazing platform's products. Technologies: Angular 18, RxJS, NgRx, Playwright, Typescript, Javascript",
    },
    {
      id: '4',
      year: 2022,
      employer: 'Herodevs',
      description:
        'Senior Front End Developer. Worked migrating enterprise projects from AngularJS to Angular 18, removing all AngularJS code and rewriting it in Angular completely while delivering high-quality code, fully tested and on time. Led a team of 3 Angular Engineers and completed a migration for a well-known client. Worked on a full migration of a 20-year-old .Net System to Angular 18, using Angular’s latest features. Technologies: AngularJS, Angular 18, Jest, CSS/SCSS, RxJS, NgRx, RESTful architectures, Typescript, and Javascript',
    },
    {
      id: '3',
      year: 2021,
      employer: 'Swimlane',
      description:
        'Software Team Lead. In charge of leading a software delivery team for Swimlane, made up of one Front End Engineer, Back End Engineer and SDET. Worked closely with the UX team in design stages to ensure consistency in the product. Partnered with the Product and Management to estimate, allocate and assign work. Managed execution, priorities, and deadlines for development. Ensured the best practices and high-quality code. Supported the team with complex tasks. Developed new features in the app/platform',
    },
    {
      id: '2',
      year: 2020,
      employer: 'Encora Inc.',
      description:
        "Front End developer. Worked as a Front End Engineer for Swimlane on their amazing product using the following technologies AngularJS, Angular 12, RxJS, NgRx, MongoDB, Cypress, Jasmine/Karma, Web Components, Typescript, Javascript. Along with this, helping as a open source maintainer and contributor for the client's amazing OS Projects.",
    },
    {
      id: '1',
      year: 2018,
      employer: 'GFT Technologies',
      description:
        'Mid Front End Developer - Worked on the front end of a challenging project in the financial industry using Angular 7, Angular JS, RxJS, SCSS, Kendo UI, Ag Grid, Typescript and MySQL',
    },
    {
      id: '0',
      year: 2015,
      employer: 'Intel',
      description:
        'Layout Review Engineer / Front End Developer - Along with my engineering tasks, I did front end development work. Worked on a reporting web app for our client Intel. The web app was made using: HTML5, CSS3 (CSS Grid), JavaScript (ES6), Graphs.js, Bootstrap 4, Sass, jQuery.',
    },
  ];
}
