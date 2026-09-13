import { v4 as uuidv4 } from "uuid";
import { Todo } from "@/types/todoType";
import { useMemo, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  // 외부 스토리지 저장소의 값이 변경되면 호출되는 이벤트 (자기자신 브라우저 감지는 못함, 다른탭이나 다른 브라우저에 있는 이벤트만 감지할 수 있음)
  window.addEventListener("storage", callback);
  window.addEventListener("todo-storage", callback); // 자기 자신의 브라우저에서 발생하는 이벤트 감지를 위해 생성

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("todo-storage", callback);
  };
};

// 외부 저장소가 변경되었을때 실행될 로직 작성
const getSnapshot = () => localStorage.getItem("todos") || "[]";

// 서버에서 실행되는건데 서버에 접근할 수 없는 상황이라 빈 JSON 배열을 리턴하도록 코드를 작성
const getServerSnapshot = () => "[]";

export function useTodoStore() {
  const todosRaw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const todos: Todo[] = useMemo(() => JSON.parse(todosRaw), [todosRaw]);

  const setStorage = (nextTodos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(nextTodos));
    window.dispatchEvent(new Event("todo-storage"));
  };

  const addTodo = (title: string) => {
    setStorage([
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
    setStorage(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: string, title: string) => {
    setStorage(
      todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    );
  };

  const toggleTodo = (id: string) => {
    setStorage(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  };

  return { todos, addTodo, updateTodo, deleteTodo, toggleTodo };
}
