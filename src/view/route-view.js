import { conf, css, define, html, LitElement } from "../deps.js";
export class RouteView extends LitElement {
  _routes;
  params;
  static propties = {
    routes: { type: Array },
    type: { type },
    baseURL: { type },
    path: { type },
    override: { type: Boolean },
    compoent: { type: Object },
  };
  constructor() {
    super();
    this._routesSort = [];
    this.type = "united";
    this.baseURL = "/";
    this.path = window.location.pathname;
  }
  set routes(v) {
    if (Object.prototype.toString.call(v) !== "[object Array]") {
      this._routes = [];
      return;
    }
    if (this.static) {
      this._routes = v;
    } else {
      this._routes = RouteView.sortRoutesPaths(v);
    }
    this.requestUpdate();
  }
  get routes() {
    return this._routes;
  }
  static styles = css`:host{display:contents}`;
  render() {
    if (this.type === "field") {
      return this.render_field() ?? html`<slot></slot>`;
    }
    if (this.type === "slotted" || this.type === "child") {
      return this.render_slotted() ?? html`<slot></slot>`;
    }
    return this.render_united() ?? html`<slot></slot>`;
  }
  useRouter() {
    return {
      path: this.path,
      params: this.params,
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.path = window.location.pathname;
    window.addEventListener("popstate", (e) => {
      this.path = window.location.pathname;
    });
    if (!this.override) return;
    const self = this;
    const pushHistory = history.pushState;
    history.pushState = function () {
      pushHistory.apply(this, arguments);
      self.path = window.location.pathname;
    };
    const replaceHistory = history.replaceState;
    history.replaceState = function () {
      replaceHistory.apply(this, arguments);
      self.path = window.location.pathname;
    };
  }
  render_united() {
    const slottedCompoent = this.render_slotted();
    if (slottedCompoent) return slottedCompoent;
    const Compoent = this.render_field();
    return Compoent;
  }
  render_slotted() {
    const childNodes = this.querySelectorAll(":scope > *[slot]");
    const slots = Array.from(childNodes).map((node) => {
      const slotname = node.getAttribute("slot");
      return {
        path: this.baseURL + slotname,
        slotname
      };
    });
    let slotsSort;
    if (this.static) {
      slotsSort = slots;
    } else {
      slotsSort = RouteView.sortRoutesPaths(slots);
    }
    const usedRouteTemplate = RouteView.useWhichRoute(slotsSort, this.path);
    const Compoent = this.slottedCompoent(usedRouteTemplate, slotsSort);
    return Compoent;
  }
  render_field() {
    const usedRouteTemplate = RouteView.useWhichRoute(this.routes, this.path);
    const RouterParmasObject = RouteView.parseRouterParams(usedRouteTemplate, this.path);
    this.params = RouterParmasObject;
    const Compoent = this.fieldComponent(usedRouteTemplate);
    return Compoent;
  }
  fieldComponent(usedRouteTemplate) {
    if (!usedRouteTemplate) return;
    const route = this.routes.find((r) => r.path === usedRouteTemplate);
    if (!route) return null;
    return route.component || (route.html ? unsafeHTML(route.html) : null);
  }
  slottedCompoent(usedRouteTemplate, ObjectArrayIncludePath) {
    if (!usedRouteTemplate) return;
    const slotElement = ObjectArrayIncludePath.find((s) => s.path === usedRouteTemplate);
    if (!slotElement) return null;
    const RouterParmasObject = RouteView.parseRouterParams(usedRouteTemplate, this.path);
    this.params = RouterParmasObject;
    return html`<slot name="${slotElement.slotname}"></slot>`;
  }
  static sortRoutesPaths(ObjectArrayIncludePath) {
    const all = ObjectArrayIncludePath.map((route) => {
      const path = route.path;
      const pathArray = path.split("/");
      const Single_dynamicRouteCount = pathArray.filter((p) => p.startsWith(":")).length;
      return {
        ...route,
        path,
        Single_dynamicRouteCount,
      };
    });
    const allSort = all.sort((a, b) => a.Single_dynamicRouteCount - b.Single_dynamicRouteCount);
    const multi = allSort.filter((route) => {
      const path = route.path;
      const pathArray = path.split("/");
      const double_dynamicRouteCount = pathArray.filter((p) => p.startsWith("...") || p.startsWith("*")).length;
      return double_dynamicRouteCount > 0;
    });
    multi.sort((a, b) => {
      const aIndex = a.path.split("/").findIndex((template) => template.startsWith("...") || template.startsWith("*"));
      const bIndex = b.path.split("/").findIndex((template) => template.startsWith("...") || template.startsWith("*"));
      return aIndex !== -1 && bIndex !== -1 ? bIndex - aIndex : 0;
    });
    const sigle = allSort.filter((route) => {
      const path = route.path;
      const pathArray = path.split("/");
      const double_dynamicRouteCount = pathArray.filter((p) => p.startsWith("...") || p.startsWith("*")).length;
      return double_dynamicRouteCount === 0;
    });
    return [...sigle, ...multi];
  }
  static useWhichRoute(ObjectArrayIncludePath, path, baseURL = "") {
    const originpath = baseURL + path;
    const routes = ObjectArrayIncludePath;
    const pathTemplateArray = routes.map((r) => r.path);
    for (const pathTemplate of pathTemplateArray) {
      const pathsplits = pathTemplate.split("/").slice(1);
      const reg = new RegExp(pathsplits.map((s) => {
        if (s.startsWith(":")) {
          return "[^/]+";
        } else if (s.startsWith("...") || s.startsWith("*")) {
          return ".*";
        } else {
          return s;
        }
      }).join("/") + "$");
      if (reg.test(originpath)) {
        return pathTemplate;
      }
    }
    return null;
  }
  static parseRouterParams(routeTemplate, originpath) {
    if (!routeTemplate || !originpath) return;
    const params = {};
    const originpathArray = originpath.split("/").splice(1);
    const routeTemplateSplit = routeTemplate.split("/").splice(1);
    for (const [index, path] of routeTemplateSplit.entries()) {
      if (path.startsWith(":")) {
        params[path.slice(1)] = originpathArray[index];
      } else if (path.startsWith("*")) {
        params[path.slice(1)] = originpathArray.slice(index).join("/");
      } else if (path.startsWith("...")) {
        params[path.slice(1)] = originpathArray.slice(index).join("/");
      } else {
        if (path !== originpathArray[index]) {
          return;
        }
      }
    }
    return params;
  }
  static updateAll() {
    const routeViewTagName = conf.namemap.get("route-view");
    const routeViewArray = document.querySelectorAll(routeViewTagName + ":not([override])");
    for (let index = 0, ArrayItem; ArrayItem = routeViewArray[index]; index++) {
      ArrayItem.path = window.location.pathname;
    }
  }
}
define("route-view", RouteView);