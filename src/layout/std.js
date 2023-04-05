import { LitElement, css } from "../deps.js";
export default class LayoutSTD extends LitElement {
  static styles = css`
:host{
  --text:rgb(240 240 240);
  --shadow: rgb(0 0 0 / 55%);
  --nav-background: rgb(28  28  31);
  --nav-super: rgb(40 160 150 / 55%);
}
*{
  color:inherit
}
`;
}