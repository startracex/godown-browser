import { html, css, define } from '../deps.js';
import STD, { DLsharecss } from "./std.js";
export class MenuList extends STD {
  static properties = {
    summary: {},
    open: { type: Boolean, reflect: true },
  };
  static styles = [STD.styles, DLsharecss, css`
  i{
    width: 1.2em;
    height: 1.2em;
    display: inline-flex;
    align-items: center;
    border-radius: 20%;
    transition:inherit;
  }
  dt i{
    background-color: rgb(0 0 0 / 0.055);
  }
  dt i:hover{
    background-color: rgb(0 0 0 /.075);
  }
  [open] svg{
    transform: rotate(90deg);
  }
`];
  render() {
    return html`<dl>
<dt ?open=${this.open} >
  <span>${this.summary}<slot name="summary"></slot></span>
  <i @click=${() => this.toggle()}>${!this.querySelector('[slot="icon"]') ? html`<svg viewBox="0 0 48 48" fill="none"><path d="M19 12L31 24L19 36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>` : html`<slot name="icon"></slot>`}</i>
</dt>
<dd ?open=${this.open}>
  <section><slot></slot></section>
</dd></dl>`;
  }
  firstUpdated() {
    const NoTitle = !this.summary && !this.querySelector('[slot="summary"]');
    if (NoTitle) {
      this.shadowRoot.querySelector("dt").style.display = "none";
      this.open = true;
    }
  }
  toggle(to = !this.open) {
    this.open = to;
    this.dispatchEvent(new CustomEvent("change", { detail: this.open }));
  }
}
define('menu-list', MenuList);