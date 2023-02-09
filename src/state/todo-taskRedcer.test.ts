import { TasksType, TodolistsType } from "../App"
import { addTaskAC, taskReducer } from './taskReducer';
import { addTodoListAC, todoListReducer } from './todoListReducer';
import { v4 as uuidv4 } from 'uuid';

test('add todo and tasks', () => {
    let todolist: TodolistsType[] = []

    let tasks: TasksType = {}

    let action = addTodoListAC('New todo', uuidv4())

    const todolistResult = todoListReducer(todolist, action)
    const tasksResult = taskReducer(tasks, action)

    const keys = Object.keys(tasksResult)
    const idFromTasks = keys[0]
    const idFromTodoLists = todolistResult[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})