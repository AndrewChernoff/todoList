import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { Reducer, useReducer, useState } from "react";
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
   /* let [todolists, dispatchTodolists] = useReducer<Reducer<TodolistsType[], TodoListActionType>>(
    todoListReducer,
    [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]
)

let [tasks, dispatchTasks] = useReducer(
    taskReducer,
    {
  [todolistID1]: [
      {id: uuidv4(), title: 'HTML&CSS', isDone: true},
      {id: uuidv4(), title: 'JS', isDone: true},
      {id: uuidv4(), title: 'ReactJS', isDone: false},

  ],
  [todolistID2]: [
      {id: uuidv4(), title: 'Rest API', isDone: true},
      {id: uuidv4(), title: 'GraphQL', isDone: false},
  ]
}) */

  const removeTask = (todoListId: string,taskId: string) => {
    dispatch(removeTaskAC(todoListId,taskId))  
};

   const addTask = (todoListId: string,taskName: string) => {
    dispatch(addTaskAC(todoListId,taskName))
  }

  const updateTask = (todolistID: string, taskId: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
}

  const onChangeStatus = (todoListId: string, taskId: string, isChecked: boolean) => {
    dispatch(changeTaskStatusAC(todoListId, taskId, isChecked))
}

  const changeFilter = (todoListsId: string, filterValue: FilterValueType) => {
    dispatch(changeFilterAC(todoListsId, filterValue))
  }

  const deleteTodoList = (todoListId: string) => { 
    dispatch(removeTodoListAC(todoListId))
  }

  const addTodoList = (newTitle: string) => {
    let id = uuidv4()
    dispatch(addTodoListAC(newTitle, id))
  }

  const updateTodoList = (todoListId: string, newTitle: string) => {
    dispatch(updateTodoListTitleAC(todoListId, newTitle))
 }

  return (
    <div className="App">
      <ButtonAppBar />
      <Container fixed>
      <Grid container style={{padding: '20px'}}>
        <AddItemForm callBack={addTodoList}/>
      </Grid>

      <Grid container spacing={3}>
     {todolists.map((el) => {
         const getFilteredTasksForRender = (): TaskType[] => {
        
        switch (el.filter) {
          case "All":
            return tasks[el.id];
    
          case "Active":
            return tasks[el.id].filter((t) => !t.isDone);
          case "Completed":
            return tasks[el.id].filter((t) => t.isDone);
          default:
            return tasks[el.id];
        }
      };  
      
      return (
        <Grid item key={el.id}>
          <Paper style={{padding: '10px'}}> 
          <TodoList
            key={el.id}
            todolistId={el.id}
            title={el.title}
            tasks={getFilteredTasksForRender()}
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