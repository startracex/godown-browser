import { html, css, define } from '../deps.js';
import STD from './std.js';
export class DivLine extends STD {
  static styles = css`:host{
      display: block;
      color: currentColor;
      background: none;
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
      background: currentColor;
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
    <hr class="before"/><slot></slot><hr class="after"/>
    </div>`;
  }
}
define('div-line', DivLine);