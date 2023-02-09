import { v4 as uuidv4 } from 'uuid';
import { TasksType, TaskType } from "../App"
import { AddTodoType, RemoveTodoType } from './todoListReducer';

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskACType | AddTaskACType | ChangeStatusACType | ChangeTitleACType | AddTodoType | RemoveTodoType

export const taskReducer = (state: TasksType, action: ActionType): TasksType => {
  switch (action.type) {
    case "ADD_TASK":
        const newTask: TaskType = {id: uuidv4(), title: action.title, isDone: false}
        return {...state, [action.todoListId]: [...state[action.todoListId], newTask]};
    case "REMOVE_TASK":
        return {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.taskId)};    
    case "CHANGE_TASK_STATUS":
        return {...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {...el, isDone: action.newStatus} : el)};
    case "CHANGE_TASK_TITLE":
        return {...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.taskId ? {...el, title: action.newTitle} : el)};
    case "ADD_TODO":
          return {...state, [action.todoListId]: [
            {id: uuidv4(), title: 'HTML&CSS', isDone: true},
            {id: uuidv4(), title: 'JS', isDone: true},
            {id: uuidv4(), title: 'ReactJS', isDone: false},
        ]}
        
    case "REMOVE_TODO": 
        //return {...state, [action.todoListId]: []}
        let stateCopy = {...state}
        delete stateCopy[action.todoListId]
        return stateCopy
    default:
        throw new Error("I don't inderstand this type");
  }
};

export const removeTaskAC = (todoListId: string, taskId: string) => ({type: 'REMOVE_TASK', todoListId, taskId}) as const ;
export const addTaskAC = (todoListId: string,title: string) => ({type: 'ADD_TASK', todoListId, title}) as const;
export const changeTaskStatusAC = (todoListId: string, taskId: string, newStatus: boolean) => ({type: 'CHANGE_TASK_STATUS', todoListId, taskId, newStatus}) as const;
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => ({type: 'CHANGE_TASK_TITLE', todoListId, taskId, newTitle}) as const;