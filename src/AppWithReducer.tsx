import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import React, { Reducer, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import AddItemForm from "./AddItemForm";
import "./App.css";
import ButtonAppBar from "./ButtonAppBar";
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

function AppWithReducer() {

  let todolistID1 = uuidv4()
  let todolistID2 = uuidv4()


   let [todolists, dispatchTodolists] = useReducer<Reducer<TodolistsType[], TodoListActionType>>(
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
})

  const removeTask = (todoListId: string,taskId: string) => {
    //setTasks({...tasks, [todoListId]: [...tasks[todoListId]].filter(el => el.id !== taskId)})
    dispatchTasks(removeTaskAC(todoListId,taskId))  
};

   const addTask = (todoListId: string,taskName: string) => {
    /* const newTask: TaskType = {
      id: uuidv4(), title: taskName, isDone: false
    }
    setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]}) */
    dispatchTasks(addTaskAC(todoListId,taskName))
  }

  const updateTask = (todolistID: string, taskId: string, newTitle: string) => {
    //setTasks({...tasks, [todolistID]: [...tasks[todolistID].map(el => el.id === taskId ? {...el, title: newTitle}: el)]})
    dispatchTasks(changeTaskTitleAC(todolistID, taskId, newTitle))
}

  const onChangeStatus = (todoListId: string, taskId: string, isChecked: boolean) => {
    //setTasks({...tasks, [todoListId]: [...tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: isChecked} : el )]})
    dispatchTasks(changeTaskStatusAC(todoListId, taskId, isChecked))
}

  const changeFilter = (todoListsId: string, filterValue: FilterValueType) => {
    //setTodolists(todolists.map(el => el.id === todoListsId ? {...el, filter: filterValue} : el))
    dispatchTodolists(changeFilterAC(todoListsId, filterValue))
  }

  const deleteTodoList = (todoListId: string) => {
/*     setTodolists(todolists.filter( el => el.id !== todoListId))

    delete tasks[todoListId]

    setTasks({...tasks}) */
    dispatchTodolists(removeTodoListAC(todoListId))
    dispatchTasks(removeTodoListAC(todoListId))
  }

  const addTodoList = (newTitle: string) => {
    /* let newId = uuidv4() 
    let newTodoList: TodolistsType = {
      id: newId,
      title: newTitle,
      filter: 'All'
    }

    setTodolists([newTodoList, ...todolists])
    setTasks({...tasks, [newId]: [
      {id: uuidv4(), title: 'Rest API', isDone: true},
      {id: uuidv4(), title: 'GraphQL', isDone: false},
      {id: uuidv4(), title: 'Rest API', isDone: true},
      {id: uuidv4(), title: 'GraphQL', isDone: false},
    ]}) */

    let id = uuidv4()
    dispatchTodolists(addTodoListAC(newTitle, id))
    dispatchTasks(addTodoListAC(newTitle, id))

  }

  const updateTodoList = (todoListId: string, newTitle: string) => {
    //setTodolists(todolists.map(el => el.id === todoListId? {...el, title: newTitle}: el))
    dispatchTodolists(updateTodoListTitleAC(todoListId, newTitle))
}

//console.log(todolists)
console.log(tasks)

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

export default AppWithReducer;