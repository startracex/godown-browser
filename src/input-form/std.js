import { STD, css, cssvar } from "../deps.js";
export default class InputFormSTD extends STD {
  name;
  value;
  def;
  compositing;
  get _input() {
    return undefined;
  }
  static styles = [STD.styles, css`
:host{
  ${cssvar}--text:rgb(240 240 240);
  ${cssvar}--input-outline: rgb(25 130 180);
  ${cssvar}--input-outline-focus: rgb(29 155 180);
  ${cssvar}--input-background: rgb(36 34 34);
  ${cssvar}--input-background-hover: rgb(42 42 42);
  ${cssvar}--input-control:rgb(244 244 244);
  ${cssvar}--input-true: rgb(47 129 237);
  ${cssvar}--input-false: rgb(204 204 204);
  ${cssvar}--input-width: 10.6em;
}
::-webkit-calendar-picker-indicator {
  background-color: var(${cssvar}--input-true);
  border-radius: .1rem;
}
`];
  namevalue() {
    return [this.name, this.value];
  }
  reset() {
    this.value = this.def;
    this._input.value = this.def;
  }
  _handleInput(e) {
    e.stopPropagation();
    this.value = e.target.value;
    if (this.compositing) return;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value, bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: this.value, bubbles: true, composed: true }));
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.def) this.def = this.value || "";
    if (!this.value) this.value = this.def;
  }
  _compositionCheck() {
    this._input?.addEventListener("compositionstart", () => {
      this.compositing = true;
    }
    );
    this._input?.addEventListener("compositionend", (e) => {
      this.compositing = false;
      this._handleInput(e);
    });
  }
}