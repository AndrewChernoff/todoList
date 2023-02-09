import { v4 as uuidv4 } from 'uuid';
import { TodolistsType } from "../App"
import { addTodoListAC, removeTodoListAC, todoListReducer, changeFilterAC } from './todoListReducer';

let todolist: TodolistsType[];
let todolistID1: string
let todolistID2: string

beforeEach(() => {
   todolistID1 = uuidv4()
   todolistID2 = uuidv4()
  
  todolist = [
    {id: 'todolistID1', title: 'What to learn', filter: 'All'},
    {id: 'todolistID2', title: 'What to buy', filter: 'All'},
  ]
})

test('add todo list', () => {
    /* let todolist: TodolistsType[] = [
            {id: 'todolistID1', title: 'What to learn', filter: 'All'},
            {id: 'todolistID2', title: 'What to buy', filter: 'All'},
        ]
 */
        const action = addTodoListAC('New Todo List', 'todolistID1')
        const result = todoListReducer(todolist, action)
      
      expect(result.length).toBe(3)
      expect(result[2].title).toBe('New Todo List')
})

test('remove todo list', () => {
/*     todolist = [
            {id: 'todolistID1', title: 'What to learn', filter: 'All'},
            {id: 'todolistID2', title: 'What to buy', filter: 'All'},
        ] */

        const action = removeTodoListAC('todolistID1')
        const result = todoListReducer(todolist, action)
      
      expect(result.length).toBe(1)
})

test('change filter', () => {
    /* todolist = [
            {id: 'todolistID1', title: 'What to learn', filter: 'All'},
            {id: 'todolistID2', title: 'What to buy', filter: 'All'},
        ] */

        const action = changeFilterAC('todolistID1', 'Active')
        const result = todoListReducer(todolist, action)

        const action2 = changeFilterAC('todolistID2', 'Completed')
        const result2 = todoListReducer(todolist, action2)

      
      expect(result[0].filter).toBe('Active')
      expect(result2[1].filter).toBe('Completed')
})