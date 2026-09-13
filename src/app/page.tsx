"use client";

import TodoEditor from "@/components/TodoEditor";
import TodoHeader from "@/components/TodoHeader";
import TodoList from "@/components/TodoList";
import { useTodoStore } from "@/hooks/useTodoStore";
import { useIsMounted } from "@/hooks/useIsMounted";

export default function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodoStore();

  const mounted = useIsMounted();

  return (
    <>
      {mounted && (
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
      )}{" "}
    </>
  );
}
