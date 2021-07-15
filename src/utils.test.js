import { merge, pipe } from "./utils";

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
