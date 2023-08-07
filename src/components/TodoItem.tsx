import React, { useEffect, useRef, useState } from "react";
import Todo from "../models/Todo";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

interface _props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const TodoItem: React.FC<_props> = ({
  todo,
  setTodos,
  index,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEditing]);

  const handleDone = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        id === todo.id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => id !== todo.id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: editedTodo } : todo
      )
    );
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="todos__single"
          onSubmit={(e) => handleEdit(e, todo.id)}
        >
          {isEditing ? (
            <input
              value={editedTodo}
              ref={inputRef}
              onChange={(e) => setEditedTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.text}</s>
          ) : (
            <span className="todos__single--text">{todo.text}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!isEditing && !todo.isDone) {
                  setIsEditing(true);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
