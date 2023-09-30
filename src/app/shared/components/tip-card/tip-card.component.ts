import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tip-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tip-card.component.html',
  styles: [],
  host: {
    class: 'flex flex-col',
  },
})
export class TipCardComponent {
  @Input() tip!: any; // TODO: type this
}
