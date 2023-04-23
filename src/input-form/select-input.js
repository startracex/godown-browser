import { html, css, define, conf, cssvar } from '../deps.js';
import STD from './std.js';
const selcls = `${conf.tag('select-input')}-selected`;
export class SelectInput extends STD {
  static properties = {
    autofocus: { type: Boolean },
    m: { type: Boolean },
    name: {},
    value: { type: Array },
    pla: {},
    def: {},
  };
  constructor() {
    super();
    this.text = [];
    this.value = [];
  }
  static styles = [STD.styles, css`
  :host{
    color:var(${cssvar}--text);
    display: inline-block;
    height: 1.5em;
    width:10.5em;
    border-radius:.75em;
    background:var(${cssvar}--input-background);
  }
  div{
    display: inline-flex;
  }
  form{
    position:absolute;
    display: inline-flex;
    flex-direction: column;
    background:inherit;
    border-radius:inherit;
    padding:0;
    width:100%;
    margin:0;
    overflow:hidden;
  }
  ul{
    margin:0;list-style:none;padding:0;
  }
  li{
    padding: 0.1em 0.5em;
    font-size: 95%;
  }
  li:hover{
    background:var(${cssvar}--input-background-hover);
  }
  button,input{
    height:100%;border:0;background:none;outline:none;
  }
  button{
    padding-left:0;
  }
  input{
    flex:1;
    min-width: 0;
    box-sizing:border-box;
    padding-left:.75em;
    padding-right:0;
    color: currentColor;
    font-size: 1rem;
  }`
  ];
  get assigned() {
    return this.shadowRoot.querySelector("slot").assignedNodes();
  }
  get _input() {
    return this.shadowRoot.querySelector("input");
  }
  get _aside() {
    return this.shadowRoot.querySelector("aside");
  }
  render() {
    return html`<div>
  <section>
    ${this.lists()}
  </section>
  <input @focus=${this.focus} @input=${this._handleInput} placeholder=${this.pla} />
  <svg viewBox="0 0 48 48" fill="none"><path d="M36 19L24 31L12 19H36Z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>
  <aside><slot></slot></aside>
</div>`;
  }
  lists() {
    var itemTemplates = [];
    if (this.value.length)
      for (const i in this.value) {
        itemTemplates.push(html`<i class="selected-item">${this.text[i] || this.value[i]}
        <svg @click=${() => { this.select(this.value[i]); }} t="1678769821062" viewBox="0 0 1024 1024" version="1.1" p-id="2770"><path d="M960 512c0-249.6-198.4-448-448-448S64 262.4 64 512s198.4 448 448 448 448-198.4 448-448zM691.2 736L512 556.8 332.8 736c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-32 0-44.8L467.2 512 288 332.8c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0L512 467.2 691.2 288c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L556.8 512 736 691.2c12.8 12.8 12.8 32 0 44.8-12.8 12.8-32 12.8-44.8 0z" fill="currentColor" p-id="2771"></path></svg>
        </i>`);
      }
    return html`${itemTemplates}`;
  }
  firstUpdated() {
    if (this.autofocus) this.focus();
    this.assigned.forEach((option) => {
      if (option.value) {
        option.addEventListener("click", () => {
          this.select(option.value, option.innerText);
        });
      }
      else if (option.children) {
        [...option.children].forEach(option => {
          option.addEventListener("click", () => {
            this.select(option.value, option.innerText);
          });
        });
      }
    });
    document.addEventListener("click", (e) => {
      if (!this.m && e.target != this || this.m && !this.contains(e.target)) {
        this.close();
      }
    });
  }
  select(value, text) {
    if (text === undefined) {
      this.assigned.forEach((option) => {
        if (option.value) {
          if (option.value == value) {
            text = option.innerText;
          }
        }
        else if (option.children) {
          [...option.children].forEach(option => {
            if (option.value == value) {
              text = option.innerText;
            }
          });
        }
      });
    }
    if (this.value.includes(value)) {
      if (this.m) {
        this.value = this.value.filter(v => v != value);
        this.text = this.text.filter(v => v != text);
      } else {
        this.value = [];
        this.text = [];
      }
    } else {
      if (this.m) {
        this.value.push(value);
        this.text.push(text);
      } else {
        this.value = [value];
        this.text = [text];
      }
    }
    this.assigned.forEach((option) => {
      if (option.value) {
        if (this.value.includes(option.value)) {
          option.classList.add(selcls);
        }
        else {
          option.classList.remove(selcls);
        }
      }
      else if (option.children) {
        [...option.children].forEach(option => {
          if (this.value.includes(option.value)) {
            option.classList.add(selcls);
          }
          else {
            option.classList.remove(selcls);
          }
        });
      }
    });
    this._input.value = "";
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent("change", { detail: this.namevalue() }));
  }
  focus() {
    this._input.focus();
    this.open();
  }
  close() {
    this._aside.style.visibility = "hidden";
  }
  open() {
    this._aside.style.visibility = "visible";
  }
  _handleInput() {
    let value = this.shadowRoot.querySelector("input").value.trim();
    if (this.m && value.includes(";")) {
      value = value.split(";").pop().trim();
    }
    this.assigned.forEach(option => {
      if (option.value) { option.style.display = "block"; }
      if (option.children) {
        option.style.display = "block";
        [...option.children].forEach(option => {
          option.style.display = "block";
        });
      }
    });
    if (value) {
      this.assigned.forEach(option => {
        if (option.value) {
          if (option.value.toLowerCase().includes(value.toLowerCase())) {
            option.style.display = "block";
          }
          else {
            option.style.display = "none";
          }
        }
        else if (option.children) {
          [...option.children].forEach(option => {
            if (option.value.toLowerCase().includes(value.toLowerCase())) {
              option.style.display = "block";
            }
            else {
              option.style.display = "none";
            }
          });
          if ([...option.children].filter(option => option.style.display == "block").length == 0) {
            option.style.display = "none";
          }
        }
      });
    }
    this.dispatchEvent(new CustomEvent("input", { detail: this.namevalue() }));
  }
  namevalue() {
    if (this.m) {
      return [this.name, this.value];
    }
    return [this.name, this.value[0]];
  }
  reset() {
    this.value = [];
    this.text = [];
    this.shadowRoot.querySelector("input").value = "";
    this.assigned.forEach(option => {
      if (option.value) {
        option.classList.remove(selcls);
      }
      else if (option.children) {
        [...option.children].forEach(option => {
          option.classList.remove(selcls);
        });
      }
    });
    if (this.def) {
      if (this.m) {
        this.def.split(";").forEach(def => {
          if (def.trim())
            this.select(def.trim(), undefined);
        });
      }
      else {
        if (this.def.split(";")[0].trim())
          this.select(this.def.split(";")[0].trim(), undefined);
      }
    }
  }
}
define('select-input', SelectInput);
