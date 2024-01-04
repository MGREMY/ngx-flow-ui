import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵtext
} from "./chunk-QUBWZP3B.js";

// projects/ngx-flow-ui-demo/src/app/components/home.component.ts
var _HomeComponent = class _HomeComponent {
};
_HomeComponent.\u0275fac = function HomeComponent_Factory(t) {
  return new (t || _HomeComponent)();
};
_HomeComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home-component"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 0, template: function HomeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1");
    \u0275\u0275text(1, "Home component");
    \u0275\u0275elementEnd();
  }
}, styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"] });
var HomeComponent = _HomeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "projects/ngx-flow-ui-demo/src/app/components/home.component.ts", lineNumber: 13 });
})();

// projects/ngx-flow-ui/src/lib/components/ngx-flow-ui-badge/ngx-flow-ui-badge.properties.ts
var NgxFlowUiBadgeProperties = class _NgxFlowUiBadgeProperties {
  constructor() {
    this.BaseClass = "";
    this.FillColorClass = {
      solid: {
        blue: " bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-800",
        red: " bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-800",
        green: " bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-800",
        yellow: " bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-800"
      },
      outline: {
        blue: " text-blue-800 dark:text-blue-800",
        red: " text-red-800 dark:text-red-800",
        green: " text-green-800 dark:text-green-800",
        yellow: " text-yellow-800 dark:text-yellow-800"
      }
    };
    this.SizeClass = {
      xs: " text-xs",
      sm: " text-sm",
      md: " text-base",
      lg: " text-lg",
      xl: " text-xl"
    };
    this.BorderFillColorClass = {
      solid: {
        blue: "",
        red: "",
        green: "",
        yellow: ""
      },
      outline: {
        blue: " border border-blue-400",
        red: " border border-red-400",
        green: " border border-green-400",
        yellow: " border border-yellow-400"
      }
    };
    this.PillClass = {
      enable: " rounded-full",
      disable: " rounded"
    };
    this.ModeClass = {
      label: " px-2.5 py-0.5 font-medium",
      svg: " inline-flex items-center justify-center w-6 h-6 font-semibold",
      "label+svg": " px-2.5 py-0.5 inline-flex items-center font-medium"
    };
  }
  static getInstance() {
    if (!_NgxFlowUiBadgeProperties.instance) {
      _NgxFlowUiBadgeProperties.instance = new _NgxFlowUiBadgeProperties();
    }
    return _NgxFlowUiBadgeProperties.instance;
  }
};

// projects/ngx-flow-ui/src/lib/components/ngx-flow-ui-badge/ngx-flow-ui-badge.component.ts
var _c0 = ["*"];
var _NgxFlowUiBadgeComponent = class _NgxFlowUiBadgeComponent {
  constructor() {
    this.color = "blue";
    this.fill = "solid";
    this.size = "sm";
    this.pill = "disable";
    this.mode = "label";
    this.buttonBadge = false;
    this.badgeClass = "";
  }
  ngOnInit() {
    this.badgeClass += NgxFlowUiBadgeProperties.getInstance().BaseClass;
    if (!this.buttonBadge) {
      this.badgeClass += NgxFlowUiBadgeProperties.getInstance().SizeClass[this.size];
      this.badgeClass += NgxFlowUiBadgeProperties.getInstance().FillColorClass[this.fill][this.color];
      this.badgeClass += NgxFlowUiBadgeProperties.getInstance().ModeClass[this.mode];
      this.badgeClass += NgxFlowUiBadgeProperties.getInstance().BorderFillColorClass[this.mode == "label+svg" || this.fill == "outline" ? "outline" : this.fill][this.color];
      this.badgeClass += NgxFlowUiBadgeProperties.getInstance().PillClass[this.pill == "enable" || this.mode == "svg" ? "enable" : this.pill];
    }
  }
};
_NgxFlowUiBadgeComponent.\u0275fac = function NgxFlowUiBadgeComponent_Factory(t) {
  return new (t || _NgxFlowUiBadgeComponent)();
};
_NgxFlowUiBadgeComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NgxFlowUiBadgeComponent, selectors: [["ngx-flow-ui-badge"]], inputs: { color: "color", fill: "fill", size: "size", pill: "pill", mode: "mode", buttonBadge: "buttonBadge" }, standalone: true, features: [\u0275\u0275StandaloneFeature], ngContentSelectors: _c0, decls: 2, vars: 1, consts: [[3, "className"]], template: function NgxFlowUiBadgeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef();
    \u0275\u0275elementStart(0, "span", 0);
    \u0275\u0275projection(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275property("className", ctx.badgeClass);
  }
}, encapsulation: 2 });
var NgxFlowUiBadgeComponent = _NgxFlowUiBadgeComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NgxFlowUiBadgeComponent, { className: "NgxFlowUiBadgeComponent", filePath: "projects/ngx-flow-ui/src/lib/components/ngx-flow-ui-badge/ngx-flow-ui-badge.component.ts", lineNumber: 16 });
})();

