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
export const init = (CONFObject) => {
  Object.assign(defconf, CONFObject);
  if (defconf.reflect) {
    // Reflect conf to globalThis
    globalThis.GodownWebComponentsCONF = defconf;
  }
  return defconf;
};
export const conf = { ...init(window.GodownWebComponentsCONF) };
export default conf;