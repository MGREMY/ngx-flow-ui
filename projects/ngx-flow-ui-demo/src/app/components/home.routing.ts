/** @format */

import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgxFlowUiBadgeComponent } from './ngx-flow-ui-badge/ngx-flow-ui-badge.component';
import { NgxFlowUiButtonComponent } from './ngx-flow-ui-button/ngx-flow-ui-button.component';

export default [
  { path: '', component: HomeComponent },
  { path: 'NgxFlowUiBadge', component: NgxFlowUiBadgeComponent },
  { path: 'NgxFlowUiButton', component: NgxFlowUiButtonComponent },
] as Route[];
