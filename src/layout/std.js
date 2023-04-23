import { LitElement, css, cssvar } from "../deps.js";
export default class LayoutSTD extends LitElement {
  static styles = css`
:host{
  ${cssvar}--text: rgb(240 240 240);
  ${cssvar}--text-selection: rgb(80 255 255);
  ${cssvar}--text-selection-background: rgb(0 0 0 / 10%);
  ${cssvar}--shadow: rgb(0 0 0 / 55%);
  ${cssvar}--nav-background: rgb(28  28  31);
  ${cssvar}--nav-super-background: rgb(16 136 138);
}
*{
  color: inherit;
}
`;
}