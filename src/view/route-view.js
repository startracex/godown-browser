import { conf, css, define, html, LitElement } from "../deps.js";
export class RouteView extends LitElement {
  _routesSort;
  params;
  static propties = {
    routes: { type: Array },
    type: { type: String },
    baseURL: { type: String },
    path: { type: String },
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
      this._routesSort = [];
      return;
    }
    if (this.static) {
      this._routesSort = v;
    } else {
      this._routesSort = RouteView.sortRoutesPaths(v);
    }
    this.requestUpdate();
  }
  get routes() {
    return this._routesSort;
  }
  static styles = css`:host{display:contents}`;
  render = (() => {
    if (this.type === "child") {
      return () => this.render_slotted() ?? html`<slot></slot>`;
    }
    if (this.type === "field") {
      return () => this.render_field() ?? html`<slot></slot>`;
    }
    return () => this.render_united() ?? html`<slot></slot>`;
  })();
  connectedCallback() {
    super.connectedCallback();
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
    const fieldCompoent = this.render_field();
    return fieldCompoent;
  }
  render_slotted() {
    const childCompoent = this.childCompoent();
    return childCompoent;
  }
  render_field() {
    const usedRouteTemplate = RouteView.useWhichRoute(this.routes, this.path);
    const RouterParmasObject = RouteView.parseRouterParams(usedRouteTemplate, this.path);
    this.params = RouterParmasObject;
    return this.getComponent(usedRouteTemplate);
  }
  useRouter() {
    return {
      path: this.path,
      params: this.params,
    };
  }
  getComponent(usedRouteTemplate) {
    if (!usedRouteTemplate) return;
    const route = this.routes.find((r) => r.path === usedRouteTemplate);
    if (!route) return null;
    const { component } = route;
    return component;
  }
  childCompoent() {
    const childNodes = this.querySelectorAll(":scope > *[slot]");
    const slots = Array.from(childNodes).map((node) => {
      const slotname = node.getAttribute("slot");
      if (slotname.startsWith("/")) {
        return {
          path: slotname,
          slotname
        };
      } else {
        return {
          path: this.baseURL + "/" + slotname,
          slotname
        };
      }
    });
    let slotsSort;
    if (this.static) {
      slotsSort = slots;
    } else {
      slotsSort = RouteView.sortRoutesPaths(slots);
    }
    const usedSlot = RouteView.useWhichRoute(slotsSort, this.path);
    const slotElement = slots.find((s) => s.path === usedSlot);
    const RouterParmasObject = RouteView.parseRouterParams(usedSlot, this.path);
    this.params = RouterParmasObject;
    if (!slotElement) return null;
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
  static useWhichRoute(ObjectArrayIncludePath, path, baseURL = "/") {
    const originpath = path.startsWith("/") ? path : baseURL + path;
    const routes = ObjectArrayIncludePath;
    const pathTemplateArray = routes.map(r => r.path);
    for (const pathTemplate of pathTemplateArray) {
      const pathsplits = pathTemplate.split("/").slice(1);
      const reg = new RegExp(
        pathsplits
          .map(s => {
            if (s.startsWith(":")) {
              return "[^/]+";
            } else if (s.startsWith("...") || s.startsWith("*")) {
              return ".*";
            } else {
              return s;
            }
          })
          .join("/") + "$"
      );
      if (reg.test(originpath)) {
        return pathTemplate;
      }
    }
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
    const routeViewArray = document.querySelectorAll(routeViewTagName);
    const ArrayLength = routeViewArray.length;
    if (ArrayLength > 0) {
      for (let index = 0, ArrayItem; ArrayItem = routeViewArray[index]; index++) {
        ArrayItem.path = window.location.pathname;
      }
    }
  }
}
define("route-view", RouteView);