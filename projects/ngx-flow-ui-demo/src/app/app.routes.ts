/** @format */

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'components',
    loadChildren: () => import('./components/home.routing'),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
