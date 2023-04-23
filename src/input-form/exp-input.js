import { html, css, ifDefined, define, cssvar } from '../deps.js';
import STD from './std.js';
export class ExpInput extends STD {
  static styles = [STD.styles, css`
    :host{
      display: inline-block;
      width: var(${cssvar}--input-width);
      color: var(${cssvar}--text);
      border-color: var(${cssvar}--input-outline);
    }
    .input:focus {
      --input-outline: var(${cssvar}--input-outline-focus) !important;
    }
    div:hover {
      --input-background: var(${cssvar}--input-background-hover) !important;
    }
    .underline::after {
      content: "";
      position: absolute;
      bottom: -.1em;
      width: 100%;
      height: .18em;
      bottom:0;
      border-radius: inherit;
      background-color: var(${cssvar}--input-outline);
    }
    .underline fieldset {
      border-color: transparent !important;
    }
    .outline fieldset{
      border-color: inherit !important;
      border: .18em solid;
    }
    .filed {
      background-color: var(${cssvar}--input-background);
      outline: .18em solid var(${cssvar}--input-outline);
    }
    .filed fieldset {
      border-color: transparent !important;
      background-color: transparent !important;
    }
    :focus~fieldset,
    :valid~fieldset {
      border-color: var(${cssvar}--input-outline-focus);
    }
    * {
      border-radius: inherit;
      color: inherit;
      font-size: inherit;
      font-family: inherit;
      transition: all .2s,height 0s;
    }
    div {
      border-color: inherit;
      position: relative;
      width: 100%;
      display: inline-flex;
      min-height:inherit;
    }
    textarea.input{
      margin-top: .5em;
      margin-bottom: .18em;
      resize: vertical;
      height: inherit;
      min-height: 1.72em;
    }
    input.input{
      height: 1.9em;
    }
    .with-label .input{
      margin-top: .71em;
    }
    .outline .input{
      margin-left:.18em;
      margin-right:.18em;
    }
    .underline .input{
      margin-left:.12em;
      margin-right:.12em;
    }
    .input {
      width: 100%;
      min-height:inherit;
      margin-top: .45em;
      border: 0;
      box-sizing: border-box;
      padding: .2em;
      font-size: inherit;
      outline: 0;
      background-color: transparent;
      z-index: 2;
      overflow-y: hidden;
    }
    fieldset {
      box-sizing: border-box;
      position: absolute;
      background-color: var(${cssvar}--input-background);
      pointer-events: none;
      padding: 0px;
      position: absolute;
      height: 100%;
      margin: 0;
      width: inherit;
    }
    legend span {
      font-size: .1em;
      display: inline-block;
      padding: 0 .2em;
      background-color: var(${cssvar}--input-background);
      font-size: inherit;      
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    textarea~fieldset legend {
      transform: translateY(.6em);
    }
    legend {
      margin: 0;
      padding: 0;
      width: 0;
      height: 1em;
      transform: translateY(.8em);
    }
    .filed span{
      background-color:transparent;
    }
    :focus+fieldset legend,
    :valid+fieldset legend {
      transform: translateY(-.19em) scale(.7);
    }`
  ];
  static properties = {
    label: {},
    name: {},
    pla: {},
    type: {},
    value: {},
    def: {},
    base: {},
    offset: {},
  };
  get _input() {
    return this.shadowRoot.querySelector('.input');
  }
  constructor() {
    super();
    this.type = "text";
    this.base = "outline";
  }
  render() {
    if (!this.name) this.name = this.label || this.type;
    return html`<div class=${this.base}>
  ${this.type !== "textarea" ? html`<input class="input" required title="" value=${this.value} @input=${this._handleInput} type=${this.type} placeholder=${ifDefined(this.pla)} name=${this.name}>` : html`<textarea class="input" required title="" value=${this.value || this.def} @input=${this._handleInput} placeholder=${this.pla} name=${this.name}></textarea>`}
  <fieldset>
    <legend><span>${this.label}<slot></slot></span></legend>
  </fieldset><style>:valid~fieldset legend,:focus~fieldset legend{margin-left: ${this.offset || 0} !important;}</style>
</div>`;
  }
  firstUpdated() {
    this._compositionCheck();
  }
}
define('exp-input', ExpInput);