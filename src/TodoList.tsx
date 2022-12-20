import { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "./App";

type TodoListProps = {
  title: string;
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  setFilter: (value: FilterType) => void
  filter: string
  addTask: (value: string) => void
};




const TodoList = ({ title, tasks, removeTask, setFilter, filter, addTask }: TodoListProps) => {

  const [taskName, setTaskName] = useState('')
  

  const onAddTask = () => {
    addTask(taskName);
    setTaskName('');
  }

  const getTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.currentTarget.value)
  }

  const doFilterAction = (filterValue: FilterType) =>  () => setFilter(filterValue);

  const tasksItems = tasks.map((t) => {
    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span> 
        <button onClick={() => removeTask(t.id)}>X</button>
      </li>
    );
  });

  

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskName} onChange={getTaskValue}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => e.key === 'Enter' && onAddTask()}/>
        <button onClick={onAddTask}>+</button>
      </div>
      <ul>{tasksItems}</ul>
      <div>
        <button onClick={doFilterAction('All')}>All</button>
        <button onClick={doFilterAction('Active')}>Active</button>
        <button onClick={doFilterAction('Completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
