import { FilterType, TaskType } from "./App";

type TodoListProps = {
  title: string;
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  setFilter: (value: FilterType) => void
  filter: string
};



const TodoList = ({ title, tasks, removeTask, setFilter, filter }: TodoListProps) => {
  
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
        <input />
        <button>+</button>
      </div>
      <ul>{tasksItems}</ul>
      <div>
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
