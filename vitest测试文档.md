



# 前言

自 2023 年开始，我曾经学过一遍前端测试，但当时并没有充分应用。从 2024 年开始，我决定重新学习单元测试，以提升我的代码质量并深入理解单元测试的思想。

我要感谢崔老师的前端测试课程，让我快速入门前端测试。本文内容是根据自己的学习经验和老师的教程顺序编写的，希望能够为大家提供良好的学习体验，提升大家的编程能力。

# 一、为什么要写测试

**测试分为手动测试和代码测试**

1.  **确保代码质量**：单元测试可以帮助开发人员验证他们的代码是否按预期工作。通过编写测试用例来覆盖代码的各个功能和边界情况，可以提高代码的质量并减少出现bug的可能性。
2.  **便于重构**：单元测试可以帮助开发人员在重构代码时确保功能不受影响。通过运行单元测试，开发人员可以快速检查重构后的代码是否仍然符合预期行为。
3.  **提高代码可维护性**：单元测试可以作为一种文档，帮助其他开发人员了解代码的预期行为。当其他开发人员修改代码时，单元测试可以确保他们的更改不会破坏现有功能。
4.  **快速反馈**：单元测试可以自动化运行，并且通常比手动测试快得多。这意味着开发人员可以快速得知他们的更改是否引入了问题，从而更快地修复bug。

# 二、单元测试在修改代码时的好处

## 1、新增功能和修复bug

-   检测在新增功能时，会不会对老功能产生影响；
-   同时加了测试，会让我们更加对功能有信心

## 2、重构和改善代码

-   平时代码只是能用就行，能跑就行，大家都不敢动
-   加班的时候，也就是加功能，以及改bug，这些都会导致代码的质量下降
-   通过重构去改变代码质量，通过增加测试来保证旧功能没有问题，并减少bug的产生

## 3、check别人提交的代码

-   review别人的代码的时候并不清楚别人的代码是否会影响自己的功能
-   通过添加单元测试，在提交的代码的时候会检测是否影响旧功能

## 4、活文档-阅读文档

-   通过查看和运行单测，相当于直接查看代码功能是如何实现的
-   有测试的话，新人可以快速入门

## 5、改善程序设计

-   只有设计好的程序，才能更好的写单元测试；相反，单元测试写的好，程序设计就很完美
-   实现功能的时候，按照模块化、组件化思想，同时增加单元测试；从而符合高内聚、低耦合

# 三、自动化思维的体现

## 1、功能验证

-   通过单元测试工具Vitest，对于功能进行描述，以及对于功能进行验证

## 2、定位和修复bug

-   手动修复bug的话，是先根据bug产生，通过打断点的方式，去查看bug的产生
-   有单元测试的话，是会直接在运行单测的过程中，就已经会发现问题；如果对于边界情况的话，通过定位问题，再去添加新的单元测试

# 四、单元级别的功能测试

**引申出两个问题**

1、私有的方法，没有导出的函数，如何测试

2、一个测试对应一个函数，当业务发生改变的时候，就需要改变测试代码的结构

**解决**

以功能作为单元级别的测试用例就可以解决以上的问题；首先第一个问题是直接包含在功能内部使用的，对于功能的单元测试已经通过了，那就不需要去对私有方法进行测试了；第二个问题也是如此

# 五、写测试的顺序

## 1、后补测试

-   这种方式非常的不友好，非常痛苦

## 2、通过单元测试替换手动验证

-   可以感受到测试的魅力

## 3、先写测试后实现-TDD的思想

-   测试驱动开发-敏捷开发
-   先写测试，后写业务逻辑

# 六、不写测试的原因

**原因：**

1、时间不够

2、功能测试是测试同学的任务，与我无关

3、不知道写测试的好处

4、对于项目没有要求

5、写了很多错误，不可维护的测试，反而降低了效率，对测试失去信任

6、不知道如何写测试

**正确的使用方式：**

1、实现功能 + 测试

2、开发写的是白盒测试

3、认知问题，并不是写测试就是加班

# 七、编写第一个单元测试

## 目标

-   明白 Vitest 的安装使用
-   明白测试基本结构四个步骤
-   手动测试和自动化测试的差异

## 大纲

-   Vitest 的安装和使用

    -   安装
    -   写测试
    -   运行

-   测试基本结构

    -   准备数据
    -   执行
    -   验证
    -   拆卸

-   测试代码组织风格

安装Vitest

```js
pnpm add vitest -D
```

## 编写第一个测试

```js
import { expect, it, describe, beforeEach, test } from "vitest";
import { useTodoStore } from './todo';
import { createPinia, setActivePinia } from 'pinia';

describe("todo", () => {
  test("新增一个todo", () => {
    // 1、准备数据
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    const title = "吃饭"
    // 2、调用
    todoStore.addTodo(title)

    // 3、验证
    expect(todoStore.todos[0].title).toBe(title)
    // 4、重置
    todoStore.reset()
  })

  test("reverse Todo的内容", () => {
    // 1、准备数据
    setActivePinia(createPinia())
    const todoStore = useTodoStore()
    const title = "reverse:HeiHei"
    // 2、调用
    todoStore.addTodo(title)

    // 3、验证
    expect(todoStore.todos[0].title).toBe('ieHieH')
    // 4、重置
    todoStore.reset()
  })
});

```

## 运行测试

使用pnpm test

```js
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "test":"vitest"
  },
```

# 八、Vitest的核心Api

## 1、describe

当在文件的顶层使用 `test` 或 `bench` 时，它们会作为隐式套件的一部分被收集起来。使用 `describe` 可以在当前上下文中定义一个新的测试套件，作为一组相关测试或基准以及其他嵌套测试套件。测试套件可让组织测试和基准，使报告更加清晰。

相当于是包裹test内容