// projects/ngx-flow-ui-demo/src/app/components/ngx-flow-ui-badge/ngx-flow-ui-badge.component.ts
var _NgxFlowUiBadgeComponent2 = class _NgxFlowUiBadgeComponent2 {
};
_NgxFlowUiBadgeComponent2.\u0275fac = function NgxFlowUiBadgeComponent_Factory(t) {
  return new (t || _NgxFlowUiBadgeComponent2)();
};
_NgxFlowUiBadgeComponent2.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NgxFlowUiBadgeComponent2, selectors: [["app-ngx-flow-ui-badge"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 65, vars: 0, consts: [["color", "blue", "fill", "solid", "size", "xs"], ["color", "red", "fill", "solid", "size", "xs"], ["color", "green", "fill", "solid", "size", "xs"], ["color", "yellow", "fill", "solid", "size", "xs"], ["color", "blue", "fill", "solid", "size", "lg"], ["color", "red", "fill", "solid", "size", "lg"], ["color", "green", "fill", "solid", "size", "lg"], ["color", "yellow", "fill", "solid", "size", "lg"], ["color", "blue", "fill", "outline", "size", "xs"], ["color", "red", "fill", "outline", "size", "xs"], ["color", "green", "fill", "outline", "size", "xs"], ["color", "yellow", "fill", "outline", "size", "xs"], ["color", "blue", "fill", "solid", "size", "xs", "pill", "enable"], ["color", "red", "fill", "solid", "size", "xs", "pill", "enable"], ["color", "green", "fill", "solid", "size", "xs", "pill", "enable"], ["color", "yellow", "fill", "solid", "size", "xs", "pill", "enable"], ["color", "blue", "fill", "solid", "size", "xs", "mode", "svg"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-3", "w-3"], ["d", "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"], ["color", "red", "fill", "solid", "size", "xs", "mode", "svg"], ["color", "green", "fill", "solid", "size", "xs", "mode", "svg"], ["color", "yellow", "fill", "solid", "size", "xs", "mode", "svg"], ["color", "blue", "fill", "solid", "size", "xs", "mode", "label+svg"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 20 20", 1, "me-1.5", "h-3", "w-3"], ["color", "red", "fill", "solid", "size", "xs", "mode", "label+svg"], ["color", "green", "fill", "solid", "size", "xs", "mode", "label+svg"], ["color", "yellow", "fill", "solid", "size", "xs", "mode", "label+svg"]], template: function NgxFlowUiBadgeComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ngx-flow-ui-badge", 0);
    \u0275\u0275text(1, "Blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ngx-flow-ui-badge", 1);
    \u0275\u0275text(3, "Red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ngx-flow-ui-badge", 2);
    \u0275\u0275text(5, "Green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "ngx-flow-ui-badge", 3);
    \u0275\u0275text(7, "Yellow");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "br");
    \u0275\u0275elementStart(9, "ngx-flow-ui-badge", 4);
    \u0275\u0275text(10, "Blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ngx-flow-ui-badge", 5);
    \u0275\u0275text(12, "Red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "ngx-flow-ui-badge", 6);
    \u0275\u0275text(14, "Green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ngx-flow-ui-badge", 7);
    \u0275\u0275text(16, "Yellow");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "br");
    \u0275\u0275elementStart(18, "ngx-flow-ui-badge", 8);
    \u0275\u0275text(19, "Blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "ngx-flow-ui-badge", 9);
    \u0275\u0275text(21, "Red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "ngx-flow-ui-badge", 10);
    \u0275\u0275text(23, "Green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "ngx-flow-ui-badge", 11);
    \u0275\u0275text(25, "Yellow");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "br");
    \u0275\u0275elementStart(27, "ngx-flow-ui-badge", 12);
    \u0275\u0275text(28, "Blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "ngx-flow-ui-badge", 13);
    \u0275\u0275text(30, "Red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "ngx-flow-ui-badge", 14);
    \u0275\u0275text(32, "Green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "ngx-flow-ui-badge", 15);
    \u0275\u0275text(34, "Yellow");
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "br");
    \u0275\u0275elementStart(36, "ngx-flow-ui-badge", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 17);
    \u0275\u0275element(38, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(39, "ngx-flow-ui-badge", 19);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(40, "svg", 17);
    \u0275\u0275element(41, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(42, "ngx-flow-ui-badge", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(43, "svg", 17);
    \u0275\u0275element(44, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(45, "ngx-flow-ui-badge", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(46, "svg", 17);
    \u0275\u0275element(47, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(48, "br");
    \u0275\u0275elementStart(49, "ngx-flow-ui-badge", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(50, "svg", 23);
    \u0275\u0275element(51, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(52, " Blue\n");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(53, "ngx-flow-ui-badge", 24);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(54, "svg", 23);
    \u0275\u0275element(55, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(56, " Red\n");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(57, "ngx-flow-ui-badge", 25);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(58, "svg", 23);
    \u0275\u0275element(59, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(60, " Green\n");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(61, "ngx-flow-ui-badge", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(62, "svg", 23);
    \u0275\u0275element(63, "path", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(64, " Yellow\n");
    \u0275\u0275elementEnd();
  }
}, dependencies: [NgxFlowUiBadgeComponent], styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"] });
var NgxFlowUiBadgeComponent2 = _NgxFlowUiBadgeComponent2;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NgxFlowUiBadgeComponent2, { className: "NgxFlowUiBadgeComponent", filePath: "projects/ngx-flow-ui-demo/src/app/components/ngx-flow-ui-badge/ngx-flow-ui-badge.component.ts", lineNumber: 13 });
})();

// projects/ngx-flow-ui/src/lib/components/ngx-flow-ui-button/ngx-flow-ui-button.properties.ts
var NgxFlowUiButtonProperties = class _NgxFlowUiButtonProperties {
  constructor() {
    this.BaseClass = "m-1 font-medium enabled:focus:ring-2 enabled:focus:outline-none disabled:cursor-not-allowed";
    this.FillColorClass = {
      solid: {
        blue: " text-white bg-blue-700 enabled:hover:bg-blue-800 enabled:focus:ring-blue-300 enabled:dark:bg-blue-600 enabled:dark:hover:bg-blue-700 enabled:dark:focus:ring-blue-800",
        red: " text-white bg-red-700 enabled:hover:bg-red-800 enabled:focus:ring-red-300 enabled:dark:bg-red-600 enabled:dark:hover:bg-red-700 enabled:dark:focus:ring-red-800",
        green: " text-white bg-green-700 enabled:hover:bg-green-800 enabled:focus:ring-green-300 enabled:dark:bg-green-600 enabled:dark:hover:bg-green-700 enabled:dark:focus:ring-green-800",
        yellow: " text-white bg-yellow-400 enabled:hover:bg-yellow-500 enabled:focus:ring-yellow-300 enabled:dark:bg-yellow-900 enabled:dark:focus:ring-yellow-900"
      },
      outline: {
        blue: " text-blue-700 enabled:hover:text-white enabled:hover:bg-blue-800 enabled:focus:ring-blue-300 enabled:dark:focus:ring-blue-800",
        red: " text-red-700 enabled:hover:text-white enabled:hover:bg-red-800 enabled:focus:ring-red-300 enabled:dark:focus:ring-red-800",
        green: " text-green-700 enabled:hover:text-white enabled:hover:bg-green-800 enabled:focus:ring-green-300 enabled:dark:focus:ring-green-800",
        yellow: " text-yellow-400 enabled:hover:text-white enabled:hover:bg-yellow-500 enabled:focus:ring-yellow-300 enabled:dark:focus:ring-yellow-900"
      }
    };
    this.SizeClass = {
      xs: " text-xs",
      sm: " text-sm",
      md: " text-base",
      lg: " text-lg",
      xl: " text-xl"
    };
    this.BorderFillColorClass = {
      solid: {
        blue: "",
        red: "",
        green: "",
        yellow: ""
      },
      outline: {
        blue: " border border-blue-700 disabled:border-blue-400",
        red: " border border-red-700 disabled:border-red-400",
        green: " border border-green-700 disabled:border-green-400",
        yellow: " border border-yellow-400 disabled:border-yellow-300"
      }
    };
    this.DisabledFillColorClass = {
      solid: {
        blue: " disabled:bg-blue-400 disabled:dark:bg-blue-500",
        red: " disabled:bg-red-400 disabled:dark:bg-red-500",
        green: " disabled:bg-green-400 disabled:dark:bg-green-500",
        yellow: " disabled:bg-yellow-300 disabled:dark:bg-yellow-600"
      },
      outline: {
        blue: " disabled:text-blue-400 disabled:dark:text-blue-500",
        red: " disabled:text-red-400 disabled:dark:text-red-500",
        green: " disabled:text-green-400 disabled:dark:text-green-500",
        yellow: " disabled:text-yellow-300 disabled:dark:text-yellow-600"
      }
    };
    this.ModeClass = {
      label: " px-3 py-2 rounded-lg",
      svg: " p-2 inline-flex items-center text-center rounded-full",
      "label+svg": " px-3 py-2 inline-flex items-center text-center rounded-lg"
    };
  }
  static getInstance() {
    if (!_NgxFlowUiButtonProperties.instance) {
      _NgxFlowUiButtonProperties.instance = new _NgxFlowUiButtonProperties();
    }
    return _NgxFlowUiButtonProperties.instance;
  }
};

// projects/ngx-flow-ui/src/lib/components/ngx-flow-ui-button/ngx-flow-ui-button.component.ts
var _c02 = ["*"];
var _NgxFlowUiButtonComponent = class _NgxFlowUiButtonComponent {
  constructor() {
    this.color = "blue";
    this.fill = "solid";
    this.size = "sm";
    this.mode = "label";
    this.disabled = false;
    this.buttonClass = "";
  }
  ngOnInit() {
    this.buttonClass += NgxFlowUiButtonProperties.getInstance().BaseClass;
    this.buttonClass += NgxFlowUiButtonProperties.getInstance().SizeClass[this.size];
    this.buttonClass += NgxFlowUiButtonProperties.getInstance().FillColorClass[this.fill][this.color];
    this.buttonClass += NgxFlowUiButtonProperties.getInstance().BorderFillColorClass[this.fill][this.color];
    this.buttonClass += NgxFlowUiButtonProperties.getInstance().ModeClass[this.mode];
    this.buttonClass += NgxFlowUiButtonProperties.getInstance().DisabledFillColorClass[this.fill][this.color];
  }
};
_NgxFlowUiButtonComponent.\u0275fac = function NgxFlowUiButtonComponent_Factory(t) {
  return new (t || _NgxFlowUiButtonComponent)();
};
_NgxFlowUiButtonComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NgxFlowUiButtonComponent, selectors: [["ngx-flow-ui-button"]], inputs: { color: "color", fill: "fill", size: "size", mode: "mode", disabled: "disabled" }, standalone: true, features: [\u0275\u0275StandaloneFeature], ngContentSelectors: _c02, decls: 2, vars: 3, consts: [["type", "button", 3, "disabled"]], template: function NgxFlowUiButtonComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projectionDef();
    \u0275\u0275elementStart(0, "button", 0);
    \u0275\u0275projection(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275classMap(ctx.buttonClass);
    \u0275\u0275property("disabled", ctx.disabled);
  }
}, encapsulation: 2 });
var NgxFlowUiButtonComponent = _NgxFlowUiButtonComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NgxFlowUiButtonComponent, { className: "NgxFlowUiButtonComponent", filePath: "projects/ngx-flow-ui/src/lib/components/ngx-flow-ui-button/ngx-flow-ui-button.component.ts", lineNumber: 16 });
})();

// projects/ngx-flow-ui-demo/src/app/components/ngx-flow-ui-button/ngx-flow-ui-button.component.ts
var _NgxFlowUiButtonComponent2 = class _NgxFlowUiButtonComponent2 {
};
_NgxFlowUiButtonComponent2.\u0275fac = function NgxFlowUiButtonComponent_Factory(t) {
  return new (t || _NgxFlowUiButtonComponent2)();
};
_NgxFlowUiButtonComponent2.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NgxFlowUiButtonComponent2, selectors: [["app-ngx-flow-ui-button"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 69, vars: 8, consts: [["color", "blue", "fill", "solid", "size", "xs"], ["color", "red", "fill", "solid", "size", "xs"], ["color", "green", "fill", "solid", "size", "xs"], ["color", "yellow", "fill", "solid", "size", "xs"], ["color", "blue", "fill", "solid", "size", "xs", 3, "disabled"], ["color", "red", "fill", "solid", "size", "xs", 3, "disabled"], ["color", "green", "fill", "solid", "size", "xs", 3, "disabled"], ["color", "yellow", "fill", "solid", "size", "xs", 3, "disabled"], ["color", "blue", "fill", "solid", "size", "lg"], ["color", "red", "fill", "solid", "size", "lg"], ["color", "green", "fill", "solid", "size", "lg"], ["color", "yellow", "fill", "solid", "size", "lg"], ["color", "blue", "fill", "outline", "size", "xs"], ["color", "red", "fill", "outline", "size", "xs"], ["color", "green", "fill", "outline", "size", "xs"], ["color", "yellow", "fill", "outline", "size", "xs"], ["color", "blue", "fill", "solid", "size", "xs", "mode", "svg"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 20 20", 1, "h-4", "w-4"], ["d", "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"], ["color", "red", "fill", "solid", "size", "xs", "mode", "svg"], ["color", "green", "fill", "solid", "size", "xs", "mode", "svg"], ["color", "yellow", "fill", "solid", "size", "xs", "mode", "svg"], ["color", "blue", "fill", "solid", "size", "xs", "mode", "label+svg"], [3, "buttonBadge"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "currentColor", "viewBox", "0 0 20 20", 1, "ms-1.5", "h-5", "w-5"], ["color", "red", "fill", "solid", "size", "xs", "mode", "label+svg"], ["color", "green", "fill", "solid", "size", "xs", "mode", "label+svg"], ["color", "yellow", "fill", "solid", "size", "xs", "mode", "label+svg"]], template: function NgxFlowUiButtonComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ngx-flow-ui-button", 0);
    \u0275\u0275text(1, "Blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "ngx-flow-ui-button", 1);
    \u0275\u0275text(3, "Red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ngx-flow-ui-button", 2);
    \u0275\u0275text(5, "Green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "ngx-flow-ui-button", 3);
    \u0275\u0275text(7, "Yellow");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "br");
    \u0275\u0275elementStart(9, "ngx-flow-ui-button", 4);
    \u0275\u0275text(10, "Blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "ngx-flow-ui-button", 5);
    \u0275\u0275text(12, "Red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "ngx-flow-ui-button", 6);
    \u0275\u0275text(14, "Green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "ngx-flow-ui-button", 7);
    \u0275\u0275text(16, "Yellow");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "br");
    \u0275\u0275elementStart(18, "ngx-flow-ui-button", 8);
    \u0275\u0275text(19, "Blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "ngx-flow-ui-button", 9);
    \u0275\u0275text(21, "Red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "ngx-flow-ui-button", 10);
    \u0275\u0275text(23, "Green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "ngx-flow-ui-button", 11);
    \u0275\u0275text(25, "Yellow");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "br");
    \u0275\u0275elementStart(27, "ngx-flow-ui-button", 12);
    \u0275\u0275text(28, "Blue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "ngx-flow-ui-button", 13);
    \u0275\u0275text(30, "Red");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "ngx-flow-ui-button", 14);
    \u0275\u0275text(32, "Green");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "ngx-flow-ui-button", 15);
    \u0275\u0275text(34, "Yellow");
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "br");
    \u0275\u0275elementStart(36, "ngx-flow-ui-button", 16);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(37, "svg", 17);
    \u0275\u0275element(38, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(39, "ngx-flow-ui-button", 19);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(40, "svg", 17);
    \u0275\u0275element(41, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(42, "ngx-flow-ui-button", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(43, "svg", 17);
    \u0275\u0275element(44, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(45, "ngx-flow-ui-button", 21);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(46, "svg", 17);
    \u0275\u0275element(47, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275element(48, "br");
    \u0275\u0275elementStart(49, "ngx-flow-ui-button", 22);
    \u0275\u0275text(50, " Blue ");
    \u0275\u0275elementStart(51, "ngx-flow-ui-badge", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(52, "svg", 24);
    \u0275\u0275element(53, "path", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(54, "ngx-flow-ui-button", 25);
    \u0275\u0275text(55, " Red ");
    \u0275\u0275elementStart(56, "ngx-flow-ui-badge", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(57, "svg", 24);
    \u0275\u0275element(58, "path", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(59, "ngx-flow-ui-button", 26);
    \u0275\u0275text(60, " Green ");
    \u0275\u0275elementStart(61, "ngx-flow-ui-badge", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(62, "svg", 24);
    \u0275\u0275element(63, "path", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(64, "ngx-flow-ui-button", 27);
    \u0275\u0275text(65, " Yellow ");
    \u0275\u0275elementStart(66, "ngx-flow-ui-badge", 23);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(67, "svg", 24);
    \u0275\u0275element(68, "path", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(9);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(36);
    \u0275\u0275property("buttonBadge", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("buttonBadge", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("buttonBadge", true);
    \u0275\u0275advance(5);
    \u0275\u0275property("buttonBadge", true);
  }
}, dependencies: [NgxFlowUiButtonComponent, NgxFlowUiBadgeComponent], styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"] });
var NgxFlowUiButtonComponent2 = _NgxFlowUiButtonComponent2;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NgxFlowUiButtonComponent2, { className: "NgxFlowUiButtonComponent", filePath: "projects/ngx-flow-ui-demo/src/app/components/ngx-flow-ui-button/ngx-flow-ui-button.component.ts", lineNumber: 14 });
})();

// projects/ngx-flow-ui-demo/src/app/components/home.routing.ts
var home_routing_default = [
  { path: "", component: HomeComponent },
  { path: "NgxFlowUiBadge", component: NgxFlowUiBadgeComponent2 },
  { path: "NgxFlowUiButton", component: NgxFlowUiButtonComponent2 }
];
export {
  home_routing_default as default
};
//# sourceMappingURL=chunk-5N46RJ4X.js.map
