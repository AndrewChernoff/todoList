import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { taskReducer } from "./state/taskReducer"
import { todoListReducer } from "./state/todoListReducer"
import { v1 } from 'uuid'
import { AppStateType } from "./state/store"


const rootReducer = combineReducers({
    tasks: taskReducer,
    todoLists: todoListReducer
})

const initialGlobalState = {
    todoLists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as ReturnType<typeof rootReducer>)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore} > {storyFn()} </Provider>
}