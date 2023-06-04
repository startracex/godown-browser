const defconf = {
  prefix: "",
  suffix: "",
  tag(origin) {
    return this.prefix + origin + this.suffix;
  },
  enabled: [],
  namemap: new Map(),
  reflect: false,
  cssvar: "godown-c"
};
const conf = init(window.GodownWebComponentsCONF, defconf);
function init(CONFObject, source = conf) {
  Object.assign(source, CONFObject);
  if (source.reflect) {
    // Reflect conf to globalThis
    globalThis.GodownWebComponentsCONF = source;
  } else {
    delete globalThis.GodownWebComponentsCONF;
  }
  return source;
};
export { conf, init };
export default conf;