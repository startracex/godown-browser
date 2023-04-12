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
  static styles = [css`:host{
    top:0;
    left:0;
    bottom:0;
    width:100%;
    height:fit-content;
    display:flex;
    background-color: var(--nav-background);
    box-sizing: border-box;
  }
  nav {
    height: inherit;
    width: inherit;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    place-content: center space-between;
    box-sizing: border-box;
  }`];
  render() {
    const p = this.position.split(" ")[0] || "sticky";
    const pm = this.position.split(" ")[1] || "fixed";
    const m = this.m || "720px";
    return html`<nav><slot></slot><style>:host{position:${p} !important;}@media(min-width:${m}){:host{position:${pm} !important;width:fit-content !important;height:100% !important;}nav{display: flex !important;justify-content: space-between !important;flex-direction: column !important;align-content: flex-start !important;align-items: stretch !important;}}</style></nav>`;
  }
}
define('nav-aside', NavAside);
