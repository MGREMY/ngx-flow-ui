/** @format */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NgxFlowUiButtonComponent } from '@ngx-flow-ui/lib/components/ngx-flow-ui-button/ngx-flow-ui-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxFlowUiButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'NgxFlowUi';
}
