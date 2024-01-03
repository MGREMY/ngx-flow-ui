/** @format */

import { Component, Input, OnInit } from '@angular/core';

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';
import * as buttonProperties from './ngx-flow-ui-button.properties';

@Component({
  selector: 'ngx-flow-ui-button',
  standalone: true,
  imports: [],
  template: `<button [class]="buttonClass">
    <ng-content></ng-content>
  </button>`,
})
export class NgxFlowUiButtonComponent implements OnInit {
  @Input() color: properties.Color = 'default';
  @Input() fill: properties.FillClass = 'solid';
  @Input() size: properties.Size = 'sm';

  buttonClass: string = '';

  ngOnInit(): void {
    this.buttonClass = buttonProperties.buttonBaseClass.default;
    this.buttonClass +=
      buttonProperties.buttonFillColorClass[this.fill][this.color];
    this.buttonClass += buttonProperties.buttonSizeClass[this.size];
  }
}
