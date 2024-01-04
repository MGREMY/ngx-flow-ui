/** @format */

import {
  a as r,
  g as i,
  h as n,
  i as p,
  l as m,
  m as a,
  n as l,
  o as s,
  p as c,
  q as f,
  r as d,
} from './chunk-73GXWYWU.js';
var u = [
  { path: 'components', loadChildren: () => import('./chunk-27QP5EJC.js') },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
var h = { providers: [d(u), c()] };
var C = (() => {
  let t = class t {
    constructor() {
      this.title = 'NgxFlowUi';
    }
  };
  (t.ɵfac = function (e) {
    return new (e || t)();
  }),
    (t.ɵcmp = r({
      type: t,
      selectors: [['app-root']],
      standalone: !0,
      features: [a],
      decls: 3,
      vars: 0,
      template: function (e, x) {
        e & 1 && (i(0, 'h1'), m(1, 'NgxFlowUi'), n(), p(2, 'router-outlet'));
      },
      dependencies: [l, f],
    }));
  let o = t;
  return o;
})();
s(C, h).catch(o => console.error(o));
