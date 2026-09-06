import TodoListItem from "./TodoListItem";
import TodoListItemEmpty from "./TodoListItemEmpty";

export default function TodoList() {
  console.log("TodoList Render");
  return (
    <ul className="todo__list">
      {/* 할 일 목록이 없을 때  */}
      {/* <TodoListItemEmpty /> */}
      {/* 할 일 목록이 있을 때 */}
      <TodoListItem />
    </ul>
  );
}
