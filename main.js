import {
  CommonModule,
  RouterOutlet,
  bootstrapApplication,
  provideClientHydration,
  provideRouter,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-QUBWZP3B.js";

// projects/ngx-flow-ui-demo/src/app/app.routes.ts
var routes = [
  {
    path: "components",
    loadChildren: () => import("./chunk-5N46RJ4X.js")
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

// projects/ngx-flow-ui-demo/src/app/app.config.ts
var appConfig = {
  providers: [provideRouter(routes), provideClientHydration()]
};

// projects/ngx-flow-ui-demo/src/app/app.component.ts
var _AppComponent = class _AppComponent {
  constructor() {
    this.title = "NgxFlowUi";
  }
};
_AppComponent.\u0275fac = function AppComponent_Factory(t) {
  return new (t || _AppComponent)();
};
_AppComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h1");
    \u0275\u0275text(1, "NgxFlowUi");
    \u0275\u0275elementEnd();
    \u0275\u0275element(2, "router-outlet");
  }
}, dependencies: [CommonModule, RouterOutlet], styles: ["\n\n/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFtdLAogICJzb3VyY2VzQ29udGVudCI6IFtdLAogICJtYXBwaW5ncyI6ICIiLAogICJuYW1lcyI6IFtdCn0K */"] });
var AppComponent = _AppComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "projects/ngx-flow-ui-demo/src/app/app.component.ts", lineNumber: 14 });
})();

// projects/ngx-flow-ui-demo/src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
