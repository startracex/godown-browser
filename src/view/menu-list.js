import { html, css, define } from '../deps.js';
import STD from './std.js';
export class MenuList extends STD {
  static properties = {
    summary: {},
    open: { type: Boolean, reflect: true },
  };
  static styles = [STD.styles, css`
  :host{
    display: inline-block;
    transition: all .3s ease-in-out;
  }
  div.no-title{
    display: none;
  }
  div{
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    transition: all 0.3s ease-in-out 0s;
    background-color: inherit;
    align-items: center;
  }
  span{
    display: inline-flex;
    align-items: center;
    flex:1;
    white-space: nowrap;
  }
  i{
    width: 1.25em;
    height: 1.25em;
    display: inline-flex;
    align-items: center;
    border-radius: 20%;
    transition:inherit;
  }
  div i{
    background-color: rgb(0 0 0 / 0.055);
  }
  div i:hover{
    background-color: rgb(0 0 0 /.075);
  }
  i>svg{
    width:100%;
    height:100%;
    transition: all .3s ease-in-out;
  }
  [open] i>svg{
    transform: rotate(90deg);
  }
  section{
    height:0;
    transition:inherit;
    overflow:hidden;
    display: flex;
    flex-direction: column;
  }
  [open]+section{
    height:var(--height) ;
  }
  aside{
    display:contents;
  }`];
  get _section() {
    return this.shadowRoot.querySelector('section');
  }
  render() {
    const NoTitle = !this.summary && !this.querySelector('[slot="summary"]');
    const sum = NoTitle ? 'no-title' : 'with-title';
    return html`<div ?open=${this.open} class=${sum} >
  <span>${this.summary}<slot name="summary"></slot></span>
  <aside @click=${() => this.toggle()}>${this._icon()}</aside>
</div>
<section class=${sum}><slot></slot></section>`;
  }
  reset() {
    this.resize();
    this.open = this.def;
  }
  connectedCallback() {
    super.connectedCallback();
    this.def = this.open;
  }
  async firstUpdated() {
    await this.updateComplete;
    const NoTitle = !this.summary && !this.querySelector('[slot="summary"]');
    if (NoTitle) {
      this.open = true;
      this.def = true;
    }
    this.resize();
  }
  toggle(to = !this.open) {
    this.resize();
    this.open = to;
    this.dispatchEvent(new CustomEvent("change", { detail: this.open }));
  }
  _icon() {
    return !this.querySelector('[slot="icon"]') ? html`<i><svg viewBox="0 0 48 48" fill="none"><path d="M19 12L31 24L19 36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></i>` : html`<slot name="icon"></slot>`;
  }
  resize(height = `${this._section.scrollHeight}px`) {
    this._section.style.setProperty('--height', height);
  }
}
define('menu-list', MenuList);