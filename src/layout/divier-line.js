import { html, css, define, name } from '../deps.js';
import LayoutSTD from './std.js';
export class DivierLine extends LayoutSTD {
  static styles = css`:host{
    display: block;
    background: gray;
    }
    div {
      display: flex;
      align-items: center;
      border-radius:inherit;
      width: 100%;
      height: 100%;
    }
    hr {
      border-radius:inherit;
      margin: 0;
      border: 0;
      flex: 1;
    }
    .v {
      height: 100%;
      display: flex;
      flex-direction: column;
    }`;
  static properties = {
    pre: {},
    suf: {},
    v: { type: Boolean },
    b: {}
  };
  constructor() {
    super();
    this.b = "2.2px";
    this.pre = "auto";
    this.suf = "auto";
  }
  render() {
    var hrstyle = `.before{height:${this.b};max-width:${this.pre}}.after{height:${this.b};max-width:${this.suf}}.v .before{width:${this.b};max-height:${this.pre}}.v .after{width:${this.b};max-height:${this.suf}}`;
    return html`<div class=${this.v ? "v" : "h"}>
    <style>${hrstyle}</style>
      <hr class="before"/>
      <slot></slot>
      <hr class="after"/>
    </div>`;
  }
}
define(name.tag('divier-line'), DivierLine);