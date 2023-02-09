import { v4 as uuidv4 } from 'uuid';
import { FilterValueType, TodolistsType } from '../App';

export type RemoveTodoType = ReturnType<typeof removeTodoListAC>
export type AddTodoType = ReturnType<typeof addTodoListAC>
type ChangeFilterType = ReturnType<typeof changeFilterAC>
type UpdateTodoListTitleType = ReturnType<typeof updateTodoListTitleAC>

export type TodoListActionType = RemoveTodoType | AddTodoType | ChangeFilterType | UpdateTodoListTitleType

export const todoListReducer = (state: TodolistsType[], action: TodoListActionType): TodolistsType[] => {
  switch (action.type) {
    case "ADD_TODO":
        const newTodo: TodolistsType = {id: action.todoListId, title: action.title, filter: 'All'}
        return [...state, newTodo];
    case "REMOVE_TODO":
        return state.filter(el => el.id !== action.todoListId);
    case "CHANGE_FILTER":
        return state.map(el => el.id === action.todoListId ? {...el, filter: action.value} : el);
    case "UPDATE_TODOLIST_TITLE":
        return state.map(el => el.id === action.todoListId ? {...el, title: action.newTitle}: el)
    default:
        throw new Error("I don't inderstand this type");
  }
};

export const updateTodoListTitleAC = (todoListId: string, newTitle: string) => ({type: 'UPDATE_TODOLIST_TITLE', newTitle, todoListId}) as const; 
export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE_TODO', todoListId}) as const ;
export const addTodoListAC = (title: string, id: string) => ({type: 'ADD_TODO', title, todoListId:id}) as const;
export const changeFilterAC = (todoListId: string, value: FilterValueType) => ({type: 'CHANGE_FILTER', todoListId, value}) as const;