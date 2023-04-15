import { LitElement, css } from "../deps.js";
export default class InputFormSTD extends LitElement {
  constructor() {
    super();
  }
  static styles = css`
:host{
  --text: rgb(240 240 240);
  --input-outline: rgb(25 130 180);
  --input-outline-focus: rgb(29 155 180);
  --input-background: rgb(36 34 34);
  --input-background-hover: rgb(42 42 42);
  --input-control: rgb(244 244 244);
  --input-true: rgb(47 129 237);
  --input-false: rgb(204 204 204);
}
* {
  color: inherit;
}
`;
}