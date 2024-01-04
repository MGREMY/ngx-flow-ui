/** @format */

import {
  a as g,
  b as r,
  c as a,
  d as u,
  e as d,
  f as v,
  g as e,
  h as t,
  i as o,
  j as p,
  k as w,
  l,
  m,
} from './chunk-73GXWYWU.js';
var y = (() => {
  let i = class i {};
  (i.ɵfac = function (s) {
    return new (s || i)();
  }),
    (i.ɵcmp = g({
      type: i,
      selectors: [['app-home-component']],
      standalone: !0,
      features: [m],
      decls: 2,
      vars: 0,
      template: function (s, f) {
        s & 1 && (e(0, 'h1'), l(1, 'Home component'), t());
      },
    }));
  let n = i;
  return n;
})();
var c = class n {
  constructor() {
    (this.BaseClass = ''),
      (this.FillColorClass = {
        solid: {
          blue: ' bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-800',
          red: ' bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-800',
          green: ' bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-800',
          yellow: ' bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-800',
        },
        outline: {
          blue: ' text-blue-800 dark:text-blue-800',
          red: ' text-red-800 dark:text-red-800',
          green: ' text-green-800 dark:text-green-800',
          yellow: ' text-yellow-800 dark:text-yellow-800',
        },
      }),
      (this.SizeClass = { xs: ' text-xs', sm: ' text-sm', md: ' text-base', lg: ' text-lg', xl: ' text-xl' }),
      (this.BorderFillColorClass = {
        solid: { blue: '', red: '', green: '', yellow: '' },
        outline: {
          blue: ' border border-blue-400',
          red: ' border border-red-400',
          green: ' border border-green-400',
          yellow: ' border border-yellow-400',
        },
      }),
      (this.PillClass = { enable: ' rounded-full', disable: ' rounded' }),
      (this.ModeClass = {
        label: ' px-2.5 py-0.5 font-medium',
        svg: ' inline-flex items-center justify-center w-6 h-6 font-semibold',
        'label+svg': ' px-2.5 py-0.5 inline-flex items-center font-medium',
      });
  }
  static getInstance() {
    return n.instance || (n.instance = new n()), n.instance;
  }
};
var F = ['*'],
  S = (() => {
    let i = class i {
      constructor() {
        (this.color = 'blue'),
          (this.fill = 'solid'),
          (this.size = 'sm'),
          (this.pill = 'disable'),
          (this.mode = 'label'),
          (this.buttonBadge = !1),
          (this.badgeClass = '');
      }
      ngOnInit() {
        (this.badgeClass += c.getInstance().BaseClass),
          this.buttonBadge ||
            ((this.badgeClass += c.getInstance().SizeClass[this.size]),
            (this.badgeClass += c.getInstance().FillColorClass[this.fill][this.color]),
            (this.badgeClass += c.getInstance().ModeClass[this.mode]),
            (this.badgeClass +=
              c.getInstance().BorderFillColorClass[
                this.mode == 'label+svg' || this.fill == 'outline' ? 'outline' : this.fill
              ][this.color]),
            (this.badgeClass +=
              c.getInstance().PillClass[this.pill == 'enable' || this.mode == 'svg' ? 'enable' : this.pill]));
      }
    };
    (i.ɵfac = function (s) {
      return new (s || i)();
    }),
      (i.ɵcmp = g({
        type: i,
        selectors: [['ngx-flow-ui-badge']],
        inputs: { color: 'color', fill: 'fill', size: 'size', pill: 'pill', mode: 'mode', buttonBadge: 'buttonBadge' },
        standalone: !0,
        features: [m],
        ngContentSelectors: F,
        decls: 2,
        vars: 1,
        consts: [[3, 'className']],
        template: function (s, f) {
          s & 1 && (p(), e(0, 'span', 0), w(1), t()), s & 2 && d('className', f.badgeClass);
        },
        encapsulation: 2,
      }));
    let n = i;
    return n;
  })();
