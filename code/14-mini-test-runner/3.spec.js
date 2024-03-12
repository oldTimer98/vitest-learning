import { test, expect } from "./core.js";

test("should true", () => {
  expect(3).toBe(5);
  expect({a:1}).toEqual({a:2});
  expect({a:1}).toEqual({a:1});
});
