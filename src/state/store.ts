import { todoListReducer } from './todoListReducer';
import { combineReducers } from "redux";
import { taskReducer } from './taskReducer';
import { legacy_createStore as createStore} from 'redux';


export const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer,
})

export const store = createStore(rootReducer);


export type AppStateType = ReturnType<typeof rootReducer>

(window as any).store = store 