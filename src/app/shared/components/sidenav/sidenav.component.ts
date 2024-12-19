import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularLogoComponent } from '../angular-logo/angular-logo.component';
import { SidenavItemComponent } from '../sidenav-item/sidenav-item.component';
import { SocialsComponent } from '../social/social.component';

type NavItem = {
  label: string;
  routerLink: string;
  svgPath: string;
  secondSvgPath?: string;
};

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    imports: [
        CommonModule,
        RouterModule,
        AngularLogoComponent,
        SocialsComponent,
        SidenavItemComponent,
    ]
})
export class SidenavComponent {
  navItems: NavItem[] = [
    {
      label: 'Blog',
      routerLink: '/blog',
      svgPath:
        'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
    },
    {
      label: 'Tips',
      routerLink: '/tips',
      svgPath:
        'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z',
      secondSvgPath:
        'M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z',
    },
    // {
    //   label: 'About',
    //   routerLink: '/about',
    //   svgPath:
    //     'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    // },
    {
      label: 'Experience',
      routerLink: '/experience',
      svgPath:
        'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z',
    },
    // {
    //   label: 'Angular CLI Explorer',
    //   routerLink: '/angular-cli-explorer',
    //   svgPath:
    //     'M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z',
    // },
  ];

  @Output() navItemClicked: EventEmitter<void> = new EventEmitter();
}
