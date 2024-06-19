import { ProxyOptions } from "vite";

type ProxyItem = [string, string];
type ProxyList = ProxyItem[];
type ProxyTargetList = Record<string, ProxyOptions>;
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for(const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),
      ...(isHttps ? {success: false} : {})
    }
  }

  return ret;
}
