import Button from '@mui/material/Button';
import { ChangeEvent, useCallback } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValueType, TaskType } from "./App";
import './App.css';
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TaskItem from './TaskItem';

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

  const filteredTasksForRender = (): TaskType[] => {
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

    const onChangeStatusHandler = useCallback((status: boolean, taskId: string) => onChangeStatus(todolistId, taskId, status), [/* onChangeStatus, todolistId */])
    const removeTaskHandler = useCallback((taskId: string) => removeTask(todolistId,taskId), [/* removeTask, todolistId */])
    const updateTaskTitleHandler = useCallback((newTitle: string, taskId: string) => updateTaskHandler(taskId, newTitle), [/* updateTaskHandler */])


  const tasksItems = filteredTasksForRender().map((t) => {

    const isDoneClassName = t.isDone ? 'isDone' : 'notIsDone';
    /* const onChangeStatusHandler = useCallback((status: boolean) => onChangeStatus(todolistId,t.id, status), [onChangeStatus, todolistId])
    const removeTaskHandler = useCallback(() => removeTask(todolistId,t.id), [removeTask,todolistId])
    const updateTaskTitleHandler = useCallback((newTitle: string) => updateTaskHandler(t.id, newTitle), [updateTaskHandler])
 */
    return (
      /* <li key={t.id}>
        <Checkbox size={'small'} checked={t.isDone} onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeStatus(todolistId,t.id, e.currentTarget.checked)} />
        <EditableSpan Oldtitle={t.title} callback={(newTitle) => updateTaskHandler(t.id, newTitle)} className={isDoneClassName}/>

        <IconButton aria-label="delete" onClick={() => removeTask(todolistId,t.id)}>
        <DeleteIcon />
      </IconButton>
      </li> */
      
      <TaskItem key={t.id} isChecked={t.isDone} oldtitle={t.title} 
      id={t.id}
      onChangeStatus={onChangeStatusHandler}
      removeTaskHandler={removeTaskHandler}
      updateTaskTitle={updateTaskTitleHandler}
      taskClassName={isDoneClassName}
      />
      
      );
  });

  const addTaskHandler = useCallback((title: string) => {
    addTask(todolistId, title)
  },[addTask, todolistId])

  const updateTodoListHandler = (newTitle: string) => {
    updateTodoList(todolistId, newTitle)
  }

  const onDeleteTodoListHndler = () => deleteTodoList(todolistId)

  const onChangeFilterHandler = (id: string, filterValue: FilterValueType) => changeFilter(id ,filterValue)

  return (
    <div>
      
      <h3><EditableSpan Oldtitle={title} callback={updateTodoListHandler}/>
      <IconButton aria-label="delete" onClick={onDeleteTodoListHndler}>
        <DeleteIcon />
      </IconButton> </h3> 
      <AddItemForm callBack={addTaskHandler}/>

      <ul>{tasksItems}</ul>
      <div>
      <Button variant={filter === 'All' ? 'contained' : undefined} onClick={() => onChangeFilterHandler(todolistId ,'All')} color='success'>
        All
      </Button>
      <Button variant={filter === 'Active' ? 'contained' : undefined} onClick={() => onChangeFilterHandler(todolistId ,'Active')} color='error'>
      Active
      </Button>
      <Button variant={filter === 'Completed' ? 'contained' : undefined} onClick={() => onChangeFilterHandler(todolistId ,'Completed')} color='secondary'>Completed</Button>
      </div>
    </div>
  );
};

export default TodoList;