var C = (() => {
  let i = class i {};
  (i.ɵfac = function (s) {
    return new (s || i)();
  }),
    (i.ɵcmp = g({
      type: i,
      selectors: [['app-ngx-flow-ui-badge']],
      standalone: !0,
      features: [m],
      decls: 65,
      vars: 0,
      consts: [
        ['color', 'blue', 'fill', 'solid', 'size', 'xs'],
        ['color', 'red', 'fill', 'solid', 'size', 'xs'],
        ['color', 'green', 'fill', 'solid', 'size', 'xs'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'xs'],
        ['color', 'blue', 'fill', 'solid', 'size', 'lg'],
        ['color', 'red', 'fill', 'solid', 'size', 'lg'],
        ['color', 'green', 'fill', 'solid', 'size', 'lg'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'lg'],
        ['color', 'blue', 'fill', 'outline', 'size', 'xs'],
        ['color', 'red', 'fill', 'outline', 'size', 'xs'],
        ['color', 'green', 'fill', 'outline', 'size', 'xs'],
        ['color', 'yellow', 'fill', 'outline', 'size', 'xs'],
        ['color', 'blue', 'fill', 'solid', 'size', 'xs', 'pill', 'enable'],
        ['color', 'red', 'fill', 'solid', 'size', 'xs', 'pill', 'enable'],
        ['color', 'green', 'fill', 'solid', 'size', 'xs', 'pill', 'enable'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'xs', 'pill', 'enable'],
        ['color', 'blue', 'fill', 'solid', 'size', 'xs', 'mode', 'svg'],
        ['xmlns', 'http://www.w3.org/2000/svg', 'fill', 'currentColor', 'viewBox', '0 0 20 20', 1, 'h-3', 'w-3'],
        [
          'd',
          'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z',
        ],
        ['color', 'red', 'fill', 'solid', 'size', 'xs', 'mode', 'svg'],
        ['color', 'green', 'fill', 'solid', 'size', 'xs', 'mode', 'svg'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'xs', 'mode', 'svg'],
        ['color', 'blue', 'fill', 'solid', 'size', 'xs', 'mode', 'label+svg'],
        [
          'xmlns',
          'http://www.w3.org/2000/svg',
          'fill',
          'currentColor',
          'viewBox',
          '0 0 20 20',
          1,
          'me-1.5',
          'h-3',
          'w-3',
        ],
        ['color', 'red', 'fill', 'solid', 'size', 'xs', 'mode', 'label+svg'],
        ['color', 'green', 'fill', 'solid', 'size', 'xs', 'mode', 'label+svg'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'xs', 'mode', 'label+svg'],
      ],
      template: function (s, f) {
        s & 1 &&
          (e(0, 'ngx-flow-ui-badge', 0),
          l(1, 'Blue'),
          t(),
          e(2, 'ngx-flow-ui-badge', 1),
          l(3, 'Red'),
          t(),
          e(4, 'ngx-flow-ui-badge', 2),
          l(5, 'Green'),
          t(),
          e(6, 'ngx-flow-ui-badge', 3),
          l(7, 'Yellow'),
          t(),
          o(8, 'br'),
          e(9, 'ngx-flow-ui-badge', 4),
          l(10, 'Blue'),
          t(),
          e(11, 'ngx-flow-ui-badge', 5),
          l(12, 'Red'),
          t(),
          e(13, 'ngx-flow-ui-badge', 6),
          l(14, 'Green'),
          t(),
          e(15, 'ngx-flow-ui-badge', 7),
          l(16, 'Yellow'),
          t(),
          o(17, 'br'),
          e(18, 'ngx-flow-ui-badge', 8),
          l(19, 'Blue'),
          t(),
          e(20, 'ngx-flow-ui-badge', 9),
          l(21, 'Red'),
          t(),
          e(22, 'ngx-flow-ui-badge', 10),
          l(23, 'Green'),
          t(),
          e(24, 'ngx-flow-ui-badge', 11),
          l(25, 'Yellow'),
          t(),
          o(26, 'br'),
          e(27, 'ngx-flow-ui-badge', 12),
          l(28, 'Blue'),
          t(),
          e(29, 'ngx-flow-ui-badge', 13),
          l(30, 'Red'),
          t(),
          e(31, 'ngx-flow-ui-badge', 14),
          l(32, 'Green'),
          t(),
          e(33, 'ngx-flow-ui-badge', 15),
          l(34, 'Yellow'),
          t(),
          o(35, 'br'),
          e(36, 'ngx-flow-ui-badge', 16),
          r(),
          e(37, 'svg', 17),
          o(38, 'path', 18),
          t()(),
          a(),
          e(39, 'ngx-flow-ui-badge', 19),
          r(),
          e(40, 'svg', 17),
          o(41, 'path', 18),
          t()(),
          a(),
          e(42, 'ngx-flow-ui-badge', 20),
          r(),
          e(43, 'svg', 17),
          o(44, 'path', 18),
          t()(),
          a(),
          e(45, 'ngx-flow-ui-badge', 21),
          r(),
          e(46, 'svg', 17),
          o(47, 'path', 18),
          t()(),
          a(),
          o(48, 'br'),
          e(49, 'ngx-flow-ui-badge', 22),
          r(),
          e(50, 'svg', 23),
          o(51, 'path', 18),
          t(),
          l(
            52,
            ` Blue
`
          ),
          t(),
          a(),
          e(53, 'ngx-flow-ui-badge', 24),
          r(),
          e(54, 'svg', 23),
          o(55, 'path', 18),
          t(),
          l(
            56,
            ` Red
`
          ),
          t(),
          a(),
          e(57, 'ngx-flow-ui-badge', 25),
          r(),
          e(58, 'svg', 23),
          o(59, 'path', 18),
          t(),
          l(
            60,
            ` Green
`
          ),
          t(),
          a(),
          e(61, 'ngx-flow-ui-badge', 26),
          r(),
          e(62, 'svg', 23),
          o(63, 'path', 18),
          t(),
          l(
            64,
            ` Yellow
`
          ),
          t());
      },
      dependencies: [S],
    }));
  let n = i;
  return n;
})();
var x = class n {
  constructor() {
    (this.BaseClass = 'm-1 font-medium enabled:focus:ring-2 enabled:focus:outline-none disabled:cursor-not-allowed'),
      (this.FillColorClass = {
        solid: {
          blue: ' text-white bg-blue-700 enabled:hover:bg-blue-800 enabled:focus:ring-blue-300 enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800',
          red: ' text-white bg-red-700 enabled:hover:bg-red-800 enabled:focus:ring-red-300 enabled:dark:bg-red-600 enabled:dark:hover:bg-red-700 enabled:dark:focus:ring-red-800',
          green:
            ' text-white bg-green-700 enabled:hover:bg-green-800 enabled:focus:ring-green-300 enabled:dark:bg-green-600 enabled:dark:hover:bg-green-700 enabled:dark:focus:ring-green-800',
          yellow:
            ' text-white bg-yellow-400 enabled:hover:bg-yellow-500 enabled:focus:ring-yellow-300 enabled:dark:bg-yellow-900 enabled:dark:focus:ring-yellow-900',
        },
        outline: {
          blue: ' text-blue-700 enabled:hover:text-white enabled:hover:bg-blue-800 enabled:focus:ring-blue-300 enabled:dark:focus:ring-blue-800',
          red: ' text-red-700 enabled:hover:text-white enabled:hover:bg-red-800 enabled:focus:ring-red-300 enabled:dark:focus:ring-red-800',
          green:
            ' text-green-700 enabled:hover:text-white enabled:hover:bg-green-800 enabled:focus:ring-green-300 enabled:dark:focus:ring-green-800',
          yellow:
            ' text-yellow-400 enabled:hover:text-white enabled:hover:bg-yellow-500 enabled:focus:ring-yellow-300 enabled:dark:focus:ring-yellow-900',
        },
      }),
      (this.SizeClass = { xs: ' text-xs', sm: ' text-sm', md: ' text-base', lg: ' text-lg', xl: ' text-xl' }),
      (this.BorderFillColorClass = {
        solid: { blue: '', red: '', green: '', yellow: '' },
        outline: {
          blue: ' border border-blue-700 disabled:border-blue-400',
          red: ' border border-red-700 disabled:border-red-400',
          green: ' border border-green-700 disabled:border-green-400',
          yellow: ' border border-yellow-400 disabled:border-yellow-300',
        },
      }),
      (this.DisabledFillColorClass = {
        solid: {
          blue: ' disabled:bg-blue-400 disabled:dark:bg-blue-500',
          red: ' disabled:bg-red-400 disabled:dark:bg-red-500',
          green: ' disabled:bg-green-400 disabled:dark:bg-green-500',
          yellow: ' disabled:bg-yellow-300 disabled:dark:bg-yellow-600',
        },
        outline: {
          blue: ' disabled:text-blue-400 disabled:dark:text-blue-500',
          red: ' disabled:text-red-400 disabled:dark:text-red-500',
          green: ' disabled:text-green-400 disabled:dark:text-green-500',
          yellow: ' disabled:text-yellow-300 disabled:dark:text-yellow-600',
        },
      }),
      (this.ModeClass = {
        label: ' px-3 py-2 rounded-lg',
        svg: ' p-2 inline-flex items-center text-center rounded-full',
        'label+svg': ' px-3 py-2 inline-flex items-center text-center rounded-lg',
      });
  }
  static getInstance() {
    return n.instance || (n.instance = new n()), n.instance;
  }
};
var M = ['*'],
  z = (() => {
    let i = class i {
      constructor() {
        (this.color = 'blue'),
          (this.fill = 'solid'),
          (this.size = 'sm'),
          (this.mode = 'label'),
          (this.disabled = !1),
          (this.buttonClass = '');
      }
      ngOnInit() {
        (this.buttonClass += x.getInstance().BaseClass),
          (this.buttonClass += x.getInstance().SizeClass[this.size]),
          (this.buttonClass += x.getInstance().FillColorClass[this.fill][this.color]),
          (this.buttonClass += x.getInstance().BorderFillColorClass[this.fill][this.color]),
          (this.buttonClass += x.getInstance().ModeClass[this.mode]),
          (this.buttonClass += x.getInstance().DisabledFillColorClass[this.fill][this.color]);
      }
    };
    (i.ɵfac = function (s) {
      return new (s || i)();
    }),
      (i.ɵcmp = g({
        type: i,
        selectors: [['ngx-flow-ui-button']],
        inputs: { color: 'color', fill: 'fill', size: 'size', mode: 'mode', disabled: 'disabled' },
        standalone: !0,
        features: [m],
        ngContentSelectors: M,
        decls: 2,
        vars: 3,
        consts: [['type', 'button', 3, 'disabled']],
        template: function (s, f) {
          s & 1 && (p(), e(0, 'button', 0), w(1), t()), s & 2 && (v(f.buttonClass), d('disabled', f.disabled));
        },
        encapsulation: 2,
      }));
    let n = i;
    return n;
  })();
