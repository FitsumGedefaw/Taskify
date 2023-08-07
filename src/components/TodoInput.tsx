import React, { useRef, useState } from "react";
import "./styles.css";
import Todo from "../models/Todo";

interface _props {
  setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoInput: React.FC<_props> = ({setTodos}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [todo, setTodo] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos((prev) => {
      const newTodo = {
        id: Date.now(),
        text: todo,
        isDone: false   
      }
      return [newTodo, ...prev]
    })
    setTodo("");
    inputRef.current?.blur();
  };

  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="Enter a Task"
        value={todo}
        ref={inputRef}
        onChange={(e) => setTodo(e.target.value)}
        className="input__box"
      />
      <button type="submit" className="input_submit">
        GO
      </button>
    </form>
  );
};

export default TodoInput;
