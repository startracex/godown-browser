import { html, css, define } from '../deps.js';
import STD from './std.js';
export class FlexFlow extends STD {
  static properties = {
    reverse: { type: Boolean },
    m: {},
  };
  static styles = css`:host {display: flex;align-items: center;justify-content: center;}`;
  render() {
    return html`<slot></slot><style>:host{flex-direction: row${this.reverse ? "-reverse" : ""}}@media (max-width: ${this.m || "720px"}) {:host{flex-direction: column${this.reverse ? "-reverse" : ""};}}</style>`;
  }
}
define('flex-flow', FlexFlow);