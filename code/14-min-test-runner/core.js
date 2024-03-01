let testCallbacks = []
let onlyCallbacks = []
let describeCallbacks = []

export function describe(name, callback) {
  describeCallbacks.push({ name, callback })
  callback()
}
export function test(name, callback) {
  testCallbacks.push({ name, callback })
}
test.only = function (name, callback) {
  onlyCallbacks.push({ name, callback })
}
export const it = test

export function expect(pre) {
  return {
    toBe: cur => {
      if (pre === cur) {
        console.log("通过")
      } else {
        throw new Error(`不通过,pre: ${pre} 不等于 cur: ${cur}`)
      }
    },
    toEqual: cur => {
      if (typeof cur === "object") {
        throw new Error(`不通过,类型只能为object`)
      }
      if (pre === cur) {
        console.log("通过")
      } else {
        throw new Error(`不通过,pre: ${pre} 不等于 cur: ${cur}`)
      }
    },
  }
}

export function beforeAll(fn){

}
export function beforeEach(fn){

}
export function AfterEach(fn){

}
export function AfterAll(fn){

}
export function run() {
  const tests = onlyCallbacks.length > 0 ? onlyCallbacks : testCallbacks
  for (const { name, callback } of tests) {
    try {
      callback()
      console.log(`ok: ${name}`)
    } catch (error) {
      console.log(`error: ${name}`)
    }
  }
}
