import { ChangeEvent, useState } from "react";
import { FilterType, TaskType } from "./App";
import './App.css';

type TodoListProps = {
  title: string;
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  setFilter: (value: FilterType) => void
  filter: FilterType
  addTask: (value: string) => void
  onChangeStatus: (taskId: string, isChecked: boolean) => void
};


const TodoList = ({ title, tasks, removeTask, setFilter, filter, addTask, onChangeStatus }: TodoListProps) => {

  const [taskName, setTaskName] = useState('')
  const [error, setError] = useState<boolean>(false)  

  const onAddTask = () => {
    const trimmedTask = taskName.trim();
    if (trimmedTask && trimmedTask.length > 0 ) {
       addTask(trimmedTask)
     } else {
      setError(true);
     }
    setTaskName('');
  }

  const getTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setTaskName(e.currentTarget.value)
  }

  const doFilterAction = (filterValue: FilterType) =>  () => setFilter(filterValue);


  const tasksItems = tasks.map((t) => {

    const isDoneClassName = t.isDone ? 'isDone' : 'notIsDone';

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) =>onChangeStatus(t.id, e.currentTarget.checked)}/>
        <span className={isDoneClassName}>{t.title}</span> 
        <button onClick={() => removeTask(t.id)}>X</button>
      </li>
    );
  });

  const inputClassName = error ? 'erorInput' : '';

  const errorMessage = error && <p style={{color: 'hotpink', margin: 0}}>Please enter some title</p>

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={taskName} className={inputClassName}  onChange={getTaskValue}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => e.key === 'Enter' && onAddTask()}/>
        <button onClick={onAddTask} /* disabled={taskName.trim().length > 0 ? false : true} */>+</button>
      </div>

      {errorMessage}
      <ul>{tasksItems}</ul>
      <div>
        <button className={filter === 'All' ? 'activeFilter' : ''} onClick={doFilterAction('All')}>All</button>
        <button className={filter === 'Active' ? 'activeFilter' : ''} onClick={doFilterAction('Active')}>Active</button>
        <button className={filter === 'Completed' ? 'activeFilter' : ''} onClick={doFilterAction('Completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
