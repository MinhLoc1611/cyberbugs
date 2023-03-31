import {all} from 'redux-saga/effects'
import * as CyberBugs from './CyberBugs/UserCyberBugsSaga'
import * as ProjectCategorySaga from './CyberBugs/ProjectCategorySaga'
import * as ProjectSaga from './CyberBugs/ProjectSaga'

export function * rootSaga(){
    yield all ([
        CyberBugs.theoDoiSignin(),
        CyberBugs.theoDoiGetUser(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProject(),
    ])
}