export function thenable<T>(obj: any): obj is PromiseLike<T> {
  return obj && typeof obj === 'object' && obj.then;
}

export function isXHR(obj: any): obj is XMLHttpRequest {
  return obj instanceof XMLHttpRequest;
}

export { isObject } from 'lodash-es';



export function defineAttributesComponent<T extends object, C extends (new (...args: any) => any)>(component: C) {
  return component as any as {
    new(): { $props: Partial<Pick<InstanceType<C>, '$props'>> & T }
  }
}
