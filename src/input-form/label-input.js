import { html, css, ifDefined, define, cssvar } from '../deps.js';
import STD from './std.js';
export class LabelInput extends STD {
  static styles = [STD.styles, css`
  :host{
    --input-width: 10.6em;
    background-color: inherit;
    display:inline-flex;
    min-width:10.6em;
    max-width:100%;
    border-radius: 4px;
  }
  label {
    margin: auto;
    width: 100%;
    box-sizing: border-box;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius:inherit;
  }
  span {
    flex: 1;
  }
  input {
    background-color: transparent;
    font-size: 102.5%;
    line-height: 1.2em;
    border: 0;
    border-radius:inherit;
    outline: 0;
    box-sizing: border-box;
    flex:1;
    width:100%;
    padding:4.8px;
  }
  ::-webkit-calendar-picker-indicator{
    color:red
  }
  input[type="file"]{
    display:none;
  }
  :host(:focus) fieldset {
    outline: .18em solid var(${cssvar}--input-outline-focus);
  }
  @media screen and (max-width:540px) {
    label {
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      width: fit-content;
    }
  }
  i {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
  }
  i>svg{
    height:1em;
    width:1.5em;
  }
  fieldset {
    color:var(${cssvar}--text);
    position: relative;
    background-color: var(${cssvar}--input-background);
    display: flex;
    padding: 0;
    border-radius:inherit;
    outline: none;
    border: 0;
    margin: 0;
    width:var(${cssvar}--input-width);
  }
  ::-ms-reveal {
    display: none;
  }`];
  static properties = {
    label: {},
    name: {},
    pla: {},
    type: {},
    value: {},
    def: {},
  };
  get _input() {
    return this.shadowRoot?.querySelector('input');
  }
  constructor() {
    super();
    this.type = "text";
  }
  render() {
    if (!this.name) this.name = this.label || this.type;
    return html`<label for=${this.name}><span>${this.label}<slot></slot></span>
  <fieldset>
    <i><slot name="pre"></slot></i>
    <input @input=${this._handleInput} id=${this.name} type=${this.type} placeholder=${ifDefined(this.pla)} class=${this.type} />
    <i><slot name="suf"></slot></i>
    ${this.type === "password" && !this.querySelector('[slot="suf"]') ? html`<i @mousedown=${this._passwordSwitcher} @mouseup=${() => this._input.type = "password"} @mouseleave=${() => this._input.type = "password"} ><svg viewBox="0 0 48 48" fill="none"><path d="M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 42L6 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></i>` : undefined}
  </fieldset>
</label>`;
  }
  firstUpdated() {
    this._compositionCheck();
  }
  _passwordSwitcher() {
    if (this._input.type === "password") {
      this._input.type = "text";
    } else {
      this._input.type = "password";
    }
  }
}
define('label-input', LabelInput);