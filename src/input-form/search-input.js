import { html, css, ifDefined, define, cssvar } from '../deps.js';
import InputFormSTD from './std.js';

export class SearchInput extends InputFormSTD {
  static properties = {
    query: {},
    target: {},
    infer: { type: Boolean },
    remote: { type: Boolean },
    action: {},
    method: {},
    name: {},
    value: {},
    list: { type: Array },
    useinfer: { type: Function },
  };
  constructor() {
    super();
    this.method = "get";
    this.action = "./";
    this.name = "q";
    this.value = "";
    this.list = [];
    this.useinfer = async (x) => {
      return ["Undefine: useinfer", `Use: useinfer(${x} :string)`, "Return Array<string>"];
    };
  }
  static styles = [InputFormSTD.styles, css`
  :host{
    color:var(${cssvar}--text);
    display: inline-block;
    height: 1.5em;
    width:var(${cssvar}--input-width);
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
  render() {
    return html`<form action=${this.action} method=${this.method}>
<div>
  <input name=${this.name} @input=${this._handleInput} autocomplete="off" value=${this.value} >
  <button @click=${this._handleSubmit} type="submit"><svg viewBox="0 0 1024 1024" width="100%" height="100%"><path fill="currentColor" d="M745.429333 655.658667c1.173333 0.746667 2.325333 1.578667 3.413334 2.496l114.410666 96a32 32 0 0 1-41.152 49.024l-114.389333-96a32 32 0 0 1-6.208-6.976A297.429333 297.429333 0 0 1 512 768c-164.949333 0-298.666667-133.717333-298.666667-298.666667S347.050667 170.666667 512 170.666667s298.666667 133.717333 298.666667 298.666666a297.386667 297.386667 0 0 1-65.237334 186.325334zM512 704c129.6 0 234.666667-105.066667 234.666667-234.666667s-105.066667-234.666667-234.666667-234.666666-234.666667 105.066667-234.666667 234.666666 105.066667 234.666667 234.666667 234.666667z"  p-id="9859"></path><path d="M512 298.666667c47.146667 0 89.813333 19.093333 120.682667 49.984l-0.085334 0.085333a21.333333 21.333333 0 1 1-31.210666 28.992A127.573333 127.573333 0 0 0 512 341.333333a21.333333 21.333333 0 0 1 0-42.666666z" p-id="9860"></path></svg></button>
</div>
  <slot></slot>
  ${this.list?.length ? html`<ul>${this.list.map((v, i) => html`<li key=${i}>${v}</li>`)}</ul>` : undefined}
</form>`;
  }
  firstUpdated() {
    this.shadowRoot.querySelector("form").style.width = getComputedStyle(this).getPropertyValue('width');
    this.shadowRoot.querySelector("div").style.height = getComputedStyle(this).getPropertyValue('height');
    this._compositionCheck();
  }
  _handleSubmit(e) {
    if (!this.remote) e.preventDefault();
    this.dispatchEvent(new CustomEvent('submit', { detail: this.value }));
  }
  async _handleInput(e) {
    const value = e.target.value.trim();
    this.value = value;
    if (this.compositing) return;
    if (value && this.infer) {
      this.list = await this.useinfer(value);
    }
    else {
      this.list = [];
    }
    if (this.target && this.query) {
      if (!value) {
        document.querySelector(this.target).innerHTML = "";
        return;
      }
      var Equery = document.querySelectorAll(this.query);
      if (Equery.length) {
        let Etarget = document.querySelector(this.target);
        Etarget.innerHTML = "";
        for (let e of Equery) {
          if (e.innerText.includes(value)) {
            Etarget.appendChild(e.cloneNode(true));
          }
        }
      }
    }
    this.dispatchEvent(new CustomEvent("input", { detail: { value } }));
  }
}

const e = [
  { action: "https://www.google.com/search", name: "q", pla: "Google" },
  { action: "https://www.baidu.com/s", name: "wd", pla: "百度" },
  { action: "https://quark.sm.cn/s", name: "q", pla: "Quark" },
  { action: "https://www.bing.com/search", name: "q", pla: "Bing" },
  { action: "https://www.sogou.com/web", name: "query", pla: "搜狗" },
  { action: "https://yandex.com/search/", name: "text", pla: "Yandex" },
  { action: "https://www.qwant.com/", name: "q", pla: "Qwant", },
];
export class SearchW extends InputFormSTD {
  static styles = css`
  :host{
    width:10em;
    height:1.5em;
    display: inline-block;
    border-radius:.75em;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
    --search: aliceblue;
    --ground: currentColor;
    --search-hover: rgb(20 69 155);
  }
  *{
    color:inherit;
  }
  form {display: inline-flex;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    border-radius:inherit;
    margin: 0;
  }
  input {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
    border-right: 0 !important;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    outline: none;
    flex: 1 1 0%;
    padding-left: 1em;
    padding-right: 3.05em;
    border-width: 0.08em;
    border-style: solid;
    border-image: initial;
    border-color: var(--ground);
    background-color: transparent;
    color: var(--ground);
    transition: all .2s;
  }
  button:hover {
    background-color: var(--search-hover);
  }
  button {
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
    margin: 0;
    background: none transparent;
    border-spacing: 0;
    text-align: left;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    display: inline-flex;
    transition: all .2s;
    padding: 0;
    font-size: 1em;
    height: 100%;
    width: 2.5em;
    background-color: var(--ground);
  }
  svg {
    text-indent: 0;
    font-size: 1em;
    color: var(--search);
    width: .8em;
    height: .8em;
  }`;
  static properties = {
    origin: {},
    action: {},
    pla: {},
    name: {},
  };
  constructor() {
    super();
    Object.assign(this, e[Math.floor(Math.random() * e.length)]);
  }
  render() {
    if (this.origin) {
      Object.assign(this, e.find(v => v.pla === this.origin));
    }
    return html`<form action=${this.action} method="get" target="_blank">
  <input name=${this.name} placeholder=${ifDefined(this.pla)} />
  <button type="submit" aria-label="Search">
    <svg viewBox="0 0 18 18"><path d="M7.25 0C3.254 0 0 3.254 0 7.25s3.254 7.25 7.25 7.25c1.727 0 3.316-.61 4.563-1.625l4.906 4.906a.757.757 0 0 0 .73.207.766.766 0 0 0 .54-.539.757.757 0 0 0-.208-.73l-4.906-4.907A7.202 7.202 0 0 0 14.5 7.25C14.5 3.254 11.246 0 7.25 0Zm0 1.5A5.74 5.74 0 0 1 13 7.25c0 1.55-.613 2.953-1.605 3.984a1.035 1.035 0 0 0-.16.16A5.726 5.726 0 0 1 7.25 13 5.74 5.74 0 0 1 1.5 7.25 5.74 5.74 0 0 1 7.25 1.5Z" fill="currentColor" fill-rule="nonzero"></path>
    </svg>
  </button>
</form>`;
  }
}
define("search-input", SearchInput);
define("search-w", SearchW);
