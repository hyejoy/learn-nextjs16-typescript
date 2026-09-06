"use client";

import { Todo } from "@/types/todoType";
import TodoListItem from "./TodoListItem";
import TodoListItemEmpty from "./TodoListItemEmpty";

export default function TodoList({
  todos,
  toggleTodo,
  updateTodo,
  deleteTodo,
}: {
  todos: Todo[];

  toggleTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
}) {
  console.log("TodoList Render");
  return (
    <ul className="todo__list">
      {/* 할 일 목록이 없을 때  */}
      {todos.length === 0 && <TodoListItemEmpty />}
      {/* 할 일 목록이 있을 때 */}
      {todos.length > 0 &&
        todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
    </ul>
  );
}
