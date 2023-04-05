import { css, html, define, name } from "../deps.js";
import ItemsSTD from "./std.js";
export class DetailsItem extends ItemsSTD {
  static properties = {
    summary: {},
    open: { type: Boolean, reflect: true },
    fill: { type: Boolean },
    reverse: { type: Boolean },
  };
  static styles = css`:host{
    display:block;
    transition: all .3s ease-in-out;
  }
  span{
    flex:1;
  }
  i{
    height: 1em;
    width: 1em;
    transition: inherit;
    margin-left: auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  dl{
    padding: inherit;
  }
  dl,dd{
    transition: inherit;
    margin: 0;
    overflow: hidden;
  }
  dt{
    transition: inherit;
    height: min-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  dd{
    display:contents;
  }
  section{
    height:0;
    transition: inherit;
  }
  [open] i{
    transform: rotate(-90deg) !important;
  }
  [open] section{
    height: var(--height);
  }`;
  get _section() {
    return this.shadowRoot.querySelector("section");
  }
  render() {
    return html`<dl ?open=${this.open}>
<dt @click=${() => this.toggle()} style="flex-direction:row${this.reverse ? "-reverse" : ""}">
  <span>${this.summary}<slot name="summary"></slot></span>
  <i style="transform: rotate(${this.reverse ? "-18" : ""}0deg);">${this._icon()}</i>
</dt>
<dd @click=${(e) => { if (this.fill && this.shadowRoot.contains(e.target)) this.toggle(); }}>
  <section><slot></slot></section>
</dd></dl>`;
  }
  async firstUpdated() {
    await this.updateComplete;
    this.setHeight();
  }
  toggle(to = !this.open) {
    this.setHeight();
    this.open = to;
    this.dispatchEvent(new CustomEvent("change", { detail: this.open }));
  }
  _icon() {
    return !this.querySelector("slot[name='icon']") ? html`<svg fill="currentColor" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>` : html`<slot name="icon"></slot>`;
  }
  setHeight(height = `${this._section.scrollHeight}px`) {
    this._section.style.setProperty('--height', height);
  }
}
define(name.tag("details-item"), DetailsItem);