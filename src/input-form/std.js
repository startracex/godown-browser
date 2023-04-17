import { LitElement, css } from "../deps.js";
export default class InputFormSTD extends LitElement {
  name;
  value;
  def;
  _input;
  compositing;
  static styles = css`
:host{
  --text: rgb(240 240 240);
  --input-outline: rgb(25 130 180);
  --input-outline-focus: rgb(29 155 180);
  --input-background: rgb(36 34 34);
  --input-background-hover: rgb(42 42 42);
  --input-control: rgb(244 244 244);
  --input-true: rgb(47 129 237);
  --input-false: rgb(204 204 204);
}
* {
  color: inherit;
}
`;
  namevalue() {
    return [this.name, this.value];
  }
  reset() {
    this.value = this.def;
    this._input.value = this.def;
  }
  _handleInput(i) {
    this.value = i.target.value;
    if (this.compositing) return;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
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