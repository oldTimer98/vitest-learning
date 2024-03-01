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

## 1、`javascript debug terminal`

通过`vscode`的自带的调试终端进行测试

![image-20240301101509725](https://gitee.com/nest-of-old-time/picture/raw/master/typora/202403011015816.png)

## 2、`run and debug` `推荐`

通过创建`launch.json`文件去运行调试

![image-20240301101635122](https://gitee.com/nest-of-old-time/picture/raw/master/typora/202403011016280.png)

## 3、`vitest plugins` `推荐`

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

# 十、`Vitest` 对比 `Jest` 

## 1、对比

`vitest:`维护的时间更勤，且完全拥抱`ts`，并且和`vite`配置可以共用一套，且和`vue`搭配效果更好

`jest:`维护时间不勤，并配置困难，多套环境不能共用

## 2、项目使用的是 `jest` ，但是你讲的是 `vitest` ，如何做知识的迁移

`vitest`对于`jest`的`api`做了完全兼容，可以放心使用，除了某些区别：

- Jest 默认启用[全局 API](https://jestjs.io/zh-Hans/docs/api)。然而 `Vitest` 没有。你既可以通过 [`globals` 配置选项](https://cn.vitest.dev/config/#globals)启用全局 API，也可以通过更新你的代码以便使用来自 `vitest` 模块的导入。
- 等等......**具体可以查看官方文档**

# 十一、实现一个自己的 `mini-test-runner`

## 1、目标

- 通过自己实现一个 `mini-test-runner` 来理解测试框架的 `api` 使用

## 2、实现

- 首先模拟`vitest`的方法，例如`test/it`,`describe`,`expect`,生命周期函数等

```js
// 1.spec.js
import { test } from "./core.js"

test("first test case", () => {
  console.log("1. first test case");
});

test("second test case", () => {
  console.log("2. second test case");
});
```

```js
// core.js

```

