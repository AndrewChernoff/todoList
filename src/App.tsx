import React, { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

export type FilterType = "All" | "Active" | "Completed";

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, title: "HTML & CSS", isDone: true },
    { id: 2, title: "ES6 & TS", isDone: true },
    { id: 3, title: "REACT", isDone: true },
    { id: 4, title: "MobX", isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterType>("All");

  const todoListTitle_1: string = "What to learn";

  const removeTask = (taskId: number) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
  };

  const getFilteredTasksForRender = (): TaskType[] => {
    switch (filter) {
      case "All":
        return tasks;

      case "Active":
        return tasks.filter((t) => t.isDone === false);
      case "Completed":
        return tasks.filter((t) => t.isDone === true);
      default:
        return tasks;
    }
  };

  return (
    <div className="App">
      <TodoList
        title={todoListTitle_1}
        tasks={getFilteredTasksForRender()}
        removeTask={removeTask}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;
