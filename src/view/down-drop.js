import { html, css, define } from '../deps.js';
import STD from './std.js';
export class DownDrop extends STD {
  static styles = css`
  :host{
    height: 100%;
    width: 100%;
  }
  main{
    height: inherit;
    width: inherit;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
  }
  div{
    background-color:inherit;
    position: absolute;
    visibility: hidden;
    top:100%;
  }
  slot[name="hover"]:hover~div,div:hover{
    visibility: visible;
  }
  `;
  get div() {
    return this.shadowRoot.querySelector("div");
  }
  render() {
    return html`
    <slot name="hover"></slot>
    <slot name="focus" @click=${this.toggle}></slot>
    <div><slot></slot></div>`;
  }
  async firstUpdated() {
    if (this.querySelector('[slot="focus"]')) {
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target)) {
          this.close();
        }
      });
    }
    await this.updateComplete;
    this.resize();
  }
  resize() {
    const offsets = this.offsetParent?.getBoundingClientRect() || document.body.getBoundingClientRect();
    const div = this.div;
    const divLeft = div.getBoundingClientRect().left;
    const divRight = div.getBoundingClientRect().right;
    const RightWidth = offsets.width - (divRight - offsets.x);
    const LeftWidth = offsets.width - (offsets.right - divLeft);
    if (divLeft < 0) {
      div.style.transform = `translateX(${-LeftWidth}px)`;
    } else if (divRight > offsets.right) {
      div.style.transform = `translateX(${RightWidth}px)`;
    } else {
      div.style.transform = `translateX(0)`;
    }
  }
  close() {
    this.div.style.visibility = "hidden";
  }
  open() {
    this.div.style.visibility = "visible";
  }
  toggle() {
    this.div.style.visibility === "visible" ? this.close() : this.open();
  }
}
define('down-drop', DownDrop);