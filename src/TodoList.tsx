import Button from '@mui/material/Button';
import { ChangeEvent, memo, useCallback } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValueType, TaskType } from "./App";
import './App.css';
import EditableSpan from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import TaskItem from './TaskItem';
import TaskItemWithRedux from './TaskItemWithRedux';

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
   
    return (
      
      <TaskItemWithRedux key={t.id} isChecked={t.isDone} oldtitle={t.title} 
      taskId={t.id} todolistId={todolistId}
      taskClassName={isDoneClassName}
      />
      /* <TaskItem key={t.id} isChecked={t.isDone} oldtitle={t.title} 
      id={t.id}
      onChangeStatus={onChangeStatusHandler}
      removeTaskHandler={removeTaskHandler}
      updateTaskTitle={updateTaskTitleHandler}
      taskClassName={isDoneClassName}
      /> */
      
      );
  });

  const addTaskHandler = useCallback((title: string) => {
    addTask(todolistId, title)
  },[addTask, todolistId])

  const updateTodoListHandler = (newTitle: string) => {
    updateTodoList(todolistId, newTitle)
  }

  const onDeleteTodoListHndler = () => deleteTodoList(todolistId)

  //const onChangeFilterHandler = useCallback((id: string, filterValue: FilterValueType) => changeFilter(id ,filterValue), [changeFilter, todolistId])

  const onChangeFilterAll = useCallback(() => changeFilter(todolistId, 'All'), [changeFilter, todolistId])
  const onChangeFilterActive = useCallback(() => changeFilter(todolistId,'Active'), [changeFilter, todolistId])
  const onChangeFilterCompleted = useCallback(() => changeFilter(todolistId, 'Completed'), [changeFilter, todolistId])

  return (
    <div>
      
      <h3><EditableSpan Oldtitle={title} callback={updateTodoListHandler}/>
      <IconButton aria-label="delete" onClick={onDeleteTodoListHndler}>
        <DeleteIcon />
      </IconButton> </h3> 
      <AddItemForm callBack={addTaskHandler}/>

      <ul>{tasksItems}</ul>
      <div>
      {/* <Button variant={filter === 'All' ? 'contained' : undefined} onClick={() => onChangeFilterHandler(todolistId ,'All')} color='success'>
        All
      </Button> */}
      <ButtonWithMemo title='All' filter={filter} onClick={onChangeFilterAll} color='success'/>
      {/* <Button variant={filter === 'Active' ? 'contained' : undefined} onClick={() => onChangeFilterHandler(todolistId ,'Active')} color='error'>
      Active
      </Button> */}
        <ButtonWithMemo title='Active' filter={filter} onClick={onChangeFilterActive} color='error'/>
{/* 
      <Button variant={filter === 'Completed' ? 'contained' : undefined} onClick={() => onChangeFilterHandler(todolistId ,'Completed')} color='secondary'>Completed</Button>
 */}      
         <ButtonWithMemo title='Completed' filter={filter} onClick={onChangeFilterCompleted} color='secondary'/>

    </div>
    </div>
  );
};

type ButtonPropsType = {
  title: string
  filter: FilterValueType
  onClick: () => void
  color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"
}


const ButtonWithMemo = memo(({title, filter, onClick, color}: ButtonPropsType) => {
  console.log('btn' + '' + title);
  
  return <Button variant={filter === title ? 'contained' : undefined} onClick={() => onClick()} color={color}>
  {title}
</Button>
})

export default TodoList;