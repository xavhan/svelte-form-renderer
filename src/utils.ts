type AnyObject = Record<string, any>;

export const merge = (target: AnyObject, source: AnyObject): AnyObject => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object)
      Object.assign(source[key], merge(target[key], source[key]));
  }
  Object.assign(target || {}, source);
  return target;
};

export const pipe = <I, O>(...ops: Function[]) =>
  ops.reduce((a, b) => (arg) => b(a(arg))) as (i?: I) => O;
