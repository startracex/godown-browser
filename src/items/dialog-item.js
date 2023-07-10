import { html, css,  define } from "../deps.js";
import STD from "./std.js";
export class DialogItem extends STD {
  static styles = css`:host {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: all .3s;
      display: flex;
      visibility: hidden;
      background: rgb(0 0 0 / 0%);
    }
    :host([open]) {
      visibility: visible;
    }
    :host([open][modal]) {
      backdrop-filter: blur(.25px);
      background: rgb(0 0 0 / 20%);
    }
    [open] slot {
      opacity: 1 !important;
      transform: translateY(0) translateX(0) !important;
    }
    div{
      height: 100%;
      width: 100%;
      display: flex;
      transition: inherit;
    }
    slot {
      display: block;
      width: fit-content;
      height: fit-content;
      margin:auto;
      opacity: 0;
      transition: inherit;
      pointer-events: all;
    }
    .center{
      transform:translateY(-15%);
    }
    .top{
      width: 100%;
      margin-top:0;
      transform: translateY(-15%);
    }
    .right{
      height: 100%;
      margin-right:0;
      transform: translateX(15%);
    }
    .bottom{
      width: 100%;
      margin-bottom:0;
      transform: translateY(15%);
    }
    .left{
      height: 100%;
      margin-left:0;
      transform: translateX(-15%);
    }
    `;
  static properties = {
    open: { type: Boolean, reflect: true },
    key: { type: String },
    scale: { type: Boolean },
    modal: { type: Boolean },
    call: { type: String },
  };
  get _div() {
    return this.shadowRoot.querySelector("div");
  }
  constructor() {
    super();
    this.call = "center";
    this.key = "Escape";
  }
  render() {
    return html`<div ?open=${this.open} ?modal=${this.modal}>
  <slot class=${this.call}></slot>
</div>`;
  }
  firstUpdated() {
    this.addEventListener("submit", e => {
      if ((e.target).method === "dialog") this.close();
    });
    if (this.scale)
      this.addEventListener("wheel", this._handleWheel);
    if (this.key)
      document.addEventListener("keydown", e => this._handleKeydown(e));
    if (this.open)
      this.show();
  }
  show() {
    this.open = true;
    if (this.modal) {
      this.showModal();
    }
  }
  showModal() {
    this.modal = true;
    this.open = true;
    this._div.addEventListener("click", this._handleModal);
  }
  close() {
    this.open = false;
    if (this.modal)
      this._div.removeEventListener("click", this._handleModal);
  }
  _handleWheel(e) {
    let s = this._div.style.transform.match(/scale\((.*)\)/);
    var scale = 1;
    if (s) scale = Number(s[1]);
    if (e.deltaY > 0) scale -= 0.1;
    else scale += 0.1;
    this._div.style.transform = `scale(${scale})`;
  }
  _handleKeydown(e) {
    const keys = this.key.split(/[^a-zA-Z0-9]/).filter(e => e !== "");
    if (keys.includes(e.key) || keys.includes(e.code)) this.close();
  }
  _handleModal(e) {
    e.stopPropagation();
  }
}
define("dialog-item", DialogItem);