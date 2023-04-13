import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import reduxThunk from 'redux-thunk'
import {ModalReducer} from './reducers/ModalReducer'
import createMiddleWareSaga from 'redux-saga'
import {rootSaga} from './sagas/rootSaga'
import { UserCyberBugReducer } from './reducers/UserCyberBugReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectCyberBugsReducer } from './reducers/ProjectCyberBugsReducer';
import { DrawerReducer } from './reducers/DrawerCyberbugsReducer';
import { ProjectReducer } from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';
import { TaskReducer } from './reducers/TaskReducer';
const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
    ModalReducer,
    UserCyberBugReducer,
    ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
    TaskReducer
})

const store = legacy_createStore(rootReducer,applyMiddleware(reduxThunk,middleWareSaga));

middleWareSaga.run(rootSaga);

export default store;