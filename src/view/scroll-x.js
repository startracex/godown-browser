import { html, css, define } from '../deps.js';
import STD from './std.js';
export class ScrollX extends STD {
  static styles = css`
  :host{ 
    display: block;
    width: 100%;
    height: fit-content;
  }
  section {
    overflow: auto;
    position: relative;
    transform-origin: 0 0;
    transform: rotate(-90deg) translateX(-100%);
  }
  section::-webkit-scrollbar {
    display: none;
  }
  span {
    height: 500px;
    display: flex;
  }
  main {
    width: auto;
    position: absolute;
    left: 100%;
    transform-origin: 0 0;
    transform: rotate(90deg);
  }`;
  get _section() {
    return this.shadowRoot.querySelector('section');
  }
  render() {
    return html`<section><main><span><slot></slot></span></main></section>`;
  }
  firstUpdated() {
    this._section.addEventListener('scroll', (e) => {
      this.dispatchEvent(new CustomEvent('scroll', { detail: e.target.scrollTop }));
    });
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }
  resize() {
    if (!this.style.height)
      this.style.height = `${this.querySelector('*')?.clientHeight || 0}px`;
    this._section.style.width = getComputedStyle(this).height;
    this._section.style.height = getComputedStyle(this).width;
  }
}
define('scroll-x', ScrollX);