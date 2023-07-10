import { define, html } from "../deps.js";
import STD from "./std.js";
export class DetailsGroup extends STD {
  static properties = {
    index: { type: Number },
    only: { type: Boolean }
  };
  constructor() {
    super();
    this.index = -1;
    this.only = false;
  }
  get assigned() {
    return this.shadowRoot.querySelector("slot").assignedNodes();
  }
  render() {
    return html`<slot></slot>`;
  }
  async firstUpdated() {
    await this.updateComplete;
    if (this.index >= 0) {
      this.assigned[this.index]?.setAttribute("open", "");
    }
    this.addEventListener("click", this._handleClick);
  }
  _handleClick(e) {
    if (this.only) {
      this.index = this.assigned.indexOf(e.target);
      this.assigned.forEach((e, i) => {
        if (i != this.index) {
          e.removeAttribute("open");
        }
      });
    }
  }
}
define("details-group", DetailsGroup);