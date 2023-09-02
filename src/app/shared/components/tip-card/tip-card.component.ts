import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tip-card.component.html',
  styles: [],
})
export class TipCardComponent {
  @Input() tip!: any; // TODO: type this
}
