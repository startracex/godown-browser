import { html, css, define, name } from '../deps.js'; 
import ItemsSTD from './std.js';
import InputFormSTD from '../input-form/std.js';
export class LoadTrack extends ItemsSTD {
  static styles = [InputFormSTD.styles, css`
  :host,div{
    display:inline-flex;
  }
  div {
    position: relative;
    width: 10em;
    height: .5em;
    border-radius: .25em;
    background-color: var(--input-false);
    z-index: 1;
  }
  div i {
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    height: 100%;
    width: 20%;
    background-color: var(--input-true);
    z-index: 2;
    transition: all .3s;
    animation: progress 1.5s ease-in-out infinite alternate;
  }
  @keyframes progress {
    from {
      left: 0%;
    }
    to {
      left: 80%;
    }
  }
  div.value i {
    animation: none;
    width: 20% ;
  }
  `];
  static properties = {
    max: { type: Number },
    min: { type: Number },
    modify: { type: Boolean },
  };
  constructor() {
    super();
    this.current = 20;
    this.isValue = false;
    this.max = 1;
    this.min = 0;
    this.modify = false;
  }
  set value(val) {
    if (val === null || val === undefined || val === "") {
      this.removeAttribute("value");
      this.isValue = false;
    } else {
      this.setAttribute("value", val);
      this.isValue = true;
    }
    this.current = this.parsePercent(val || 20);
  }
  get value() {
    return this.getAttribute("value");
  }
  render() {
    if (this.value !== null) {
      this.isValue = true;
      this.current = this.parsePercent(this.value);
    }
    return html`<div class=${classMap({ value: this.isValue })} @click=${this._handleClick} ><i style="width:${this.current}%;"><slot></slot></i></div>`;
  }
  firstUpdated() {
    this.current = this.parsePercent(this.value) || 20;
  }
  parsePercent(s = "0") {
    if (String(s).includes("%")) {
      return parseFloat(s);
    }
    return parseFloat(s) / (this.max - this.min) * 100;
  }
  _handleClick(e) {
    if (this.modify) {
      this.value = (e.offsetX / this.offsetWidth) * (this.max - this.min);
      this.dispatchEvent(new CustomEvent("change", { detail: e.offsetX / this.offsetWidth }));
    }
  }
}
define(name.tag("load-track"), LoadTrack);