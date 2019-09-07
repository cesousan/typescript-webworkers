import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
export function Memoize(ttl = 5, debug = true) {
  const cache = {};
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const params = args.map(a => JSON.stringify(a)).join();
      if (debug) {
        let result;
        const t0 = new Date().getMilliseconds();
        let t1: number;
        if (typeof cache[params] === 'undefined') {
          console.log(`caching ${propertyKey} with args ${params}`);
          result = (cache[params] = method(...args));
          removeAfter(params, ttl);
          t1 = new Date().getMilliseconds();
        } else {
          console.log(`returning ${propertyKey} from cache for args ${params}`)
          result = cache[params];
          t1 = new Date().getMilliseconds();
        }
        console.log(`execution of ${propertyKey} took ${t1 - t0} milliseconds`);
        return result;
      } else {
        const result = (
          cache[params] = typeof cache[params] === 'undefined'
            ? method(...args)
            : cache[params]
        );
        return result;
      }
    }
  }
  // has a closure on the memoizer function so that it can remove items from it after a given time.
  function removeAfter(key: string, ttl: number) {
    // console.log("in remove after");
    const ttlInMilliseconds = ttl * 1000;
    setTimeout(() => {
      // console.log("in remove after callback");
      if (cache[key] !== 'undefined') {
        console.log(`removing ${key} from ${Object.keys(cache)} after ${ttl} seconds in cache`);
        delete cache[key];
      }
    }, ttlInMilliseconds);
  }
}


export const API = (baseUrl: string) => {
  const call = function(endpoint: string) {
    const getData = function() {
      return from(fetch(`${baseUrl}${endpoint}`)).pipe(
        switchMap((response: Response) => {
          if (response.ok) {
            return from(response.json());
          } else {
            return of("HTTP-Error: " + response.status);
          }
        })
      );
    }
    return { getData };
  }
  return (target) => {
    // return function<T extends new(...args: {}[]) => IApi>(target: T) {}
    target.prototype.callApi = call;
  }
}

export interface IApi {
  callApi: Function;
}