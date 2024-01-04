/** @format */

import { Component, Input, OnInit } from '@angular/core';

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';
import * as badgeProperties from './ngx-flow-ui-badge.properties';

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

  @Input() pill: badgeProperties.badgePill = 'disable';
  @Input() mode: badgeProperties.badgeMode = 'label';

  @Input() buttonBadge: boolean = false;

  badgeClass: string = '';

  ngOnInit(): void {
    this.badgeClass += badgeProperties.NgxFlowUiBadgeProperties.getInstance().BaseClass;
    if (!this.buttonBadge) {
      this.badgeClass += badgeProperties.NgxFlowUiBadgeProperties.getInstance().SizeClass[this.size];
      this.badgeClass += badgeProperties.NgxFlowUiBadgeProperties.getInstance().FillColorClass[this.fill][this.color];
      this.badgeClass += badgeProperties.NgxFlowUiBadgeProperties.getInstance().ModeClass[this.mode];
      this.badgeClass +=
        badgeProperties.NgxFlowUiBadgeProperties.getInstance().BorderFillColorClass[
          this.mode == 'label+svg' || this.fill == 'outline' ? 'outline' : this.fill
        ][this.color];
      this.badgeClass +=
        badgeProperties.NgxFlowUiBadgeProperties.getInstance().PillClass[
          this.pill == 'enable' || this.mode == 'svg' ? 'enable' : this.pill
        ];
    }
  }
}
