import { html, css, define } from '../deps.js';
import STD from './std.js';
export class FlexFlow extends STD {
  static properties = {
    flexflow: { type: String, attribute: 'flex-flow' },
    m: {}
  };
  constructor() {
    super();
    this.m = "720px";
    this.flexflow = "row nowrap column nowrap";
  }
  static styles = css`:host {
    display: flex !important;
  }`;
  render() {
    const flexflow = this.flexflow.split(/\s+/);
    const style = `:host{flex-direction:${flexflow[0] || "row"};flex-wrap:${flexflow[1] || "nowrap"};}@media(max-width: ${this.m || "720px"}){:host{flex-direction:${flexflow[2] || flexflow[0] || "colom"};flex-wrap:${flexflow[3] || flexflow[1] || "nowrap"}}`;
    return html`<slot></slot><style>${style}</style>`;
  }
}
define('flex-flow', FlexFlow);