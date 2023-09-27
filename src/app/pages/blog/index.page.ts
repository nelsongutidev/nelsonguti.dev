import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { NgFor } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import { HeaderComponent } from '../../shared/components/header/header.component';

// TODO: move this to a shared file and type properly

export const routeMeta: RouteMeta = {
  title: 'Blog',
};

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, HeaderComponent],
  template: `
    <app-header [title]="'Blog'" />

    <main class="md:py-8 flex flex-wrap justify-center gap-6 mb-6 px-4">
      <div *ngFor="let post of posts" class="card w-96 bg-base-200 shadow-xl ">
        <div class="card-body">
          <a [routerLink]="['/blog', post.slug]" class="hover:underline">
            <h2 class="card-title">{{ post?.attributes?.title }}</h2></a
          >
          <p>{{ post?.attributes?.description }}</p>
        </div>
      </div>
    </main>
  `,
})
export default class BlogListComponent {
  readonly posts = injectContentFiles<PostAttributes>((contentFile: any) => {
    return (
      contentFile.filename.includes('/src/content/blog') &&
      contentFile.attributes.published
    );
  });
}
