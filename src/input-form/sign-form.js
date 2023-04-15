import { html, css, define } from '../deps.js';
import InputFormSTD from './std.js';
import "./label-input.js"
export class SignForm extends InputFormSTD {
  static properties = {
    name: {},
    set: { type: Number }
  };
  constructor() {
    super();
    this.set = 2;
  }
  static styles = css`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
  main{
    display: flex;
    flex-direction: column;
  }`;
  get _form() {
    return this.shadowRoot.querySelector('form');
  }
  render() {
    return html`<form enctype="multipart/form-data"><slot name="pre"></slot><main>${this.opt()}<slot></slot></main><slot name="suf"></slot></form>`;
  }
  firstUpdated() {
    for (let slot of [...this.shadowRoot.querySelectorAll('slot')]) for (let i of slot.assignedNodes()) { slot.appendChild(i); }
  }
  opt() {
    const result = [];
    for (let i = this.set - 1; i >= 0; i--) {
      opts[i] && result.push(opts[i]);
    }
    return result;
  }
  reset() {
    each(this._form, (node) => {
      if (node.reset) { node.reset(); }
    });
  }
  namevalue() {
    var x = {};
    each(this._form, (node) => {
      if (node.namevalue) {
        var [name, value] = node.namevalue();
        if (name) {
          x[name] = value;
        }
      }
    });
    var y = Object.fromEntries(new FormData(this._form));
    x = { ...x, ...y };
    return [this.name, x];
  }
  FormData() {
    var x = new FormData(this._form);
    each(this._form, (node) => {
      if (node.namevalue) {
        var [name, value] = node.namevalue();
        if (name && typeof value !== 'object' && !x.has(name)) {
          x.append(name, value);
        }
      }
      if (node.FormData) {
        for (let [key, value] of node.FormData()) {
          if (!x.has(key)) {
            x.append(key, value);
          }
        }
      }
    });
    return x;
  }
}

function each(node, callback) {
  if (node) {
    callback(node);
    for (let i of node.childNodes) {
      each(i, callback);
    }
  }
}
define('sign-form', SignForm);
const opts = [
  html`<label-input style="margin: 0.25em 0;" name="e-mail" type="email"><span style="display: inline-block;margin: 0 .125em .2em;">E-mail</span></label-input>`,
  html`<label-input style="margin: 0.25em 0;" type="password"><span style="display: inline-block;margin: 0 .125em .2em;">Password</span></label-input>`
];