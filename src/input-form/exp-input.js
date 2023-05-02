import { html, css, define, cssvar, classMap } from '../deps.js';
import STD from './std.js';
export class ExpInput extends STD {
  static styles = [STD.styles, css`
    :host{
      display: inline-block;
      width: var(${cssvar}--input-width);
      color: var(${cssvar}--text);
      border-color: var(${cssvar}--input-outline);
      border-radius:.2em;
    }
    .input:focus {
      ${cssvar}--input-outline: var(${cssvar}--input-outline-focus) !important;
    }
    div:hover {
      ${cssvar}--input-background: var(${cssvar}--input-background-hover) !important;
    }
    .underline::after,.underline::before{
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      margin:auto;
      bottom: -.1em;
      width: 100%;
      height: .18em;
      bottom:0;
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
    }
    .underline:has(:focus)::before{
      z-index:2;
      width:100%;
    }
    .underline::before{width: 0;
      transition: all .2s;
      background: var(${cssvar}--input-outline-focus) !important;
    }
    .underline::after{
      background: var(${cssvar}--input-outline);
    }
    .underline fieldset {
      border-color: transparent !important;
    }
    .outline fieldset{
      border-color: inherit !important;
      border: .18em solid;
    }
    .outline .input{
      padding-left:.18em;
      padding-right:.18em;
    }
    .no-label.filed .input{
      margin-top:0;
    }
    .filed {
      background: var(${cssvar}--input-background);
      outline: 0.18em solid var(${cssvar}--input-outline);
      height: calc(100% - .36em);
      width: calc(100% - .36em);
      margin: .18em;
    }
    .filed fieldset {
      border-color: transparent !important;
      background: transparent !important;
    }
    :focus~fieldset,
    :valid~fieldset {
      border-color: var(${cssvar}--input-outline-focus);
    }
    * {
      border-radius: inherit;
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
      resize: vertical;
      height:1.5em;
      padding-top:.3em
    }
    .input{
      margin-left:.18em;
      margin-right:.18em;
    } 
    .input {
      width: 100%;
      padding-top: .2em;
      min-height: 1.7em;
      margin-top: .45em;
      margin-bottom: .2em;
      border: 0;
      box-sizing: border-box;
      font-size: inherit;
      outline: 0;
      background: transparent;
      z-index: 2;
      overflow-y: hidden;
    }
    fieldset {
      box-sizing: border-box;
      position: absolute;
      background: var(${cssvar}--input-background);
      pointer-events: none;
      padding: 0px;
      position: absolute;
      height: 100%;
      margin: 0;
      width: inherit;
    }
    legend span {
      white-space:nowrap;
      display: inline-block;
      padding: 0 .2em;
      background: var(${cssvar}--input-background);
      font-size: inherit;      
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    legend {
      width: 0;
      height: 1em;
      transform: translateY(.8em);
    }
    .filed span{
      background:transparent;
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
    if (!this.name) this.name = this.label?.toLowerCase() || this.type;
    return html`<div class=${classMap({ [this.base]: true, "no-label": !this.label })}>
  ${this.type !== "textarea" ? html`<input class="input" required title="" value=${this.value} @input=${this._handleInput} type=${this.type} placeholder=${this.pla} >` : html`<textarea class="input" required title="" value=${this.value || this.def} @input=${this._handleInput} placeholder=${this.pla} ></textarea>`}
  <fieldset>
    <legend><span>${this.label}</span></legend>
  </fieldset><style>:valid~fieldset legend,:focus~fieldset legend{margin-left: ${this.offset || 0} !important;}</style>
</div>`;
  }
  firstUpdated() {
    this._compositionCheck();
  }
}
define('exp-input', ExpInput);