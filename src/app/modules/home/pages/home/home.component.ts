import { Component, ElementRef, ViewChild } from '@angular/core';
import { TextWriterDirective } from '../../../../core/directives/textWritter.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextWriterDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
