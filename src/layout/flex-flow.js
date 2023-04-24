import { html, css, define } from '../deps.js';
import STD from './std.js';
export class FlexFlow extends STD {
  static properties = {
    ff: { type: String, attribute: 'flex-flow' },
    m: {}
  };
  constructor() {
    super();
    this.m = "720px";
    this.ff = "row nowrap column nowrap";
  }
  static styles = css`:host {
    display: flex !important;
  }`;
  render() {
    const ff = this.ff.split(/\s+/);
    const style = `:host{flex-direction:${ff[0] || "row"};flex-wrap:${ff[1] || "nowrap"};}@media(max-width: ${this.m || "720px"}){:host{flex-direction:${ff[2] || "colom"};flex-wrap:${ff[3] || "nowrap"}}`;
    return html`<slot></slot><style>${style}</style>`;
  }
}
define('flex-flow', FlexFlow);