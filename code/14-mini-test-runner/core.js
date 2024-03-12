let testCallbacks = []
let onlyCallbacks = []
let describeCallbacks = []
let beforeAllCallbacks = []
let beforeEachCallbacks = []
let afterEachCallbacks = []
let afterAllCallbacks = []
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

export function beforeAll(fn) {
  beforeAllCallbacks.push(fn)
}
export function beforeEach(fn) {
  beforeEachCallbacks.push(fn)
}
export function AfterEach(fn) {
  afterEachCallbacks.push(fn)
}
export function AfterAll(fn) {
  afterAllCallbacks.push(fn)
}
export function run() {
  // 执行总的beforeAll回调
  beforeAllCallbacks.forEach(fn => fn())

  const tests = onlyCallbacks.length > 0 ? onlyCallbacks : testCallbacks
  for (const { name, callback } of tests) {
    // 执行beforeEach的回调
    beforeEachCallbacks.forEach(fn => fn())

    try {
      callback()
      console.log(`ok: ${name}`)
    } catch (error) {
      console.log(`error: ${name}`)
    }
    // 执行afterEach的回调
    afterEachCallbacks.forEach(fn => fn())
  }
  // 执行总的afterAll回调
  afterAllCallbacks.forEach(fn => fn())
}
