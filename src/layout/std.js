import { css, cssvar, STD } from "../deps.js";
export default class LayoutSTD extends STD {
  static styles = [STD.styles, css`
:host{
  ${cssvar}--text: rgb(240 240 240);
  ${cssvar}--shadow: rgb(0 0 0 / 55%);
  ${cssvar}--nav-background: rgb(28  28  31);
  ${cssvar}--nav-super-background: rgb(16 136 138);
}
`];
}