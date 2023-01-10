import { ChangeEvent, useState } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValueType, TaskType } from "./App";
import './App.css';
import EditableSpan from "./EditableSpan";

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
  updateTask: (todolistID: string, taskId: string,title: string) => void
  updateTodoList: (todoListId: string, newTitle: string) => void
};


const TodoList = ({ title, tasks, todolistId, removeTask, changeFilter, filter, addTask, onChangeStatus, deleteTodoList, updateTask, updateTodoList }: TodoListProps) => {

  const updateTaskHandler = (tID: string, newTitle: string) => {
    updateTask(todolistId, tID, newTitle)
  }

  const tasksItems = tasks.map((t) => {

    const isDoneClassName = t.isDone ? 'isDone' : 'notIsDone';
    
    /* const updateTaskHandler = (newTitle: string) => {
      updateTask(todolistId, t.id, newTitle)
    } !!!!*/

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) =>onChangeStatus(todolistId,t.id, e.currentTarget.checked)}/>
        <EditableSpan Oldtitle={t.title} callback={(newTitle) => updateTaskHandler(t.id, newTitle)}/>

        {/* <span className={isDoneClassName}>{t.title}</span> */} 
        <button onClick={() => removeTask(todolistId,t.id)}>X</button>
      </li>
    );
  });

  const addTaskHandler = (title: string) => {
    addTask(todolistId, title)
  }

  const updateTodoListHandler = (newTitle: string) => {
    updateTodoList(todolistId, newTitle)
  }

  return (
    <div>
      
      <h3><EditableSpan Oldtitle={title} callback={updateTodoListHandler}/> <button onClick={() => deleteTodoList(todolistId)}>X</button> </h3> 
      <AddItemForm callBack={addTaskHandler}/>

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