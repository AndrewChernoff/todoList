import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import TodoList from "./TodoList";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterType = "All" | "Active" | "Completed";

function App() {
  let [tasks, setTasks] = useState<TaskType[]>([
    { id: uuidv4(), title: "HTML & CSS", isDone: true },
    { id: uuidv4(), title: "ES6 & TS", isDone: true },
    { id: uuidv4(), title: "REACT", isDone: true },
    { id: uuidv4(), title: "MobX", isDone: false },
  ]);  

  const [filter, setFilter] = useState<FilterType>("All");

  const todoListTitle_1: string = "What to learn";

  const removeTask = (taskId: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
  };

  const addTask = (taskName: string) => {
    const newTask: TaskType = {
      id: uuidv4(), title: taskName, isDone: false
    }
    setTasks([newTask,...tasks])
  }

  const onChangeStatus = (taskId: string, isChecked: boolean) => {
    setTasks(tasks.map(el => el.id === taskId? {...el, isDone: isChecked} : el))
  }

  const getFilteredTasksForRender = (): TaskType[] => {
    switch (filter) {
      case "All":
        return tasks;

      case "Active":
        return tasks.filter((t) => !t.isDone);
      case "Completed":
        return tasks.filter((t) => t.isDone);
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
        addTask={addTask}
        onChangeStatus={onChangeStatus}
      />
    </div>
  );
}

export default App;