具体Api：[describe](https://cn.vitest.dev/api/#describe)

## 2、test / it

`test` 定义了一组相关的期望。 它接收测试名称和保存测试期望的函数。

具体Api：[test](https://cn.vitest.dev/api/#test)

**语法如下：**

```js
import { expect, test } from 'vitest'

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2)
})
```

## 3、expect

`expect` 用于创建断言。 在这种情况下， `assertions` 是可以调用来断言语句的函数。 Vitest 默认提供 `chai` 断言，并且还在 `chai` 之上构建了与 `Jest` 兼容的断言。

期待结果是什么

具体Api：[expect](https://cn.vitest.dev/api/expect.html)

**语法如下：**

```js
import { expect } from 'vitest'

const input = Math.sqrt(4)

expect(input).to.equal(2) // chai API
expect(input).toBe(2) // jest API

// toBe相当于全等
it("toBe", () => {
  // ===
  expect(1).toBe(1);
});
// toEqual比较对象是否相等
it("toEqual", () => {
  const user = {
    name: "xiaohong",
  };
  expect(user).toEqual({
    name: "xiaohong",
  });
});

// toBeTruthy是否为true
it("toBeTruthy", () => {
  expect(1).toBeTruthy();
  expect(true).toBeTruthy();
  expect("1234").toBeTruthy();
});

// toBeFalsy是否为false
it("toBeFalsy", () => {
  expect(0).toBeFalsy();
  expect(false).toBeFalsy();
  expect("").toBeFalsy();
});
// toContain判断数组是否包含或者string的内容
it("toContain", () => {
  // 数组 string
  const item1 = {
    name: "xiaohong",
  };
  const item2 = {
    name: "xiaoming",
  };
  const item3 = {
    name: "x",
  };
  const list = [item1, item2];
  expect(list).toContain(item1);
  //   expect(list).toContain(item3);

  expect("<div>1234</div>").toContain("1234");
});
// toThrow判断函数内部是否抛出错误
it("toThrow", () => {
  function getName(name) {
    if (typeof name !== "string") {
      throw new Error("错误的name");
    }
    return "hei";
  }

  expect(() => {
    getName(111);
  }).toThrow("错误的name");
});
```

## 4、setup & teardown -生命周期

通过这些函数，我们可以挂钩测试的生命周期，避免重复设置和拆卸代码。它们适用于当前上下文：如果在顶层使用，则适用于文件；如果在 `describe` 块内使用，则适用于当前测试套件。 将 Vitest 作为类型检查器运行时，不会调用这些钩子。

`beforeEach`：注册一个回调函数，在当前上下文中的每个测试运行前调用。 如果函数返回一个 Promise ，Vitest 会等待承诺解析后再运行测试。

你还可以选择提供超时（毫秒），以指定终止前的等待时间。默认值为 5 秒。

```js
import { beforeEach } from 'vitest'

beforeEach(async () => {
  // Clear mocks and add some testing data after before each test run
  await stopMocking()
  await addUser({ name: 'John' })
})

// 自 Vitest v0.10.0 起，beforeEach 还接受一个可选的清理函数（相当于 afterEach）。
import { beforeEach } from 'vitest'

beforeEach(async () => {
  // called once before each test run
  await prepareSomething()

  // clean up function, called once after each test run
  return async () => {
    await resetSomething()
  }
})
```

`afterEach`:注册一个回调函数，在当前上下文中的每个测试完成后调用。 如果函数返回一个承诺，Vitest 会等待承诺解析后再继续。

你还可以选择提供超时（毫秒），以指定终止前的等待时间。默认值为 5 秒。

```js
import { afterEach } from 'vitest'

afterEach(async () => {
  await clearTestingData() // clear testing data after each test run
})
```

`beforeAll`:注册一个回调函数，在开始运行当前上下文中的所有测试之前调用一次。 如果函数返回一个 Promise ，Vitest 会等待承诺解析后再运行测试。

你还可以选择提供超时（毫秒），以指定终止前的等待时间。默认值为 5 秒。

```js
import { beforeAll } from 'vitest'

beforeAll(async () => {
  await startMocking() // called once before all tests run
})

// 同时支持可选的清理函数
import { beforeAll } from 'vitest'

beforeAll(async () => {
  // called once before all tests run
  await startMocking()

  // clean up function, called once after all tests run
  return async () => {
    await stopMocking()
  }
})
```

`afterAll`:注册一个回调函数，以便在当前上下文中所有测试运行完毕后调用一次。 如果函数返回一个 Promise ，Vitest 会等待承诺解析后再继续。

你还可以选择提供超时（毫秒），以指定终止前的等待时间。默认值为 5 秒。

```js
import { afterAll } from 'vitest'

afterAll(async () => {
  await stopMocking() // this method is called after all tests run
})
```

**执行顺序：** `beforeAll` >`beforeEach` > `test` > `afterEach` > `afterAll`

# 九、掌握Vitest的调试技巧

## 1、javascript debug terminal

通过`vscode`的自带的调试终端进行测试

![image-20240301101509725](https://gitee.com/nest-of-old-time/picture/raw/master/typora/202403011015816.png)

## 2、run and debug 推荐

通过创建`launch.json`文件去运行调试

![image-20240301101635122](https://gitee.com/nest-of-old-time/picture/raw/master/typora/202403011016280.png)

## 3、vitest plugins 推荐

使用`package.json`的通过`vitest run`进行`debug`

```json
{
  "name": "vitest-jest-contrast",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test:vitest": "vitest run",
    "test:jest": "jest",
    "build": "vite build"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/jest": "^29.5.0",
    "jest": "^29.5.0",
    "ts-jest": "^29.0.5",
    "typescript": "^5.0.2",
    "vitest": "^0.29.8"
  }
}
```

# 十、Vitest 对比 Jest

## 1、对比

`vitest:`维护的时间更勤，且完全拥抱`ts`，并且和`vite`配置可以共用一套，且和`vue`搭配效果更好

`jest:`维护时间不勤，并配置困难，多套环境不能共用

## 2、项目使用的是 `jest` ，但是你讲的是 `vitest` ，如何做知识的迁移

`vitest`对于`jest`的`api`做了完全兼容，可以放心使用，除了某些区别：

- Jest 默认启用[全局 API](https://jestjs.io/zh-Hans/docs/api)。然而 `Vitest` 没有。你既可以通过 [`globals` 配置选项](https://cn.vitest.dev/config/#globals)启用全局 API，也可以通过更新你的代码以便使用来自 `vitest` 模块的导入。
- 等等......**具体可以查看官方文档**

# 十一、实现一个自己的 mini-test-runner

## 1、目标

- 通过自己实现一个 `mini-test-runner` 来理解测试框架的 `api` 使用

## 2、实现

- 首先模拟`vitest`的方法，例如`test/it`,`describe`,`expect`,生命周期函数等

```js
// 1.spec.js
import { test, run,describe } from "./core.js"

describe("", () => {
  test("first test case", () => {
    console.log("1. first test case")
  })

  test.only("second test case", () => {
    console.log("2. second test case")
  })
})

run()
```

```js
// core.js
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

export function beforeAll(fn){
  beforeAllCallbacks.push(fn)
}
export function beforeEach(fn){
  beforeEachCallbacks.push(fn)
}
export function AfterEach(fn){
  afterEachCallbacks.push(fn)
}
export function AfterAll(fn){
  afterAllCallbacks.push(fn)
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
```

主要的执行逻辑在`run`方法，通过收集`test`等内部的回调去执行,并且在执行`test.only`的时候需要去判断一下

```javascript
 const tests = onlyCallbacks.length > 0 ? onlyCallbacks : testCallbacks
```

这样就可以只执行`only`的回调了！！！

接下来我们继续补充生命周期的执行方法,其实就是改造`run`方法

```javascript
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
```

如此一来，我们对于基本的`vitest`的`api`的功能就已经完成，接下来我们继续完善，我们写一个插件，让它能够自动运行测试代码，而不是我们手动调用`run`方法

## 3、实现自动运行测试代码

```javascript
import fs from "fs/promises"
import { glob } from "glob" // 一个匹配文件名的插件

// 查找所有以 `.spec.js` 结尾的测试文件
const testFiles = glob.sync("**/*.spec.js", { ignore: "node_modules/**" })

console.log("testFiles", testFiles)
```

**运行代码返回结果如下**

![image-20240312154105534](https://gitee.com/nest-of-old-time/picture/raw/master/typora/202403121541617.png)

**使用`fs`模块对文件进行处理**

```javascript
import fs from "fs/promises"
import { glob } from "glob"

// 查找所有以 `.spec.js` 结尾的测试文件
const testFiles = glob.sync("**/*.spec.js", { ignore: "node_modules/**" })

// 运行所有测试文件
for (const testFile of testFiles) {
  const fileContent = await fs.readFile(testFile, "utf-8")
  console.log('',fileContent);
}
```



**运行代码返回结果如下**

![image-20240312154535385](https://gitee.com/nest-of-old-time/picture/raw/master/typora/202403121545476.png)

**接下来我们需要自动去运行代码，我们把`run`方法去掉，得需要程序自动去运行**

**并且我们不只有一个测试文件，所以需要对所有测试文件的内容进行打包合并到一个文件内去运行，这里我使用`edbulid`**

```javascript
import fs from "fs/promises"
import { glob } from "glob"
import { build } from "esbuild"
// 查找所有以 `.spec.js` 结尾的测试文件
const testFiles = glob.sync("**/*.spec.js", { ignore: "node_modules/**" })

// 运行所有测试文件
for (const testFile of testFiles) {
  const fileContent = await fs.readFile(testFile, "utf-8")
  await runModule(fileContent)
}

async function runModule(fileContent) {
  try {
    const result = await build({
      stdin: {
        contents: fileContent,
        resolveDir: process.cwd(),
      },
      write: false,
      bundle: true,
      target: "esnext",
    })
    const transformedCode = result.outputFiles[0].text

    console.log("result", transformedCode)
  } catch (error) {
    console.error("Error executing module:", error)
  }
}
```

**运行后看见确实合并在一起了**

![image-20240312162642156](https://gitee.com/nest-of-old-time/picture/raw/master/typora/202403121626250.png)

## 4、最终代码

```javascript
import fs from "fs/promises"
import { glob } from "glob"
import { build } from "esbuild"
// 查找所有以 `.spec.js` 结尾的测试文件
const testFiles = glob.sync("**/*.spec.js", { ignore: "node_modules/**" })

// 运行所有测试文件
for (const testFile of testFiles) {
  const fileContent = await fs.readFile(testFile, "utf-8")
  await runModule(fileContent + "import { run } from './core.js'; run()")
}

async function runModule(fileContent) {
  try {
    // 转换代码为 CommonJS 格式并捆绑依赖
    const result = await build({
      stdin: {
        contents: fileContent,
        resolveDir: process.cwd(),
      },
      write: false,
      bundle: true,
      target: "esnext",
    })
    // 获取转换后的代码
    const transformedCode = result.outputFiles[0].text
    // 执行转换后的代码
    const runCode = new Function(transformedCode)
    runCode()
  } catch (error) {
    console.error("Error executing module:", error)
  }
}

```

**最后我们使用暴力的方式，去运行测试代码**

![image-20240312163225596](https://gitee.com/nest-of-old-time/picture/raw/master/typora/202403121632675.png)

**所有文件都测试完毕**

# 十二、准备测试数据的三种方式

## 1、内联数据

```js
  it('should add a todo', () => {
    // 低层次的代码
    const todo: Todo = {
      title: "吃饭",
      content: "今天要和小明去吃饭",
    }

    addTodo(todo)

    expect(todos[0]).equal(todo)
  })
```

> 缺点：
>
> - 重复代码
> - 当逻辑复杂的时候 就会导致单元测试可读性变差

## 2、隐式的方式

```js
describe("隐式", () => {
  let todoA = {}
  let todoB = {}
  let todoC = {}
  beforeEach(() => {
    todoA
    todoB
    todoC
  })
  it('(should )', () => {
  });
});

```

## 3、工厂函数

> 需要考虑的两个问题
>
> -  代码重复的问题
> -  可读性的问题

```js
 
// 创建的工厂函数可以导出使用，更加简洁方便
export function createTodo(title: string, content: string = "这是一个 todo 的内容") {
  return {
    title,
    content,
    state: State.active,
  };
}

it("normal addTodo", () => {
    // given
    // 中高层次的代码
    // const todo = createTodo("吃饭");
    // todo.content = "nihaoya";
    // todo.state = State.removed

    const todo = createRemovedTodo();

    // when
    addTodo(todo);

    // then
    expect(todos[0]).toEqual(todo);
  });
  it(" addTodo with top command", () => {
    // given
    const todo = createTodo("吃饭", "dddd");

    // when
    addTodo(todo);

    // then
    expect(todos[0].title).toEqual("吃饭");
  });

  it(" addTodo with reverse command", () => {
    // given
    const todo = createTodo("吃饭");

    // when
    addTodo(todo);

    // then
    expect(todos[0].title).toEqual("饭吃");
  });
```

## 4、最小准备测试数据原则

> 注意：尽量准备数据的时候，不要准备与程序无关的

```js
describe("User", () => {
  it("should buy a product", () => {
    // 准备测试数据 - 包含无关的信息
    const user = new User("Alice", 25, "alice@example.com", "123 Main St");
    const product = new Product("Book", 15, "A great book on software testing");

    // 测试购买功能
    const result = user.buy(product);
    const expectedResult = "User Alice bought Book";

    expect(result).toBe(expectedResult);
  });

  it("should buy a product", () => {
    const user = new User("oldTimer", 18, "cuixiaorui@heihei.com", "beijing");
    const product = new Product("Book", 15, "a great book on frontEnd testing");

    const result = user.buy(product);

    expect(result).toBe("User oldTimer bought Book");
  });
  it("v1.0 修改业务代码本身的逻辑 ", () => {
    // 测试也是业务代码的用户之一
    // 测试可以驱动我们程序的设计
    const user = new User("oldTimer");
    const product = new Product("Book");

    const result = user.buy(product);

    expect(result).toBe("User oldTimer bought Book");
  });
  it("v2.0 委托 工厂函数 来隐藏不需要关心的属性", () => {
    // 委托 来去隐藏不需要关心的属性
    const user = createUser("oldTimer");
    const product = createProduct("Book");

    const result = user.buy(product);

    expect(result).toBe("User oldTimer bought Book");
  });

  it("v3.0 虚拟对象的方式", () => {
    // 虚拟对象的方式
    const user = new User("oldTimer");
    const product = { name: "Book" } as Product;

    const result = user.buy(product);

    expect(result).toBe("User oldTimer bought Book");
  });
});

function createUser(name: string) {
  return new User(name, 18, "cuixiaorui@heihei.com", "beijing");
}

function createProduct(name: string) {
  return new Product(name, 15, "a great book on frontEnd testing");
}
```

# 十三、程序的间接输入

## 1、依赖函数调用-stub的应用

- **调用其他模块获取数据、也有可能是通过API获取的**

```js
import { fetchUserAge, userAge } from "./user";

// 直接 input
function add(a: number, b: number) {
  return a + b;
}

// 间接的 input
export function doubleUserAge(): number {
  return userAge() * 2;
}
export async function fetchDoubleUserAge(): Promise<number> {
  const userAge = await fetchUserAge();
  return userAge * 2;
}

export function userAge() {
  // api
  //  return user.age
  return 4;
}

// api.js
export function fetchUserAge(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(18);
    }, 0);
  });
}
```

- 解决：使用`vi.mock`

  **1、通过去控制间接输入的值** `（推荐）`

```js
import { beforeEach, vi, it, expect, describe } from 'vitest';
// 替换掉真实的逻辑实现
vi.mock("./user", () => {
  return {
    fetchUserAge: () => Promise.resolve(2),
  };
});
describe("间接input", () => {
  it("first", async () => {
    const r = await fetchDoubleUserAge();
    expect(r).toBe(4);
  });
});
```

注意：`vi.mock`会被提到顶部执行

**2、在内部改写**

```js
import { beforeEach, vi, it, expect, describe } from 'vitest';
vi.mock("./user");
describe("间接input", () => {
  it("first", async () => {
    vi.mocked(userAge).mockReturnValue(2);
    expect(userAge()).toBe(2);
  });
});

```

**3、**`vi.doMock`的方式

```js
describe("间接input", () => {
     beforeEach(() => {
      vi.doMock("./user", () => {
         return {
           userAge: () => 2,
         };
       });
     });
  it("first", async () => {
    const { doubleUserAge } = await import("./index");
    const r = await fetchDoubleUserAge();
    expect(r).toBe(4);
  });
});

```

## 2、第三方库、对象、class、常量

### 1、第三方模式的处理 如 `axios`

比如我们需要通过`axios`去获取数据

```js
// third-party-modules.ts
import axios from "axios";

interface User {
  name: string;
  age: number;
}

export async function doubleUserAge() {
  // 调用了第三方模块
  // const user: User = await axios("/user/1");
  // 对象  让你直接调用对象上的方法
  const user: User = await axios.get("/user/1");
  return user.age * 2;
}
```

我们可以使用`vi.mock`去模拟`get`请求的返回值，使用`mockResolvedValue`方法

```js
import { test, vi, expect } from "vitest";
import { doubleUserAge } from "./third-party-modules";
import axios from "axios";

vi.mock("axios");

test("第三方模式的处理 axios", async () => {
  // vi.mocked(axios).mockResolvedValue({ name: "oldTimer", age: 18 });
  vi.mocked(axios.get).mockResolvedValue({ name: "oldTimer", age: 18 });

  const r = await doubleUserAge();

  expect(r).toBe(36);
});
```

### 2、使用class的形式

例如我们使用class的方式去获取返回值

```js
// User.ts
export class User {
  age: number = 18;
  name:string = ""

  getAge(){
    return this.age
  }
}
// use-class.ts
import { User } from "./User";

export function doubleUserAge(): number {
  const user = new User();
  console.log(user)

  // return user.getAge() * 2;
  return user.age * 2
}
```

我们可以使用`vi.mock`去模拟`class`，或者直接修改类的`prototype`

```js
import { it, expect, describe, vi } from "vitest";
import { doubleUserAge } from "./use-class";

// 二 是使用vi.mock
vi.mock("./User", async (importOriginal) => {
  return {
    User: class {
      age = 2
    },
  };
});

describe("使用class的形式", () => {
  it("user age", () => {
    // given

    // 一个是修改方法
    // User.prototype.getAge = () => 2;

    // when
    const age = doubleUserAge();

    // then
    expect(age).toBe(4);
  });
});
```

### 3、使用对象的形式

```js
// use-object.ts
import { config } from "./config";

export function tellAge() {
  if (config.allowTellAge) {
    return 18;
  }

  return "就不告诉你";
}
```

这个比较简单，我们直接设置对象的值为`true`即可

```js
import { it, expect, describe, vi } from "vitest";
import { tellAge } from "./use-object";


describe("使用对象的形式", () => {
  it("allow ", () => {

    config.allowTellAge = true;

    const age = tellAge();

    expect(age).toBe(18);
  });
});
```

### 4、使用变量的方式



```js
// config.ts
export const name = "oldTimer"
export const gold = 3

// use-variable.ts
import { name } from "./config";

export function tellName() {
  return name + "-heiheihei";
}
```

这里我们使用`vi.mock`给我们提供的`importOriginal`参数字段来重新赋值这个文件

```js
import { it, expect, describe, vi } from "vitest";
import { tellName } from "./use-variable";
import { name, gold } from "./config";

vi.mock("./config", async (importOriginal) => {
  return { ...await importOriginal() as any, name: "xiaohong" };
});

describe("使用变量的形式", () => {
  it("tell name ", () => {
    console.log(gold);
    // when
    const name = tellName();

    // then
    expect(name).toBe("xiaohong-heiheihei");
  });
});
```

## 3、环境变量-全局`global`

### 1、环境变量

```js
// env.ts
export function doubleUserAge() {
  return process.env.USER_AGE;
}
```

使用`vi.stubEnv`去设置`env`的数据，注意：需要在初始的时候清空使用`vi.unstubAllEnvs`或者使用后清空

```js
import { beforeEach, it, expect, vi, describe } from "vitest";
import { doubleUserAge } from "./env";

beforeEach(() => {
  vi.unstubAllEnvs();
});

it("process", () => {
  vi.stubEnv("USER_AGE", "99");
  //   import.meta.env  vite webpack
  //   process.env.USER_AGE = "15";
  const r = doubleUserAge();

  console.log(r);

  vi.unstubAllEnvs();
});

it("second", () => {
  const r = doubleUserAge();

  console.log(r);
});
```

这里还有`import`导入,这里我们可以使用`vi.stubEnv`或者使用`vi.mock`

```js
import { vi, it, expect } from "vitest";
import { doubleUserAge, doubleUserAgeNew } from "./user";
import { userAge } from "./env";

vi.mock("./env");

it("doubleUserAge", () => {
  vi.stubEnv("VITE_USER_AGE", "99");

  const r = doubleUserAge();

  expect(r).toBe(198);

  vi.unstubAllEnvs();
});

it("doubleUserAgeNew", () => {
  vi.mocked(userAge).mockReturnValue(2);

  const r = doubleUserAgeNew();

  expect(r).toBe(4);
});
```

### 2、全局变量

很简单,通过`process.env`去获取就好

```js
// user.ts
export function doubleUserAge() {
  const userAge = localStorage.getItem("userAge");
  return Number(userAge) * 2;
}

export function doubleInnerWidth() {
  return innerWidth * 2;
}
```

这里使用`vi.stubGlobal`去设置全局变量

```js
import { vi, it, expect } from "vitest";
import { doubleInnerWidth, doubleUserAge } from "./user";

it("doubleUserAge", () => {
  const r = doubleUserAge();

  expect(r).toBe(36);
});

it("double innerWidth", () => {
  // window
  vi.stubGlobal("innerWidth", 200);

  const r = doubleInnerWidth();

  expect(r).toBe(400);
});

```

## 4、依赖注入

首先我们看看两个原则：

依赖倒置原则（Dependency Inversion Principle，简称DIP）是面向对象设计中的一个原则，它是SOLID原则中的一部分。DIP的核心思想是高层模块不应该依赖于低层模块，而是应该依赖于抽象接口。

程序接缝（Seams）是指在软件系统中可以插入变化的地方，也可以理解为在代码中可以进行修改的位置。程序接缝是敏捷开发中的一个重要概念，它有助于提高代码的可测试性、可扩展性和可维护性。

接下来看下面的例子：

`DLL-function`

```js
// readAndProcessFile.ts
export interface FileReader {
  read(filePath: string): string;
}

export function readAndProcessFile(
  filePath: string,
  fileReader: FileReader
): string {
  const content: string = fileReader.read(filePath);
  // 在实际的场景下可能 process 的过程会更复杂一点
  return content + "-> test unit";
}
// index.ts
import { readAndProcessFile, FileReader } from "./readAndProcessFile";
import { readFileSync } from "fs";

class TextFileReader implements FileReader {
  read(filePath: string) {
    return readFileSync(filePath, { encoding: "utf-8" });
  }
}

const result = readAndProcessFile("example.txt", new TextFileReader());

console.log(result);
```

**测试方案**

```js
import { it, expect, describe } from "vitest";
import { readAndProcessFile, FileReader } from "./readAndProcessFile";

describe("di function", () => {
  it("read and process file", () => {
    class StubFileReader implements FileReader {
      read() {
        return "oldTimer";
      }
    }

    const result = readAndProcessFile("./test", new StubFileReader());

    expect(result).toBe("oldTimer-> test unit");
  });
});

```

`DLL-class`:这里分为三种，构造器、属性、以及方法

构造器：

```js
export interface FileReader {
  read(filePath: string): string;
}

// 构造器
export class ReadAndProcessFile {
  private fileReader: FileReader;
  constructor(fileReader: FileReader) {
    // fileReader 是个必选项
    this.fileReader = fileReader;
  }
  run(filePath: string) {
    //     const content = readFileSync(filePath, { encoding: "utf-8" });
    const content = this.fileReader.read(filePath);

    return content + "->unit test";
  }
}
```

```js
import { it, expect, describe } from "vitest";
import { FileReader, ReadAndProcessFile } from "./ReadAndProcessFile";

describe("di - class", () => {
    it("构造器", () => {
      class StubFileReader implements FileReader {
        read(filePath: string): string {
          return "oldTimer";
        }
      }

      const readAndProcessFile = new ReadAndProcessFile(new StubFileReader());

      expect(readAndProcessFile.run("./test")).toBe("oldTimer->unit test");
    });
});

```

属性

```js
export class ReadAndProcessFile {
  run(filePath: string) {
    const content = this.fileReader.read(filePath);
    return content + "->unit test";
  }

  private _fileReader: FileReader;
  get fileReader(): FileReader {
    return this._fileReader;
  }

  set fileReader(fileReader: FileReader) {
    this._fileReader = fileReader;
  }
}
```

```js
  it("属性", () => {
    class StubFileReader implements FileReader {
      read(filePath: string): string {
        return "oldTimer";
      }
    }

    const readAndProcessFile = new ReadAndProcessFile();
    readAndProcessFile.fileReader = new StubFileReader();

    expect(readAndProcessFile.run("./test")).toBe("oldTimer->unit test");
  });
```

方法

```js
export class ReadAndProcessFile {
  run(filePath: string) {
    const content = this._fileReader.read(filePath);
    return content + "->unit test";
  }

  private _fileReader: FileReader;
  setFileReader(fileReader: FileReader) {
    this._fileReader = fileReader;
  }
}
```

```js
  it("方法", () => {
    class StubFileReader implements FileReader {
      read(filePath: string): string {
        return "oldTimer";
      }
    }

    const readAndProcessFile = new ReadAndProcessFile();
    readAndProcessFile.setFileReader(new StubFileReader());

    expect(readAndProcessFile.run("./test")).toBe("oldTimer->unit test");
  });
```

# 十四、行为验证

这里主要讲的是对于函数的调用次数，以及函数参数等验证

这里举得例子是登录接口

```js
import { phoneLogin } from "xxx/api";

const state = {
  tipString: "",
};

export function login(username: string, password: string) {
  phoneLogin(username, password);
}

export function loginV2(username: string, password: string) {
  const isLogin = phoneLogin(username, password);

  if (isLogin) {
    state.tipString = "登录成功拉";
  }
}

export function getTip() {
  return state.tipString;
}
```

接下来看看我们是怎么测试这个登录接口的

```js
import { vi, it, expect, describe } from "vitest";
import { login, loginV2, getTip } from "./login";
import { phoneLogin } from "xxx/api";

// mock
vi.mock("cxr", () => {
  return {
    // phoneLogin: vi.fn().mockReturnValue(true),
    phoneLogin: vi.fn(()=> true)
  };
});

describe("login", () => {
  it("should called login function from cxr  ", async () => {
    login("phone", "jiubugaosuni");

    expect(cxrLogin).toBeCalled();
    // expect(cxrLogin).toBeCalledWith("phone", "jiubugaosuni");
    // expect(cxrLogin).toBeCalledTimes(1);
  });

  it("v2", () => {
    loginV2("phone", "jiubugaosuni");

    expect(phoneLogin).toBeCalled();
    expect(getTip()).toBe("登录成功拉");
  });
});
```

这里使用`vi.mock`去对接口重写，并且使用`toBeCalled`、`toBeCalledWith`、`toBeCalledTimes`等来验证该函数是否调用，调用参数是什么，一共调用了几次。

# 十五、不知道验证什么-完美主义、功能的目的、小步走-TDD思想

TDD（Test-Driven Development）是一种软件开发方法论，它强调在编写代码之前编写测试用例。其核心思想是通过编写测试用例来驱动代码的开发，以确保代码的正确性和可靠性。

我们只需要记住我们的目标是什么，然后小步走的思想，一个一个去完成，不要一开始就想把所有东西都弄好，这是不现实的。TDD的思想可以应用在我们生活之间

比如下面有一个函数，验证是否是http地址，我们需要如何测试呢

```js
// url http
// url https
// url ""
// url "dslkfj"
// url "123"
// url 
export function isHttp(url: string): boolean {
  const pattern = /^http:\/\/www\./;
  return pattern.test(url);
}
```

我们只需要编写最小化的代码，因为不可能完美的去写出每个过程，所以，尽可能的写出我们想到的部分，其他的测试出来的问题，我们再去加就好了，不要被完美主义作祟。

```js
import { describe, it, expect } from "vitest";
import { isHttp } from "./utils";

describe("isHttp", () => {
  it("should return true for the specific case: http://www.baidu.com", () => {
    const url = "http://www.baidu.com";
    expect(isHttp(url)).toBeTruthy();
  });

  it("should return false for non-http URLs", () => {
    const url = "https://www.google.com";
    expect(isHttp(url)).toBeFalsy();
  });
  it("should return false for non-http URLs", () => {
    const url = "";
    expect(isHttp(url)).toBeFalsy();
  });
});
```

# 十六、可预测性-随机数-日期date

**随机数**

这里如何对随机数进行验证呢？因为随机数一直是变化的

```js
/**
 * 基于 Math.random 生成一个随机字符串
 * @param length 字符串长度
 * @returns 生成的随机字符串
 */
export function generateRandomString(length: number): string {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // 生成 0 到字符串长度之间的随机整数
    result += characters.charAt(randomIndex); // 将指定位置上的字符添加到结果字符串中
  }
  return result;
}
```

验证

通过`vi.spyOn`去模拟`Math.random`方法并且固定返回它的值为0.1和0.2

```js
import { vi, it, expect, describe } from "vitest";
import { generateRandomString } from "./random";

describe("Math.random", () => {
  it("should generate random string", () => {
    //     vi.spyOn(Math, "random").mockImplementation(() => {
    //       return 0.1;
    //     });
    vi.spyOn(Math, "random").mockImplementationOnce(() => {
      return 0.1;
    });
    vi.spyOn(Math, "random").mockImplementationOnce(() => {
      return 0.2;
    });

    const result = generateRandomString(2);

    expect(result).toBe("fc");
  });
});
```

**日期函数**

这里如何对日期进行验证呢？因为日期一直是变化的

```js
/**
 * 检测今天是否为周五
 * @returns 如果今天是周五返回 "开心"，否则返回 "不开心"
 */
export function checkFriday(): string {
  const today = new Date();
  console.log(today.getDay());
  if (today.getDay() === 5) {
    return "happy";
  } else {
    return "sad";
  }
}
```

验证

这里使用的是模拟定时器，使用`vi.useFakeTimers()`,注意：这里在测试结束后需要使用`vi.useRealTimers();`移除掉，然后我们使用`vi.setSystemTime(new Date(2023, 3, 21));`去设置系统时间

```js
import { beforeEach, afterEach, vi, it, expect, describe } from "vitest";
import { checkFriday } from "./date";

describe("date", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be happy when it's Friday", () => {
    vi.setSystemTime(new Date(2023, 3, 21));

    const result = checkFriday();

    expect(result).toBe("happy");
  });
  it("should be sad when it's not Friday", () => {
    vi.setSystemTime(new Date(2023, 3, 22));

    const result = checkFriday();

    expect(result).toBe("sad");
  });
  it("third", () => {
    checkFriday();
  });
});

```

# 十七、快速反馈-处理异步代码time、promise

**定时器与延时器**

```js
export function sayHi() {
  setTimeout(() => {
    setInterval(() => {
      console.log("hi");
    }, 100);
  }, 1000);
}
```

```js
export class User {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  fetchData(callback: (data: string) => void, delay: number): void {
    setTimeout(() => {
      const data = `Data for user with id: ${this.id}`;
      callback(data);
    }, delay);
  }

  fetchDataV2(callback: (data: string) => void): void {
    setTimeout(() => {
      const data = `Data for user with id: ${this.id}`;
      callback(data);
    }, 2000);
  }
}
```

验证

这里我们也是使用`vi.useFakeTimers();`去模拟定时器，这里我们有两种方式去进行验证，第一种就是使用`vi.advanceTimersToNextTimer()`，`vi.advanceTimersByTime(1100);`这个是设置定时器的时间,第二种就是使用`vi.spyOn(console, "log");`去模拟打印方法，这种是比较推荐的

```js
import { vi, it, expect, describe } from "vitest";
import { sayHi } from "./setInterval";

describe("setInterval", () => {
  it("should call one", () => {
    vi.useFakeTimers();
    vi.spyOn(console, "log");
    sayHi();
    //     vi.advanceTimersToNextTimer()
    //     vi.advanceTimersToNextTimer()
	//     vi.advanceTimersByTime(1100);

    expect(console.log).toBeCalledWith("hi");
  });
});
```

```js
import { vi, it, expect, describe } from "vitest";
import { User } from "./setTimeout";

describe("setTimeout", () => {
  it("should fetch User data", () => {
    vi.useFakeTimers();
    const user = new User("1");

    const callback = vi.fn();
    user.fetchDataV2(callback);
    // vi.advanceTimersByTime(1000)
    // vi.advanceTimersToNextTimer();

    const userA = new User("1");

    const callbackA = vi.fn();
    userA.fetchDataV2(callbackA);
    // vi.advanceTimersToNextTimer();

    vi.runAllTimers();

    expect(callback).toBeCalledWith("Data for user with id: 1");
    expect(callbackA).toBeCalledWith("Data for user with id: 1");
  });
});
```

**promise**

```js
export class View {
  count: number = 1;
  render() {
    Promise.resolve()
      .then(() => {
        this.count = 2;
      })
      .then(() => {
        this.count = 3;
      });
  }
}

export function fetchUserData() {
  return new Promise((resolve, reject) => {
    resolve("1");
  });
}

export function delay(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok");
    }, time);
  });
}
```

验证

```js
import { vi, it, expect, describe } from "vitest";
import { delay, fetchUserData } from "./index";

describe("Promise", () => {
  it("normal", async () => {
    const result = await fetchUserData();

    expect(result).toBe("1");
  });

  it("delay", async () => {
    vi.useFakeTimers();
    //     vi.advanceTimersToNextTimer()
    //     const result = await delay(1000);
    const result = delay(100);
    vi.advanceTimersToNextTimer();

    expect(result).resolves.toBe("ok");
  });
});
```

第二种是结合`flush-promises`这个库来使用

```js
import { it, expect, describe } from "vitest";
import { View } from "./view";
import flushPromises from "flush-promises";

describe("View", () => {
  it("should change count", async () => {
    const view = new View();

    view.render();
    await flushPromises();

    expect(view.count).toBe(3);
  });
});

```

# 十八、API的多种测试方案

## 1、直接`mock axios`

直接上代码,通过直接对`axios`进行`mock`来定义返回结果---------**不推荐使用**

```ts
import { test, expect, vi } from "vitest";
import { useTodoStore } from "./todo";
import { setActivePinia, createPinia } from "pinia";
import axios from "axios";

vi.mock("axios");

test("add todo", async () => {
  // 准备数据
  vi.mocked(axios.post).mockImplementation((path, { title }: any) => {
    return Promise.resolve({
      data: { data: { todo: { id: 1, title } }, state: 1 },
    });
  });
  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const title = "吃饭";

  // 调用
  await todoStore.addTodo(title);

  // 验证
  expect(todoStore.todos[0].title).toBe(title);
});

test("should not add todo when title is empty string", async () => {
  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const title = "";

  // 调用
  await todoStore.addTodo(title);

  // 验证
  expect(todoStore.todos.length).toBe(0);
});

test("remove todo", async () => {
  vi.mocked(axios.post).mockImplementationOnce((path, { title }: any) => {
    return Promise.resolve({
      data: { data: { todo: { id: 1, title } }, state: 1 },
    });
  });
  vi.mocked(axios.post).mockImplementationOnce((path, { id }: any) => {
    return Promise.resolve({
      data: { data: { id }, state: 1 },
    });
  });

  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const todo = await todoStore.addTodo("吃饭"); // round-trip

  // 调用
  await todoStore.removeTodo(todo!.id);

  // 验证
  expect(todoStore.todos.length).toBe(0);
});

test("should throw error when removed id does not exist ", async () => {
  // 准备数据
  vi.mocked(axios.post).mockImplementationOnce((path, { id }: any) => {
    return Promise.resolve({
      data: { data: null, state: 0 },
    });
  });

  setActivePinia(createPinia());
  const todoStore = useTodoStore();

  expect(async () => {
    // 调用
    await todoStore.removeTodo(2);
    // 抛出一个错误
  }).rejects.toThrowError("id:2 不存在");
});

test("update todo list", async () => {
  const todoList = [{ id: 1, title: "写代码" }];
  vi.mocked(axios.get).mockResolvedValue({ data: { data: { todoList } } });

  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  await todoStore.updateTodoList();

  expect(todoStore.todos[0].title).toBe("写代码");
});

```

## 2、mock中间层

这个的意思指的是，只对行为进行验证，行为产生的结果进行`mock`-----------**推荐使用**

```ts
import { test, expect, vi } from "vitest";
import { useTodoStore } from "./todo";
import { setActivePinia, createPinia } from "pinia";
import { fetchAddTodo, fetchRemoveTodo, fetchTodoList } from "../api";

vi.mock("../api");

// SUT  create list
// create list
// add todo to todos , todos' length is 1
test("should add todo to the list when successful", async () => {
  // 准备数据
  vi.mocked(fetchAddTodo).mockImplementation((title) => {
    return Promise.resolve({
      data: { todo: { id: 1, title } },
      state: 1,
    });
  });
  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const title = "吃饭";

  // 调用
  await todoStore.addTodo(title);

  // 验证
  expect(todoStore.todos[0].title).toBe(title);


});

test("should not be added todo when network is error", async () => {
  // 准备数据
  vi.mocked(fetchAddTodo).mockImplementation((title) => {
    return Promise.reject("network error");
  });
  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const title = "吃饭";

  // 调用
  expect(async () => {
    await todoStore.addTodo(title);
  }).rejects.toThrowError("network error");
});

test("should not add a todo when title is empty", async () => {
  // 准备数据
  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const title = "";

  // 调用
  await todoStore.addTodo(title);

  // 验证
  expect(todoStore.todos.length).toBe(0);
});

test("remove todo when todo is", async () => {
  // 准备数据
  vi.mocked(fetchAddTodo).mockImplementation((title) => {
    return Promise.resolve({
      data: { todo: { id: 1, title } },
      state: 1,
    });
  });
  vi.mocked(fetchRemoveTodo).mockImplementationOnce((id) => {
    return Promise.resolve({
      data: { id },
      state: 1,
    });
  });

  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const todo = await todoStore.addTodo("吃饭"); // round-trip

  // 调用
  await todoStore.removeTodo(todo!.id);

  // 验证
  expect(todoStore.todos.length).toBe(0);
});

test("should throw a error when removed id does not exist", async () => {
  // 准备数据
  vi.mocked(fetchRemoveTodo).mockImplementationOnce(() => {
    return Promise.resolve({
      data: null,
      state: 0,
    });
  });

  setActivePinia(createPinia());
  const todoStore = useTodoStore();

  // 调用
  expect(async () => {
    await todoStore.removeTodo(2);
  }).rejects.toThrowError("id:2 does not exist");
});

test("update todo list", async () => {
  const todoList = [{ id: 1, title: "写代码" }];
  vi.mocked(fetchTodoList).mockResolvedValue({ data: { todoList } });

  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  await todoStore.updateTodoList();

  expect(todoStore.todos[0].title).toBe("写代码");
});

```

## 3、使用mock server worker

这里指的是使用`msw`这个库来mock返回结果，相当于利用中间件去测试

缺点：就是需要去学习新的库，不太推荐使用

```ts
import { beforeAll, afterEach, afterAll, test, expect} from "vitest";
import { useTodoStore } from "./todo";
import { setActivePinia, createPinia } from "pinia";
import { server } from "../mocks/server";
import { mockAddTodo, mockRemoveTodo, mockTodoList } from "../mocks/handlers";


test.todo("sad path")

test("add todo", async () => {
  // koa express
  server.use(mockAddTodo());

  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const title = "吃饭";

  // 调用
  await todoStore.addTodo(title);

  // 验证
  expect(todoStore.todos[0].title).toBe(title);
});

test("remove todo", async () => {
  server.use(mockAddTodo(), mockRemoveTodo());

  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  const todo = await todoStore.addTodo("吃饭"); // round-trip

  // 调用
  await todoStore.removeTodo(todo!.id);

  // 验证
  expect(todoStore.todos.length).toBe(0);
});

test("update todo list", async () => {
  const todoList = [{ id: 1, title: "写代码" }];
  server.use(mockTodoList(todoList));

  setActivePinia(createPinia());
  const todoStore = useTodoStore();
  await todoStore.updateTodoList();

  expect(todoStore.todos[0].title).toBe("写代码");
});

```

# 十九、参数化验证

> 提供在多个测试case中复用相同的测试逻辑的方法

比如我们想去验证一个正则表达式

```ts
export function emailValidator(email: string): boolean {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
}

```

可能我们的测试case非常多,可以看到非常多重复的case

```ts
import { emailValidator } from "./emailValidator"
import { it, expect, describe } from "vitest"

describe("emailValidator", () => {
  it("should return true for valid email", () => {
    const email = "valid-email@example.com"
    expect(emailValidator(email)).toBe(true)
  })

  it("should return false for invalid email without domain extension", () => {
    const email = "invalid.email@example"
    expect(emailValidator(email)).toBe(false)
  })

  it("should return false for invalid email with extra dot at the end", () => {
    const email = "another.invalid.email@example."
    expect(emailValidator(email)).toBe(false)
  })

  it("should return false for invalid email with missing '@'", () => {
    const email = "yet.another.invalid.email.example.com"
    expect(emailValidator(email)).toBe(false)
  })
})

```

解决办法：我们可以利用工具提供的方法

```js
import { emailValidator } from "./emailValidator"
import { it, expect, describe } from "vitest"

describe("emailValidator", () => {
  it.each([
    ["valid-email@example.com", true],
    ["invalid.email@example", false],
    ["another.invalid.email@example.", false],
    ["yet.another.invalid.email.example.com", false],
  ])("should return %s when email is %s", (email, expected) => {
    expect(emailValidator(email)).toBe(expected)
  })

  it.each([{ email: "valid-email@example.com", expected: true }])(
    "should return $email when email is $expected",
    ({ email, expected }) => {
      console.log(email, expected)
      expect(emailValidator(email)).toBe(expected)
    }
  )

  it.each`
    email                        | expected
    ${"valid-email@example.com"} | ${true}
    ${"invalid.email@example"}   | ${false}
  `("should return $email when email is $expected", ({ email, expected }) => {
    console.log(email, expected)
    expect(emailValidator(email)).toBe(expected)
  })

  it.each`
    email             | expected
    ${{ a: "aaaaa" }} | ${true}
    ${[]}             | ${true}
    ${false}          | ${true}
  `("should return $email.a when email is $expected", ({ email, expected }) => {
    console.log(email, expected)
    expect(false).toBe(true)
    //     expect(emailValidator(email)).toBe(expected);
  })
})

```

我们使用`it.each`，并且使用模版字符串的语法，在参数中，我们还可以使用`$email.a`去获取参数，其中第三种和第四种方法是最佳实践

第一种方法因为在执行过程中，不太好查看错误信息，所以不推荐使用

# 二十七、`Vitest`实战之`Vue`

# 二十八、`Vitest`实战 - 推箱子
