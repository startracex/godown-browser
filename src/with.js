import { conf } from "./deps.js";
import { unsafeCSS } from "../core/lit-all.min.js";
/** 
 * Custom CSS variable,join with "--" ,only allow `a-Z,0-9,-`
 */
export const cssvar = unsafeCSS("--" + conf.cssvar.replace(/[^a-zA-Z0-9\-]/g, ""));
/**
 * Call customElements.define only customElements.get is undefined
*/
export const define = (name, constructor, options) => {
  name = conf?.tag(name);
  if (customElements.get(name) === undefined) {
    customElements.define(name, constructor, options);
    conf?.enabled?.push(name);
  }
};
/**
* Create element with args append to target
* @param target Appended target element or use document.querySelector(target) or document.body
* @param args tag:tag name, props:attribute, children:appended chindren, html:innerHTML
*/
export const append = (target, args) => {
  if (!args) return;
  target = (typeof target === 'string' ? document.querySelector(target) : target) || document.body;
  const element = create(args);
  target.appendChild(element);
};
/**
* Create element from args
* @param args tag:tag name, props:attribute, children:appended chindren, html:innerHTML
*/
export const create = (args) => {
  const tag = (typeof args === 'string' ? args : args?.tag) || "div";
  const { props, children, html } = args || {};
  const element = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach((prop) => {
      // element[prop] = props[prop];
      element.setAttribute(prop, props[prop] === true ? '' : props[prop]);
    });
  };
  if (html) element.innerHTML = html;
  if (children) {
    if (children.length) /* Iterators exist */ {
      [...children].forEach((child) => {
        typeof child === "string" ? element.appendChild(document.createTextNode(child)) : element.appendChild(child);
      });
    } else {
      typeof children === "string" ? element.appendChild(document.createTextNode(children)) : element.appendChild(children);
    }
  }
  return element;
};
/**
* Create element with args append to target
* @param map Map of key:selector, value:args
*/
export const retag = (map) => {
  if (!map) return;
  for (let [key, args] of map) {
    for (let i = document.querySelectorAll(key).length - 1; i >= 0; i--) {
      const element = document.querySelectorAll(key)[i];
      const tag = (typeof args === 'string' ? args : args?.tag) || "div";
      let props = args.props || {};
      const { children, html = "" } = args;
      [...element.attributes].reduce((acc, attr) => {
        acc[attr.name] = attr.args;
        return acc;
      }, props);
      const newElement = create(
        {
          tag,
          html: html + element.innerHTML,
          props,
          children,
        }
      );
      element.parentNode.replaceChild(newElement, element);
    }
  }
};