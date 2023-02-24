import { todoListReducer } from './todoListReducer';
import { combineReducers, compose } from "redux";
import { taskReducer } from './taskReducer';
import { legacy_createStore as createStore} from 'redux';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: taskReducer,
})

export const store = createStore(rootReducer, composeEnhancers());


export type AppStateType = ReturnType<typeof rootReducer>

(window as any).store = store 