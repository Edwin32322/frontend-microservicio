import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { textWriter } from '../utils/textWritter';

@Directive({
  selector: '[appTextWriter]',
  standalone: true
})
export class TextWriterDirective implements OnInit {
  @Input('appTextWriter') text!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    textWriter(this.el.nativeElement, this.text);
  }
}