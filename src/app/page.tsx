"use client";

import { v4 as uuidv4 } from "uuid";
import TodoEditor from "@/components/TodoEditor";
import TodoHeader from "@/components/TodoHeader";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todoType";
import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    setTodos((todos) => [
      ...todos,
      {
        id: uuidv4(),
        title,
        isComplete: false,
        completedDate: new Date(),
      },
    ]);
  };

  const deleteTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: string, title: string) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const toggleTodo = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  };

  return (
    <div className="todo">
      {/* 할 일 헤더 */}
      <TodoHeader />
      {/* 할 일 등록 */}
      <TodoEditor addTodo={addTodo} />
      {/* 할 일 목록 */}
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}
