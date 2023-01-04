import { ChangeEvent, useState } from "react";
import { FilterValueType, TaskType } from "./App";
import './App.css';

type TodoListProps = {
  title: string;
  tasks: Array<TaskType>
  removeTask: (todoListId: string ,taskId: string) => void
  changeFilter: ( todolistId: string,value: FilterValueType) => void
  filter: FilterValueType
  addTask: (todoListId: string, value: string) => void
  onChangeStatus: (todoListId: string,taskId: string, isChecked: boolean) => void
  todolistId: string
  deleteTodoList: (todolistId: string) => void
};


const TodoList = ({ title, tasks, todolistId, removeTask, changeFilter, filter, addTask, onChangeStatus, deleteTodoList }: TodoListProps) => {

  const [taskName, setTaskName] = useState('')
  const [error, setError] = useState<boolean>(false)  

  const onAddTask = () => {
    const trimmedTask = taskName.trim();
    if (trimmedTask && trimmedTask.length > 0 ) {
       addTask(todolistId, trimmedTask)
     } else {
      setError(true);
     }
    setTaskName('');
  }

  const getTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setTaskName(e.currentTarget.value)
  }

  //const doFilterAction = (filterValue: FilterValueType) =>  () => changeFilter(todolistId ,filterValue);

  const tasksItems = tasks.map((t) => {

    const isDoneClassName = t.isDone ? 'isDone' : 'notIsDone';

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) =>onChangeStatus(todolistId,t.id, e.currentTarget.checked)}/>
        <span className={isDoneClassName}>{t.title}</span> 
        <button onClick={() => removeTask(todolistId,t.id)}>X</button>
      </li>
    );
  });

  const inputClassName = error ? 'erorInput' : '';

  const errorMessage = error && <p style={{color: 'hotpink', margin: 0}}>Please enter some title</p>

  return (
    <div>
      
      <h3>{title} <button onClick={() => deleteTodoList(todolistId)}>X</button> </h3> 
      <div>
        
        <input value={taskName} className={inputClassName}  onChange={getTaskValue}
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => e.key === 'Enter' && onAddTask()}/>
        <button onClick={onAddTask} /* disabled={taskName.trim().length > 0 ? false : true} */>+</button>
      </div>

      {errorMessage}
      <ul>{tasksItems}</ul>
      <div>
        <button className={filter === 'All' ? 'activeFilter' : ''} onClick={() =>changeFilter(todolistId ,'All')}>All</button>
        <button className={filter === 'Active' ? 'activeFilter' : ''} onClick={() =>changeFilter(todolistId ,'Active')}>Active</button>
        <button className={filter === 'Completed' ? 'activeFilter' : ''} onClick={() => changeFilter(todolistId ,'Completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;