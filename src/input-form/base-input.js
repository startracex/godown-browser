import { html, css, ifDefined, define, name } from '../deps.js';
import InputFormSTD from './std.js';
export class BaseInput extends InputFormSTD {
  get _input() {
    return this.shadowRoot.querySelector('input');
  }
  get _ranged() {
    return this.shadowRoot.querySelector('.range i');
  }
  static properties = {
    accept: {},
    label: {},
    name: {},
    pla: {},
    type: {},
    value: {},
    def: {},
    multiple: { type: Boolean },
    min: { type: Number },
    max: { type: Number },
    step: { type: Number },
  };
  constructor() {
    super();
    this.type = "text";
    this.min = 0;
    this.max = 100;
    this.step = 1;
  }
  static styles = [InputFormSTD.styles ,css`
  :host{
    width:10.6em;
    height:1.315em;
    display: inline-flex;
    background-color: var(--input-background);
    border-radius: .2em;
    outline: .145em solid transparent;
    color:var(--text);
  }
  :host(:focus){
    outline-color:var(--input-outline);
  }
  div{
    display: flex;
    flex: 1;
  }
  .input::-webkit-calendar-picker-indicator {
    background-color: var(--input-true);
  }
  *{
    border-radius: inherit;
    cursor: inherit;
    font-family: inherit;
  }
  .input[type="color"] {
    padding: 0;
    height: 100% !important;
  }
  .input[type="file"]{
    display: none;
  }
  .input {
    box-sizing: border-box;
    height:1.6em;
    width: 100%;
    font-size: .8em;
    outline: 0;
    border: 0;
    margin: 0;
    border: none;
    color: inherit;
    background: transparent;
    padding: 0 .25em;
    border-radius: .25em;
  }
  .range{
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 .5px .1em var(--shadow);
    background-color:var(--input-false);
    
  }
  .range input~i {
    position: absolute;
    left: 0;
    width: 50%;
    pointer-events: none ;
    background-color: var(--input-true);
    height: calc(.6em - 1.1px);
  }
  .range input {
    height: .6em;
    margin: 0px -0.5em;
    width: calc(100% + 0.5em);
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    background-color: transparent;
  }
  .range input::-webkit-slider-runnable-track {
    height: .6em;
  }
  .range input::-webkit-slider-thumb {
    z-index: 1;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    height: 1.2em;
    width: 1.2em;
    margin-top: -0.3em;
    background-color: var(--input-control);
    border-radius: 50%;
    border: solid 0.125em rgba(0, 221, 255, 0.5);
    box-shadow: 0 .1em .1em var(--shadow);
  }
  `];
  render() {
    if (!this.name) this.name = this.label || this.type;
    return html`<div><slot name="pre"></slot><slot></slot>
<div class=${this.type}>${this._typeSwitcher()}</div>
<slot name="suf"></slot></div>`;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.def && this.type !== "file") this.def = this.value || "";
    if (!this.value) this.value = this.def;
    this.addEventListener('click', this._handelFocus);
  }
  firstUpdated() {
    if (this.type === "range") {
      this._ranged.style.width = 100 * (this.value / (this.max - this.min)) + '%';
      if (this.childNodes.length) {
        this.shadowRoot.querySelector('div').style.margin = "0";
      }
    }
  }
  _handleRange(e) {
    this.value = e.target.value;
    this._ranged.style.width = 100 * e.target.value / (this.max - this.min) + '%';
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }
  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }
  _handelFocus() {
    this._input.focus();
    if (this.type === "file") this._input.click();
  }
  _handleFile(e) {
    this.value = this.multiple ? e.target.files : e.target.files[0];
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }
  reset() {
    if (this.type === "range") {
      this._input.value = this.def || (this.max - this.min) / 2;
      this.value = this.def || (this.max - this.min) / 2;
      this._ranged.style.width = 100 * (this.value / (this.max - this.min)) + '%';
    } else {
      this._input.value = this.def;
      this.value = this.def;
    }
  }
  _typeSwitcher() {
    switch (this.type) {
      case "range":
        return html`<input type="range" @input=${this._handleRange} min=${this.min} max=${this.max} step=${this.step} value=${this.value} ><i></i>`;
      case "file":
        return html`<input accept=${ifDefined(this.accept)} ?multiple=${this.multiple} class="input" type=${this.type} @change=${this._handleFile}  >`;
      default:
        return html`<input class="input" type=${this.type} placeholder=${ifDefined(this.pla)} value=${this.value} @input=${this._handleInput} />`;
    }
  }
  namevalue() {
    return [this.name, this.value];
  }
}
define(name.tag('base-input'), BaseInput);