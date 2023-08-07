import React, { useState } from "react";
import "./App.css";
import TodoInput from "./components/TodoInput";
import Todo from "./models/Todo";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const {source, destination} = result;

    if (!destination){
      return
    }
    if(source.droppableId === destination.droppableId && source.index === destination.index){
      return
    }
    
    let add;
    let active = todos;
    let complete = completedTodos;
    // Source Logic
    if (source.droppableId === "todos") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "todos") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <TodoInput setTodos={setTodos} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  );
};

export default App;
