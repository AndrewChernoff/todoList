import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import AddItemForm from "./AddItemForm";
import "./App.css";
import ButtonAppBar from "./ButtonAppBar";
import { AppStateType } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer } from "./state/taskReducer";
import { addTodoListAC, changeFilterAC, removeTodoListAC, TodoListActionType, todoListReducer, updateTodoListTitleAC } from "./state/todoListReducer";
import TodoList from "./TodoList";

export type TasksType = {
  [key: string] : TaskType[]
}

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}

export type FilterValueType = "All" | "Active" | "Completed";

function AppWithRedux() {

  let todolistID1 = uuidv4()
  let todolistID2 = uuidv4()

  let todolists = useSelector<AppStateType, TodolistsType[]>(state => state.todoLists)
  let tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

  const dispatch = useDispatch()

  const removeTask = useCallback((todoListId: string,taskId: string) => {
    dispatch(removeTaskAC(todoListId,taskId))  
  }, [dispatch]);

  const addTask = useCallback((todoListId: string,taskName: string) => {
    dispatch(addTaskAC(todoListId,taskName))
  }, [dispatch])

  const updateTask = useCallback((todolistID: string, taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
  }, [dispatch])

  const onChangeStatus = useCallback((todoListId: string, taskId: string, isChecked: boolean) => {
    dispatch(changeTaskStatusAC(todoListId, taskId, isChecked))
  }, [dispatch])

  const changeFilter = useCallback((todoListsId: string, filterValue: FilterValueType) => {
    dispatch(changeFilterAC(todoListsId, filterValue))
  }, [dispatch])

  const deleteTodoList = useCallback((todoListId: string) => { 
    dispatch(removeTodoListAC(todoListId))
  }, [dispatch])

   const addTodoList = useCallback((newTitle: string) => {
    let id = uuidv4()
    dispatch(addTodoListAC(newTitle, id))
  }, [dispatch]) 


  const updateTodoList = useCallback((todoListId: string, newTitle: string) => {
    dispatch(updateTodoListTitleAC(todoListId, newTitle))
  }, [dispatch])

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm callBack={addTodoList}/>
      </Grid>

      <Grid container spacing={3}>
     {todolists.map((el) => {  
      return (
        <Grid item key={el.id}>
          <Paper style={{padding: '10px'}}> 
          <TodoList
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={tasks[el.id]}
            removeTask={removeTask}
            filter={el.filter}
            changeFilter={changeFilter}
            addTask={addTask}
            onChangeStatus={onChangeStatus}
            deleteTodoList={deleteTodoList}
            updateTask={updateTask}
            updateTodoList={updateTodoList}
          />
          </Paper>
        </Grid>
      );
     })} 
     </Grid>
     </Container>
    </div>
  );
}

export default AppWithRedux;