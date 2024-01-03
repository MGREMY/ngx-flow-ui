/** @format */

import { Component, Input, OnInit } from '@angular/core';

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';
import * as buttonProperties from './ngx-flow-ui-badge.properties';

@Component({
  selector: 'ngx-flow-ui-badge',
  standalone: true,
  imports: [],
  template: `<span [className]="badgeClass">
    <ng-content></ng-content>
  </span>`,
})
export class NgxFlowUiBadgeComponent implements OnInit {
  @Input() color: properties.Color = 'blue';
  @Input() fill: properties.FillClass = 'solid';
  @Input() size: properties.Size = 'sm';

  @Input() pill: buttonProperties.buttonPill = 'disable';
  @Input() mode: buttonProperties.buttonMode = 'label';

  badgeClass: string = '';

  ngOnInit(): void {
    this.badgeClass += buttonProperties.NgxFlowUiBadgeProperties.getInstance().BaseClass;
    this.badgeClass += buttonProperties.NgxFlowUiBadgeProperties.getInstance().SizeClass[this.size];
    this.badgeClass += buttonProperties.NgxFlowUiBadgeProperties.getInstance().FillColorClass[this.fill][this.color];
    if (this.fill == 'outline' || this.mode == 'label+svg') {
      this.badgeClass += buttonProperties.NgxFlowUiBadgeProperties.getInstance().BorderColorClass[this.color];
    }
    this.badgeClass += buttonProperties.NgxFlowUiBadgeProperties.getInstance().ModeClass[this.mode];
    if (this.pill == 'enable' || this.mode == 'svg') {
      this.badgeClass += buttonProperties.NgxFlowUiBadgeProperties.getInstance().PillClass['enable'];
    } else {
      this.badgeClass += buttonProperties.NgxFlowUiBadgeProperties.getInstance().PillClass[this.pill];
    }
  }
}
