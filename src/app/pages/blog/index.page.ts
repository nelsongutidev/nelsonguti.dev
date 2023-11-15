import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { NgFor } from '@angular/common';
import { RouteMeta } from '@analogjs/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PostAttributes } from '../../shared/models/post-attributes';

// TODO: move this to a shared file and type properly

export const routeMeta: RouteMeta = {
  title: 'Blog',
};

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgFor, HeaderComponent],
  template: `
    <app-header [title]="'Blog'" />

    <main class="md:py-8 flex flex-wrap justify-center gap-6 my-12 px-4">
      @for (post of posts; track post) {
      <div class="card w-96 bg-base-100 border">
        <figure>
          <img
            [routerLink]="['/blog', post.slug]"
            class="w-full max-h-48 object-cover cursor-pointer"
            [src]="post.attributes.image"
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <a [routerLink]="['/blog', post.slug]" class="hover:underline">
            <h2 class="card-title">{{ post?.attributes?.title }}</h2></a
          >
          <p>{{ post?.attributes?.description }}</p>
        </div>
      </div>
      }
    </main>
  `,
})
export default class BlogListComponent {
  readonly posts = injectContentFiles<PostAttributes>((contentFile: any) => {
    return (
      contentFile.filename.includes('/src/content/blog') &&
      contentFile.attributes.published
    );
  })?.sort((a, b) =>
    new Date(a.attributes.date) > new Date(b.attributes.date) ? -1 : 1
  );
}
