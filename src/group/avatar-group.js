import { append, css, define, html } from '../deps.js';
import STD from "./std.js";
export class AvatarGroup extends STD {
  static properties = {
    rank: { type: Boolean },
    max: { type: Number },
    more: { type: Number },
    usefresh: { type: Function },
  };
  static styles = css`
  :host{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  div{
    display:contents;
  }`;
  constructor() {
    super();
    this.max = 0;
    this.more = 0;
    this.usefresh = async () => {
      await this.updateComplete;
      this.scrollTop = this.scrollHeight;
    };
  }
  get assigned() {
    return this.shadowRoot.querySelector('slot').assignedElements();
  }
  render() {
    if (this.rank)
      return html`<div style="display: flex;flex-direction: row;"><slot></slot><avatar-anchor style="display:${this.more > 0 ? "" : "none"}" more=${this.more || 0}></avatar-anchor></div>`;
    else
      return html`<div style="display:contents"><slot></slot></div>`;
  }
  firstUpdated() {
    if (!this.more) {
      let more = 0;
      if (this.max && this.assigned.length > this.max) {
        more = this.assigned.length - this.max;
      }
      this.more = more;
    }
  }
  append(args) {
    if (this.max && this.assigned.length == this.max) {
      this.assigned.pop().style.display = 'none';
      append(this, args);
      this.assigned.pop().style.display = 'none';
      this.more = 2;
    } else if (this.max && this.assigned.length > this.max) {
      append(this, args);
      this.assigned.pop().style.display = 'none';
      this.more += 1;
    }
    else {
      append(this, args);
    }
    this.fresh();
  }
  subtract() {
    if (this.more == 2) {
      this.assigned.pop().style.display = '';
      this.more = 0;
      return;
    } else if (this.more > 0) {
      this.more -= 1;
    }
    if (this.assigned.length)
      this.assigned.pop().remove();
  }
  fresh() {
    this.usefresh();
  }
}
define('avatar-group', AvatarGroup);