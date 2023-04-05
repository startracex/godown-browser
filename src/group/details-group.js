import { LitElement, html } from "../deps.js";
export class DetailsGroup extends LitElement {
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
import { define, name } from '../config.js';
define(name.tag("details-group"), DetailsGroup);