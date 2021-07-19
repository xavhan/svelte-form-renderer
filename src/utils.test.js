import { merge, pipe, pathOr, isNil } from "./utils";

test("merge", () => {
  expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  expect(merge({ a: { b: 1 }, c: 2 }, { a: { b: 3 } })).toEqual({ a: { b: 3 }, c: 2 });
});

test("pipe", () => {
  const always = n => n;
  const double = n => n*2;
  const triple = n => n*3;
  
  expect(pipe(always, double, triple)(3)).toEqual(18)
});

test("isNil", () => {
  expect(isNil(null)).toBe(true);
  expect(isNil(undefined)).toBe(true);
  expect(isNil()).toBe(true);
  expect(isNil(false)).toBe(false);
  expect(isNil('val')).toBe(false);
  expect(isNil('')).toBe(false);
})

test("pathOr", () => {
  const test = {
    one: 1,
    zero: 0,
    emptystring: "",
    null: null,
    undefined: undefined,
    nested: {
      truthy: true,
      falsy: false,
    }
  }
  
  expect(pathOr('default', ['one'], test)).toEqual(1)
  expect(pathOr('default', ['emptystring'], test)).toEqual('')
  expect(pathOr('default', ['null'], test)).toEqual('default')
  expect(pathOr('default', ['undefined'], test)).toEqual('default')
  expect(pathOr('default', ['undefined'], test)).toEqual('default')
  expect(pathOr('default', ['nested','truthy'], test)).toEqual(true)
  expect(pathOr('default', ['nested','falsy'], test)).toEqual(false)
  expect(pathOr('default', ['nested','unknown'], test)).toEqual('default')
});
