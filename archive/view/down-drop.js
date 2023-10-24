import { html, css, define } from "../deps.js";
import STD from "./std.js";
export class DownDrop extends STD {
  static styles = [
    STD.styles,
    css`
      :host {
        height: 100%;
        width: 100%;
      }
      main {
        height: inherit;
        width: inherit;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
      }
      div {
        background-color: inherit;
        position: absolute;
        visibility: hidden;
        top: 100%;
      }
      slot[name="hover"]:hover ~ div,
      div:hover {
        visibility: visible;
      }
    `,
  ];
  get _div() {
    return this.shadowRoot.querySelector("div");
  }
  render() {
    return html`<main>
      <slot name="hover"></slot>
      <slot name="focus" @click=${this.toggle}></slot>
      <div style="transform:translateX(0)"><slot></slot></div>
    </main>`;
  }
  async firstUpdated() {
    if (this.querySelector('[slot="focus"]')) {
      document.addEventListener("click", (e) => {
        if (!this.contains(e.target)) {
          this.close();
        }
      });
    }
    await this.updateComplete;
    this.resize();
    window.addEventListener("resize", () => {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => {
        this._div.style.transform = `translateX(0)`;
        this.resize();
      }, 250);
    });
  }
  resize() {
    const offsets =
      this.offsetParent?.getBoundingClientRect() ||
      document.body.getBoundingClientRect();
    const divLeft = this._div.getBoundingClientRect().left;
    const divRight = this._div.getBoundingClientRect().right;
    const RightWidth = offsets.width - (divRight - offsets.x);
    const LeftWidth = offsets.width - (offsets.right - divLeft);
    if (divLeft < 0) {
      this._div.style.transform = `translateX(${-LeftWidth}px)`;
    } else if (divRight > offsets.right) {
      this._div.style.transform = `translateX(${RightWidth}px)`;
    } else {
      this._div.style.transform = `translateX(0)`;
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
define("down-drop", DownDrop);
