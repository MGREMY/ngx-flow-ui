/** @format */

import { Component } from '@angular/core';
import { NgxFlowUiBadgeComponent as FlowUiBadge } from '@ngx-flow-ui/lib/components/ngx-flow-ui-badge/ngx-flow-ui-badge.component';
import { NgxFlowUiButtonComponent as FlowUiButton } from '@ngx-flow-ui/lib/components/ngx-flow-ui-button/ngx-flow-ui-button.component';

@Component({
  selector: 'app-ngx-flow-ui-button',
  standalone: true,
  imports: [FlowUiButton, FlowUiBadge],
  templateUrl: './ngx-flow-ui-button.component.html',
  styleUrl: './ngx-flow-ui-button.component.scss',
})
export class NgxFlowUiButtonComponent {}
