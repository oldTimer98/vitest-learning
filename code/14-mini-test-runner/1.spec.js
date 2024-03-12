import { test, describe } from "./core.js"

describe("", () => {
  test("first test case", () => {
    console.log("1. first test case")
  })

  test.only("second test case", () => {
    console.log("2. second test case")
  })
})
