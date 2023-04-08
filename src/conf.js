const defconf = {
  prefix: "",
  suffix: "",
  tag: (origin) => defconf.prefix + origin + defconf.suffix,
  enabled: [],
};
const w = (typeof window !== "undefined" ? window.GodownWebComponentsCONF : undefined) ?? defconf;
export const conf = w;
window.GodownWebComponentsCONF = conf;