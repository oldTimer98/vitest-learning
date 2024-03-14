import { describe, expect, it } from 'vitest';
import { addTodo, type Todo, todos, fighting } from '..';
describe('in-line', () => {

  it('should add a todo', () => {
    // 低层次的代码
    const todo: Todo = {
      title: "吃饭",
      content: "今天要和小明去吃饭",
    }

    addTodo(todo)

    expect(todos[0]).equal(todo)
  })

  it(" addTodo with top command", () => {
    // given
    const todo = {
      title: "top: 吃饭",
      content: "今天要和小明去吃饭",
    };

    // when
    addTodo(todo);

    // then
    expect(todos[0].title).toEqual("吃饭");
  });

  it(" addTodo with reverse command", () => {
    // given
    const todo = {
      title: "reverse: 吃饭",
      content: "今天要和小明去吃饭",
    };

    // when
    addTodo(todo);

    // then
    expect(todos[0].title).toEqual("饭吃");
  });
})
