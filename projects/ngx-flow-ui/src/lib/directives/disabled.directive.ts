/** @format */

import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxFlowUiDisabled]',
  standalone: true,
})
export class DisabledDirective {
  constructor(
    protected el: ElementRef,
    protected renderer: Renderer2
  ) {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', '');
    this.renderer.addClass(this.el.nativeElement, 'disabled');
  }
}
