import Button from "./html/Button";
import Checkbox from "./html/Checkbox";
import SvgClose from "./svg/SvgClose";
import SvgPencil from "./svg/SvgPencil";
import Input from "./html/Input";
import { Todo } from "@/types/todoType";
import { useState } from "react";

export default function TodoListItem({
  todo,
  toggleTodo,
  updateTodo,
  deleteTodo,
}: {
  todo: Todo;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");

  const updateHandler = () => {
    setIsEditing((isEditing) => !isEditing);
    setEditedTitle(editedTitle === "" ? todo.title : editedTitle);
    if (editedTitle !== "" && editedTitle !== todo.title) {
      updateTodo(todo.id, editedTitle);
    }
  };
  return (
    // 할 일이 완료되면 .todo__item--complete 추가
    <li className={`todo__item`}>
      {!isEditing && (
        <Checkbox
          checked={todo.isComplete}
          onChange={() => toggleTodo(todo.id)}
          parentClassName="todo__checkbox-group"
          type="checkbox"
          className="todo__checkbox"
        >
          {todo.title}
        </Checkbox>
      )}
      {/* 할 일을 수정할 때만 노출 (.todo__checkbox-group은 비노출) */}
      {isEditing && (
        <Input
          type="text"
          className="todo__modify-input"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
      )}
      <div className="todo__button-group">
        <Button className="todo__action-button" onClick={updateHandler}>
          <SvgPencil />
        </Button>
        <Button
          className="todo__action-button"
          onClick={() => deleteTodo(todo.id)}
        >
          <SvgClose />
        </Button>
      </div>
    </li>
  );
}
