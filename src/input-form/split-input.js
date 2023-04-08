import { html, css,  define } from '../deps.js';
import InputFormSTD from './std.js';
export class SplitInput extends InputFormSTD {
  static styles = [InputFormSTD.styles, css`:host{
      display: inline-block;
      height:1.2em;
    }
    div {
      vertical-align:top;
        position: relative;
        display:inline-flex;
    }
    span {
      vertical-align: top;
      display: inline-flex;
      width: 1em;
      padding: 0.1em;
      height: 1em;
      pointer-events: all;
    }
    i {
      height: inherit;
      width: 100%;
      z-index: 1;
      background-color: var(--input-false);
      font-style: normal;
      font-size: 0.5em;
      text-align: center;
    }
    input {
      border:0;
      opacity: 0;
      left: 0;
      position: absolute;
      background-color: tan;
      right: 0;
      top: 0;
      bottom: 0;
    }
    .focus i {
      outline: .12em solid var(--input-true);
    }`];
  static properties = {
    name: {},
    value: {},
    max: { type: Number },
    index: { type: Number },
  };
  constructor() {
    super();
    this.value = "";
    this.max = 6;
    this.current = 0;
    this.currentValue = [];
    this.index = -1;
  }
  get _spans() {
    return this.shadowRoot.querySelectorAll("span");
  }
  get _input() {
    return this.shadowRoot.querySelector("input");
  }
  render() {
    return html`<div>
  ${Array(this.max).fill(0).map(() => html`<span><i></i></span>`)}
  <input @input=${this._handleInput} value="     ">
</div>`;
  }
  firstUpdated() {
    this.currentValue = this.value.split('').concat(Array(this.max - this.value.length).fill(null));
    this.current = (this.index < 0 || this.index > this.max) ? this.currentValue.indexOf(null) : this.index;
    this._spans.forEach((span, index) => {
      span.addEventListener('click', () => {
        this.current = index;
        this.focu();
        this._input.focus();
      });
    });
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.blur();
      }
    });
  }
  namevalue() {
    return [this.name, this.value];
  }
  _handleInput(e) {
    if (e.data === null) {
      if (this.currentValue[this.current] !== null) {
        this.currentValue[this.current] = null;
        this.current = this.current;
      } else {
        this.currentValue[this.current - 1] = null;
        this.current = this.current - 1 < 0 ? 0 : this.current - 1;
      }
    } else {
      this.currentValue[this.current] = e.data;
      if (this.current + 1 >= this.max) {
        this.current = this.currentValue.indexOf(null);
        if (this.current === -1) {
          this.blur();
        }
      } else {
        this.current += 1;
      }
    }
    this.focu();
    this._spans.forEach((span, index) => {
      span.querySelector('i').innerText = this.currentValue[index] || '';
    });
    this.value = this.currentValue.join('');
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }
  focu(i = this.current) {
    this._spans.forEach((span) => {
      span.classList.remove('focus');
    });
    this._spans[i]?.classList.add('focus');
    this._input.value = "      ";
  }
  blur(i = this.current) {
    this._spans[i]?.classList.remove('focus');
    this._input.blur();
  }
}
define("split-input", SplitInput);