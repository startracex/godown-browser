import { html, css, ifDefined, classMap, define } from '../deps.js';
import STD from './std.js';
export class AvatarAnchor extends STD {
  static properties = {
    src: {},
    href: {},
    name: {},
    more: { type: Number },
    call: {},
    gap: { type: Boolean }
  };
  static styles = css`
  :host{
    display: inline-block;
    height: fit-content;
  }
  *{
    border-radius: inherit;
  }
  article{
    flex:1;
  }
  header{
    display: flex; 
    flex-wrap: nowrap;
  }
  .center header{
    flex-direction: column;
  }
  .right header{
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
  .left header{
    justify-content: flex-start;
  }
  img{
    width: 100%;
    height: 100%;
  }
  div{
    --ava:2.5em;
  }
  a{
    height: var(--ava);
    width:var(--ava);
    min-height: var(--ava);
    min-width:var(--ava);
    display: flex;
    position: relative;
  }
  span{
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left.gap{
    margin-right:var(--ava);
  }
  .right.gap{
    margin-left:var(--ava);
  }
  slot[name="bar"]::slotted(*){
    height: var(--ava);
  }
  slot[name="state"]{
    position: absolute;
    display: block;
    position: absolute;
    display: block;
    bottom: -.25em;
    right: -.25em;
  }
  .left section,.right section{
    min-height: var(--ava);
    display: flex;
    flex-direction: column;
    flex:1;
  }
  .right section{
    justify-content: flex-end;
  }`;
  constructor() {
    super();
    this.call = "center";
  }
  render() {
    return html`<div class=${classMap({gap:this.gap,[this.call]:this.call})} >
      <header>
        <a href=${ifDefined(this.href)}>
          ${this.ava()}
          <slot name="state"></slot>
        </a>
        <section>
          <slot name="bar"></slot>
          ${this.gap ? html`<article><slot></slot></article>` : ''}
        </section>
      </header>
          ${!this.gap ? html`<article><slot></slot></article>` : ''}
    </div>`;
  }
  ava() {
    if (this.src) {
      return html`<img src=${this.src} />`;
    } else if (this.name) {
      var name = this.name.slice(0, 2);
      name = name[0].toUpperCase() + name.slice(1);
      return html`<span>${name}</span>`;
    } else if (this.more) {
      var more = this.more > 99 ? '...' : this.more;
      return html`<span>+${more}</span>`;
    }
    return html`<slot name="avatar"></slot>`;
  }
}
define('avatar-anchor', AvatarAnchor);
