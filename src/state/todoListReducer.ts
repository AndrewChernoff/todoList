import { v4 as uuidv4 } from 'uuid';
import { FilterValueType, TodolistsType } from '../App';

export type RemoveTodoType = ReturnType<typeof removeTodoListAC>
export type AddTodoType = ReturnType<typeof addTodoListAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>

type ActionType = RemoveTodoType | AddTodoType | ChangeFilterType

export const todoListReducer = (state: TodolistsType[], action: ActionType) => {
  switch (action.type) {
    case "ADD_TODO":
        const newTodo = {id: action.todoListId, title: action.title, filter: 'All'}
        return [...state, newTodo];
    case "REMOVE_TODO":
        return state.filter(el => el.id !== action.todoListId);
    case "CHANGE_FILTER":
        return state.map(el => el.id === action.todoListId ? {...el, filter: action.value} : el);
    default:
        throw new Error("I don't inderstand this type");
  }
};

export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE_TODO', todoListId}) as const ;
export const addTodoListAC = (title: string) => ({type: 'ADD_TODO', title, todoListId:uuidv4()}) as const;
export const changeFilterAC = (todoListId: string, value: FilterValueType) => ({type: 'CHANGE_FILTER', todoListId, value}) as const;