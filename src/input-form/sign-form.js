import { html, css, define } from '../deps.js';
import STD from './std.js';
import "./label-input.js";
export class SignForm extends STD {
  static properties = {
    name: {},
    set: { type: Number }
  };
  constructor() {
    super();
    this.set = 2;
  }
  static styles = css`
  :host{
    display: flow-root;
  }
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
  opt() {
    const result = [];
    for (let i = 0; i <= this.set - 1; i++) {
      opts[i] && result.push(opts[i]);
    }
    return result;
  }
  reset() {
    each(this._form, (node) => {
      if (node.reset) { node.reset(); }
    });
    var form = document.createElement('form');
    for (let slot of this.shadowRoot.querySelectorAll('slot')) for (let i of slot.assignedNodes()) {
      if (i.reset) { i.reset(); }
      form.appendChild(i.cloneNode(true));
    }
    form.reset();
    for (let slot of this.shadowRoot.querySelectorAll('slot')) for (let i of slot.assignedNodes()) {
      if (i.name && form[i.name]) {
        i.value = form[i.name].value;
      }
    }
    form.remove();
  }
  namevalue() {
    var x = {};
    var form = document.createElement('form');
    form.enctype = "multipart/form-data";
    for (let slot of this.shadowRoot.querySelectorAll('slot')) for (let i of slot.assignedNodes()) {
      if (i.namevalue) {
        var [name, value] = i.namevalue();
        if (name) {
          x[name] = value;
        }
      } else {
        form.appendChild(i.cloneNode(true));
      }
    }
    var y = new FormData(form);
    for (let [key, value] of y) {
      x[key] = value;
    }
    each(this._form, (node) => {
      if (node.namevalue) {
        var [name, value] = node.namevalue();
        if (name) {
          x[name] = value;
        }
      }
    });
    form.remove();
    return [this.name, x];
  }
  FormData() {
    var x = {};
    var form = document.createElement('form');
    form.enctype = "multipart/form-data";
    for (let slot of this.shadowRoot.querySelectorAll('slot')) for (let i of slot.assignedNodes()) {
      if (i.FormData) {
        for (let [key, value] of i.FormData()) {
          x[key] = value;
        }
      } else {
        form.appendChild(i.cloneNode(true));
      }
    }
    var y = new FormData(form);
    each(this._form, (node) => {
      if (node.namevalue) {
        var [name, value] = node.namevalue();
        if (name) {
          y.append(name, value);
        }
      }
    });
    for (let key in x) {
      y.append(key, x[key]);
    }
    form.remove();
    return y;
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
  html`<label-input label="E-mail" style="margin: 0.25em 0;" name="e-mail" type="email"></label-input>`,
  html`<label-input label="Password" style="margin: 0.25em 0;" type="password"></label-input>`
];
export class BaseForm extends SignForm {
  constructor() {
    super();
    this.set = 0;
  }
}
define('base-form', BaseForm);