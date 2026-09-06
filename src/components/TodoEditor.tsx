"use client";

import { useState } from "react";
import Button from "./html/Button";
import Input from "./html/Input";

export default function TodoEditor({
  addTodo,
}: {
  addTodo: (title: string) => void;
}) {
  const [text, setText] = useState("");
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addTodo(text);
    setText("");
  };
  return (
    <form className="todo__form" onSubmit={handleSubmit}>
      <div className="todo__editor">
        <Input
          value={text}
          type="text"
          className="todo__input"
          placeholder="Enter Todo List"
          onChange={(e) => setText(e.target.value)}
        />
        <Button className="todo__button" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}
