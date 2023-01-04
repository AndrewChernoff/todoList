import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import TodoList from "./TodoList";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}

export type FilterValueType = "All" | "Active" | "Completed";

function App() {

  let todolistID1 = uuidv4()
  let todolistID2 = uuidv4()


   let [todolists, setTodolists] = useState<TodolistsType[]>(
    [
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]
)

let [tasks, setTasks] = useState({
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
    setTasks({...tasks, [todoListId]: [...tasks[todoListId]].filter(el => el.id !== taskId)})
  };

  const addTask = (todoListId: string,taskName: string) => {
    const newTask: TaskType = {
      id: uuidv4(), title: taskName, isDone: false
    }
    setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]})
  }

  const onChangeStatus = (todoListId: string, taskId: string, isChecked: boolean) => {
    setTasks({...tasks, [todoListId]: [...tasks[todoListId].map(el => el.id === taskId ? {...el, isDone: isChecked} : el )]})
  }

  const changeFilter = (todoListsId: string, filterValue: FilterValueType) => {
    setTodolists(todolists.map(el => el.id === todoListsId ? {...el, filter: filterValue} : el))
  }

  const deleteTodoList = (todoListId: string) => {
    setTodolists(todolists.filter( el => el.id !== todoListId))

    delete tasks[todoListId]

    setTasks({...tasks})
  }

  return (
    <div className="App">
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
      //let allTodolistTasks = tasks
      
      /* let taskForTodoList = tasks[el.id]

      if(el.filter === 'Active') {
        taskForTodoList = tasks[el.id].filter(task => !task.isDone)
      }
      if (el.filter === 'Completed') {
        taskForTodoList = tasks[el.id].filter(task => task.isDone)
      }  */
 
      return <TodoList
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
    />
     })} 
    </div>
  );
}

export default App;