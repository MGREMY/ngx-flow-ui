/** @format */

import { Component, Input, OnInit } from '@angular/core';

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';
import * as buttonProperties from './ngx-flow-ui-button.properties';

@Component({
  selector: 'ngx-flow-ui-button',
  standalone: true,
  imports: [],
  template: ` <button [class]="buttonClass">
    <ng-content></ng-content>
  </button>`,
})
export class NgxFlowUiButtonComponent implements OnInit {
  @Input() color: properties.Color = 'blue';
  @Input() fill: properties.FillClass = 'solid';
  @Input() size: properties.Size = 'sm';

  @Input() mode: buttonProperties.buttonMode = 'label';

  buttonClass: string = '';

  ngOnInit(): void {
    this.buttonClass += buttonProperties.NgxFlowUiButtonProperties.getInstance().BaseClass;
    this.buttonClass += buttonProperties.NgxFlowUiButtonProperties.getInstance().SizeClass[this.size];
    this.buttonClass += buttonProperties.NgxFlowUiButtonProperties.getInstance().FillColorClass[this.fill][this.color];
    if (this.fill == 'outline') {
      this.buttonClass += buttonProperties.NgxFlowUiButtonProperties.getInstance().BorderColorClass[this.color];
    }
    this.buttonClass += buttonProperties.NgxFlowUiButtonProperties.getInstance().ModeClass[this.mode];
  }
}
