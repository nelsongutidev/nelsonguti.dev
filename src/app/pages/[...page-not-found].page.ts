import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export const routeMeta: RouteMeta = {
  title: '404',
};
@Component({
    imports: [RouterLink],
    template: `
    <section class="bg-base-100 md:pt-16 pt-4 flex-col">
      <div class="container flex items-center ">
        <div class="flex flex-col items-center max-w-sm mx-auto text-center">
          <p class="p-3 text-sm font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-12 h-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 class="mt-3 text-2xl font-semibold md:text-3xl">
            Page not found
          </h1>
          <p class="mt-4 ">
            The page you are looking for doesn't exist. Here are some helpful
            links:
          </p>

          <div
            class="flex items-center w-full mt-6 gap-4 shrink-0 sm:w-auto flex-wrap justify-center"
          >
            <a class="btn btn-primary" routerLink="/">
              <svg
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
                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
    host: {
        class: 'flex flex-col w-full ',
    }
})
export default class PageNotFoundComponent {}
