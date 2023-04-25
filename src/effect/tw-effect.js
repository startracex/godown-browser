import { css, define, html } from '../deps.js';
import STD from "./std.js";
export class TWText extends STD {
  static properties = {
    text: {},
    stopped: { type: Boolean },
    autochange: { type: Number },
    max: { type: Number },
    min: { type: Number },
  };
  static styles = css`
    :host{
      font-family: monospace;
      white-space: nowrap;
    }
    i{
      border-right: 1px solid;
      margin: 1px;
      animation: s 1.5s steps(1) infinite;
    }
    @keyframes s {
      0%{
        border-color: currentColor;
      }
      50% {
        border-color: transparent
      }
    }`;
  render() {
    return html`<slot></slot><i></i>`;
  }
  constructor() {
    super();
    this.autochange = 0;
    this.max = 50;
    this.min = 350;
    this.len = 0;
    this.timer = [];
  }
  firstUpdated() {
    if (!this.text)
      this.text = this.shadowRoot.querySelector('slot').assignedNodes()[0]?.textContent.trim() || "";
    this.len = this.text.length;
    if (!this.stopped && this.len)
      this.rewrite();
  }
  rewrite() {
    for (const timer of this.timer) {
      clearTimeout(timer);
    }
    this.timer = [];
    const text = this.shadowRoot.querySelector('slot').assignedNodes()[0];
    text.textContent = '';
    let delay = 0;
    let autochange = this.autochange ? this.autochange : random(this.min, this.max);
    this.text.split('').forEach((char) => {
      this.timer.push(
        setTimeout(() => {
          text.textContent += char;
          this.dispatchEvent(new CustomEvent('change'));
          if (this.len === text.textContent.length) {
            this.dispatchEvent(new CustomEvent('done', { detail: delay }));
          }
        }, delay));
      delay += autochange;
      if (!this.autochange) {
        autochange = random(this.min, this.max);
      }
    }
    );
  }
  stop() {
    for (const timer of this.timer) {
      clearTimeout(timer);
    }
    this.timer = [];
  }
}
function random(m = 0, n = 1) {
  return Math.random() * (n - m) + m;
}
define('tw-text', TWText);