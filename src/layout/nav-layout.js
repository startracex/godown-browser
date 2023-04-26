import { html, css, define, cssvar } from '../deps.js';
import "../view/down-drop.js";
import STD from './std.js';
export class NavLayout extends STD {
  static styles = [STD.styles, css`:host{
    color: var(${cssvar}--text);
    ${cssvar}--nav-height:48px;
    width: 100%;display: flex;flex-flow: column nowrap;justify-content: space-between;align-items: center;min-height: 100%;
  }
  nav,.option {
    background: var(${cssvar}--nav-background);
  }
  .option a:hover {
    background: var(${cssvar}--nav-super-background);
  }
  nav {
    height: var(${cssvar}--nav-height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 2.5%;
    box-sizing: border-box;
    margin: auto;
    position: relative;
    z-index: 2; 
  }
  a {
    text-decoration: none;
    color: currentColor;
  }
  h1 {
    font-weight: normal;
    font-size: 1rem;
    margin: 0;
  }
  h1>a,h1>span{
    font-size: 145%;
  }
  main{
    flex: 1;
    width: inherit;
    display: flex;
    flex-direction: column;
    z-index: 1;
  }
  nav>div {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .option {
    overflow: hidden;
  }
  .option a {
    height: 46px;
    line-height: 46px;
    display: block;
    white-space: nowrap;
    padding: 0 18px;
    text-align: center;
    transition: background-color 152ms;
  }
  .option a:hover {
    transform: scale(1.025);
  }
  down-drop a {
    display: flex;
    padding: 3px;
    box-sizing: border-box;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  down-drop a::selection{
    color: var(${cssvar}--text-selection);
    background: var(${cssvar}--text-selection-background);
  }
  `];
  static properties = {
    host: {},
    subhead: {},
    set: { type: Number },
  };
  render() {
    return html`<nav>
  <h1>
    <slot name="host"></slot>
    <a href="/">${this.host}</a>${this.subhead && html`<span> | </span><span>${this.subhead}</span>`}
  </h1>
  <div>
    ${this.opt()}
    <slot name="opt"></slot>
  </div>
</nav>
<main><slot></slot></main>
<slot name="footer"></slot>`;
  }
  opt() {
    const result = [];
    for (let i = 0; i <= this.set - 1; i++) {
      opts[i] && result.unshift(opts[i]);
    }
    return result;
  }
}
define('nav-layout', NavLayout);
const opts = [
  html`<down-drop><a slot="hover"><svg width="36" height="36" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" fill="white" fill-opacity="0.01" /><path d="M18.2838 43.1712C14.9327 42.1735 11.9498 40.3212 9.58787 37.8669C10.469 36.8226 11 35.4733 11 34C11 30.6863 8.31371 28 5 28C4.79955 28 4.60139 28.0098 4.40599 28.029C4.13979 26.7276 4 25.3801 4 24C4 21.9094 4.32077 19.8937 4.91579 17.9994C4.94381 17.9998 4.97188 18 5 18C8.31371 18 11 15.3137 11 12C11 11.0487 10.7786 10.1491 10.3846 9.34999C12.6975 7.19937 15.5205 5.5899 18.6521 4.72302C19.6444 6.66807 21.6667 8.00001 24 8.00001C26.3333 8.00001 28.3556 6.66807 29.3479 4.72302C32.4795 5.5899 35.3025 7.19937 37.6154 9.34999C37.2214 10.1491 37 11.0487 37 12C37 15.3137 39.6863 18 43 18C43.0281 18 43.0562 17.9998 43.0842 17.9994C43.6792 19.8937 44 21.9094 44 24C44 25.3801 43.8602 26.7276 43.594 28.029C43.3986 28.0098 43.2005 28 43 28C39.6863 28 37 30.6863 37 34C37 35.4733 37.531 36.8226 38.4121 37.8669C36.0502 40.3212 33.0673 42.1735 29.7162 43.1712C28.9428 40.7518 26.676 39 24 39C21.324 39 19.0572 40.7518 18.2838 43.1712Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" /><path d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" /></svg></a><div class="option"><a href="/zh">简体中文</a><a href="/en">English</a><a href="/ru">Русский</a></div></down-drop>`,
  html`<down-drop><a href="/account" slot="hover"><svg viewBox="0 0 1024 1024" width="32" height="32"><path d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m0 654.222222a425.927111 425.927111 0 0 0-336.440889 164.238222A454.087111 454.087111 0 0 0 512 967.111111a453.973333 453.973333 0 0 0 336.440889-148.593778A425.699556 425.699556 0 0 0 512 654.222222zM512 56.888889a455.111111 455.111111 0 0 0-372.849778 716.231111 482.247111 482.247111 0 0 1 280.519111-166.968889 227.555556 227.555556 0 1 1 184.604445 0.113778 482.133333 482.133333 0 0 1 280.576 166.684444A455.111111 455.111111 0 0 0 512 56.888889z m0 170.666667a170.666667 170.666667 0 1 0 0 341.333333 170.666667 170.666667 0 0 0 0-341.333333z m102.627556 176.526222a28.444444 28.444444 0 0 1 8.021333 35.555555l-2.730667 4.323556-8.817778 11.548444a125.553778 125.553778 0 0 1-209.237333-14.904889 28.444444 28.444444 0 0 1 49.607111-27.875555 68.664889 68.664889 0 0 0 109.909334 13.539555l4.551111-5.347555 8.817777-11.548445a28.444444 28.444444 0 0 1 39.879112-5.290666z" fill="currentColor" p-id="1704"></path></svg></a></down-drop>`,
];