/** @format */

import { Route } from '@angular/router';
import { NgxFlowUiButtonComponent } from './ngx-flow-ui-button/ngx-flow-ui-button.component';
import { HomeComponent } from './home.component';

export default [
  { path: '', component: HomeComponent },
  { path: 'NgxFlowUiButton', component: NgxFlowUiButtonComponent },
] as Route[];
