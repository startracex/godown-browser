import { html, css, define } from '../deps.js';
export class NavAside extends LayoutSTD {
  static properties = {
    m: { type: Number },
    position: {}
  };
  constructor() {
    super();
    this.m = "720px";
    this.position = "sticky fixed";
  }
  static styles = [LayoutSTD.styles, css`:host{
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: fit-content;
    display: flex;
    background-color: var(${cssvar}--nav-background);
    box-sizing: border-box;
  }
  nav {
    height: inherit;
    width: inherit;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    box-sizing: border-box;
  }`
  ];
  render() {
    var p = this.position.split(" ")[0] || "sticky";
    var pm = this.position.split(" ")[1] || "fixed";
    var m = this.m || "720px";
    var styled = `:host{position:${p} !important;}@media(min-width:${m}){:host{position:${pm} !important;width:fit-content !important;height:100% !important;}nav{display: flex !important;justify-content: space-between !important;flex-direction: column !important;align-content: flex-start !important;align-items: stretch !important;}}`;
    return html`<nav><slot></slot></nav><style>${styled}</style>`;
  }
}
define('nav-aside', NavAside);
