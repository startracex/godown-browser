const defconf = {
  prefix: "",
  suffix: "",
  tag: (origin) => defconf.prefix + origin + defconf.suffix,
  enabled: [],
};
export const conf = Object.assign(defconf, window.GodownWebComponentsCONF);
window.GodownWebComponentsCONF = conf;