import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer } from './taskReducer';
import { TasksType } from "../App"

test.skip('delete task', () => {
    const tasks: TasksType = {
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
      }

      const action = removeTaskAC('todolistID1', '1')

      const result = taskReducer(tasks, action )

      expect(result).toEqual({
        'todolistID1': [
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
      })
      
})
test.skip('add task', () => {
    const tasks: TasksType = {
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
      }

      const action = addTaskAC('todolistID2', 'Redux')

      const result = taskReducer(tasks, action)

      expect(result['todolistID2'].length).toBe(3)
      expect(result['todolistID2'][2].title).toBe('Redux')
      
}
)
test.skip('add task', () => {
    const tasks: TasksType = {
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
      }

      const action = changeTaskStatusAC('todolistID2', '1', false)

      const result = taskReducer(tasks, action)

      expect(result['todolistID2'][1].isDone).toBe(false)
      expect(result['todolistID1'][1].isDone).toBe(true)
      
})

test.skip('change task title', () => {
    const tasks: TasksType = {
        'todolistID1': [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ]
      }

      const action = changeTaskTitleAC('todolistID1', '3', 'Angular')

      const result = taskReducer(tasks, action)

      expect(result['todolistID1'][2].title).toBe('Angular')
      
})