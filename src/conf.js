const defconf = {
  prefix: "",
  suffix: "",
  tag: function (origin) {
    return this.prefix + origin + this.suffix;
  },
  enabled: [],
  reflect: false,
  cssvar: "godown-c"
};
export const conf = Object.assign(defconf, window.GodownWebComponentsCONF);
if (conf.reflect) {
  // Reflect conf to globalThis
  globalThis.GodownWebComponentsCONF = conf;
}