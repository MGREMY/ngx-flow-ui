/** @format */

import { Component, Input, OnInit } from '@angular/core';

import * as properties from '@ngx-flow-ui/lib/components/ngx-flow-ui.properties';
import { NgxFlowUiBadgeProperties } from './ngx-flow-ui-badge.properties';

@Component({
  selector: 'ngx-flow-ui-badge',
  standalone: true,
  imports: [],
  template: '',
})
export class NgxFlowUiBadgeComponent implements OnInit {
  @Input() color: properties.Color = 'default';
  @Input() fill: properties.FillClass = 'solid';
  @Input() size: properties.Size = 'sm';

  badgeClass: string = '';

  ngOnInit(): void {
    this.badgeClass += NgxFlowUiBadgeProperties.getInstance().BaseClass.default;
    this.badgeClass +=
      NgxFlowUiBadgeProperties.getInstance().FillColorClass[this.fill][
        this.color
      ];
    this.badgeClass +=
      NgxFlowUiBadgeProperties.getInstance().SizeClass[this.size];
  }
}
