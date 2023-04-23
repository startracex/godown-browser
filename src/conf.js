const defconf = {
  prefix: "",
  suffix: "",
  tag: (origin) => defconf.prefix + origin + defconf.suffix,
  enabled: [],
  reflect: false,
  cssvar: "godown-c"
};
export const conf = Object.assign(defconf, window.GodownWebComponentsCONF);
if (conf.reflect) {
  // Reflect conf to globalThis
  globalThis.GodownWebComponentsCONF = conf;
}