var E = (() => {
  let i = class i {};
  (i.ɵfac = function (s) {
    return new (s || i)();
  }),
    (i.ɵcmp = g({
      type: i,
      selectors: [['app-ngx-flow-ui-button']],
      standalone: !0,
      features: [m],
      decls: 69,
      vars: 8,
      consts: [
        ['color', 'blue', 'fill', 'solid', 'size', 'xs'],
        ['color', 'red', 'fill', 'solid', 'size', 'xs'],
        ['color', 'green', 'fill', 'solid', 'size', 'xs'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'xs'],
        ['color', 'blue', 'fill', 'solid', 'size', 'xs', 3, 'disabled'],
        ['color', 'red', 'fill', 'solid', 'size', 'xs', 3, 'disabled'],
        ['color', 'green', 'fill', 'solid', 'size', 'xs', 3, 'disabled'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'xs', 3, 'disabled'],
        ['color', 'blue', 'fill', 'solid', 'size', 'lg'],
        ['color', 'red', 'fill', 'solid', 'size', 'lg'],
        ['color', 'green', 'fill', 'solid', 'size', 'lg'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'lg'],
        ['color', 'blue', 'fill', 'outline', 'size', 'xs'],
        ['color', 'red', 'fill', 'outline', 'size', 'xs'],
        ['color', 'green', 'fill', 'outline', 'size', 'xs'],
        ['color', 'yellow', 'fill', 'outline', 'size', 'xs'],
        ['color', 'blue', 'fill', 'solid', 'size', 'xs', 'mode', 'svg'],
        ['xmlns', 'http://www.w3.org/2000/svg', 'fill', 'currentColor', 'viewBox', '0 0 20 20', 1, 'h-4', 'w-4'],
        [
          'd',
          'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z',
        ],
        ['color', 'red', 'fill', 'solid', 'size', 'xs', 'mode', 'svg'],
        ['color', 'green', 'fill', 'solid', 'size', 'xs', 'mode', 'svg'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'xs', 'mode', 'svg'],
        ['color', 'blue', 'fill', 'solid', 'size', 'xs', 'mode', 'label+svg'],
        [3, 'buttonBadge'],
        [
          'xmlns',
          'http://www.w3.org/2000/svg',
          'fill',
          'currentColor',
          'viewBox',
          '0 0 20 20',
          1,
          'ms-1.5',
          'h-5',
          'w-5',
        ],
        ['color', 'red', 'fill', 'solid', 'size', 'xs', 'mode', 'label+svg'],
        ['color', 'green', 'fill', 'solid', 'size', 'xs', 'mode', 'label+svg'],
        ['color', 'yellow', 'fill', 'solid', 'size', 'xs', 'mode', 'label+svg'],
      ],
      template: function (s, f) {
        s & 1 &&
          (e(0, 'ngx-flow-ui-button', 0),
          l(1, 'Blue'),
          t(),
          e(2, 'ngx-flow-ui-button', 1),
          l(3, 'Red'),
          t(),
          e(4, 'ngx-flow-ui-button', 2),
          l(5, 'Green'),
          t(),
          e(6, 'ngx-flow-ui-button', 3),
          l(7, 'Yellow'),
          t(),
          o(8, 'br'),
          e(9, 'ngx-flow-ui-button', 4),
          l(10, 'Blue'),
          t(),
          e(11, 'ngx-flow-ui-button', 5),
          l(12, 'Red'),
          t(),
          e(13, 'ngx-flow-ui-button', 6),
          l(14, 'Green'),
          t(),
          e(15, 'ngx-flow-ui-button', 7),
          l(16, 'Yellow'),
          t(),
          o(17, 'br'),
          e(18, 'ngx-flow-ui-button', 8),
          l(19, 'Blue'),
          t(),
          e(20, 'ngx-flow-ui-button', 9),
          l(21, 'Red'),
          t(),
          e(22, 'ngx-flow-ui-button', 10),
          l(23, 'Green'),
          t(),
          e(24, 'ngx-flow-ui-button', 11),
          l(25, 'Yellow'),
          t(),
          o(26, 'br'),
          e(27, 'ngx-flow-ui-button', 12),
          l(28, 'Blue'),
          t(),
          e(29, 'ngx-flow-ui-button', 13),
          l(30, 'Red'),
          t(),
          e(31, 'ngx-flow-ui-button', 14),
          l(32, 'Green'),
          t(),
          e(33, 'ngx-flow-ui-button', 15),
          l(34, 'Yellow'),
          t(),
          o(35, 'br'),
          e(36, 'ngx-flow-ui-button', 16),
          r(),
          e(37, 'svg', 17),
          o(38, 'path', 18),
          t()(),
          a(),
          e(39, 'ngx-flow-ui-button', 19),
          r(),
          e(40, 'svg', 17),
          o(41, 'path', 18),
          t()(),
          a(),
          e(42, 'ngx-flow-ui-button', 20),
          r(),
          e(43, 'svg', 17),
          o(44, 'path', 18),
          t()(),
          a(),
          e(45, 'ngx-flow-ui-button', 21),
          r(),
          e(46, 'svg', 17),
          o(47, 'path', 18),
          t()(),
          a(),
          o(48, 'br'),
          e(49, 'ngx-flow-ui-button', 22),
          l(50, ' Blue '),
          e(51, 'ngx-flow-ui-badge', 23),
          r(),
          e(52, 'svg', 24),
          o(53, 'path', 18),
          t()()(),
          a(),
          e(54, 'ngx-flow-ui-button', 25),
          l(55, ' Red '),
          e(56, 'ngx-flow-ui-badge', 23),
          r(),
          e(57, 'svg', 24),
          o(58, 'path', 18),
          t()()(),
          a(),
          e(59, 'ngx-flow-ui-button', 26),
          l(60, ' Green '),
          e(61, 'ngx-flow-ui-badge', 23),
          r(),
          e(62, 'svg', 24),
          o(63, 'path', 18),
          t()()(),
          a(),
          e(64, 'ngx-flow-ui-button', 27),
          l(65, ' Yellow '),
          e(66, 'ngx-flow-ui-badge', 23),
          r(),
          e(67, 'svg', 24),
          o(68, 'path', 18),
          t()()()),
          s & 2 &&
            (u(9),
            d('disabled', !0),
            u(2),
            d('disabled', !0),
            u(2),
            d('disabled', !0),
            u(2),
            d('disabled', !0),
            u(36),
            d('buttonBadge', !0),
            u(5),
            d('buttonBadge', !0),
            u(5),
            d('buttonBadge', !0),
            u(5),
            d('buttonBadge', !0));
      },
      dependencies: [z, S],
    }));
  let n = i;
  return n;
})();
var Y = [
  { path: '', component: y },
  { path: 'NgxFlowUiBadge', component: C },
  { path: 'NgxFlowUiButton', component: E },
];
export { Y as default };
