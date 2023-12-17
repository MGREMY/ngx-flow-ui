/** @format */

import { Component, Input, OnInit } from '@angular/core';

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';
import * as buttonProperties from './ngx-flow-ui-button.properties';

@Component({
  selector: 'ngx-flow-ui-button',
  standalone: true,
  imports: [],
  template: `<button
    [class]="buttonClass"
    [disabled]="disabled">
    <ng-content></ng-content>
  </button>`,
  styleUrls: ['../../../../_index.scss'],
})
export class NgxFlowUiButtonComponent implements OnInit {
  @Input() color: properties.Colors = 'info';
  @Input() fill: properties.FillClass = 'solid';
  @Input() size: properties.Size = 'sm';

  @Input() disabled: boolean = false;

  buttonClass: string = '';

  ngOnInit(): void {
    this.buttonClass += buttonProperties.buttonBaseClass.default;
    this.buttonClass +=
      buttonProperties.buttonFillColorClass[this.color][this.fill];
    this.buttonClass += buttonProperties.buttonSizeClass[this.size];
  }
}
