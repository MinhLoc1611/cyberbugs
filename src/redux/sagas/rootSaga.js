import {all} from 'redux-saga/effects'
import * as CyberBugs from './CyberBugs/UserCyberBugsSaga'
import * as ProjectCategorySaga from './CyberBugs/ProjectCategorySaga'
import * as ProjectSaga from './CyberBugs/ProjectSaga'
import * as TaskTypeSaga from './CyberBugs/TaskTypeSaga'
import * as PrioritySaga from './CyberBugs/PrioritySaga'
import * as TaskSaga from './CyberBugs/TaskSaga'
import * as StatusSaga from './CyberBugs/StatusSaga'

export function * rootSaga(){
    yield all ([
        CyberBugs.theoDoiSignin(),
        CyberBugs.theoDoiGetUser(),
        CyberBugs.theoDoiAddUserProject(),
        CyberBugs.theoDoiRemoveUserProject(),
        CyberBugs.theoDoiGetUserByProjectIdSaga(),
        CyberBugs.theoDoiSignUp(),
        CyberBugs.theoDoiGetUserCyberSaga(),
        CyberBugs.theoDoiDeleteUserCyberSaga(),
        CyberBugs.theoDoiEditUserCyberSaga(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        ProjectSaga.theoDoiCreateProjectSaga(),
        ProjectSaga.theoDoiGetListProjectSaga(),
        ProjectSaga.theoDoiUpdateProjectSaga(),
        ProjectSaga.theoDoiDeleteProject(),
        ProjectSaga.theoDoiGetProjectDetail(),
        ProjectSaga.theoDoiGetAllProjectSaga(),
        TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
        PrioritySaga.theoDoiGetAllPrioritySaga(),
        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoiGetTaskDetailSaga(),
        TaskSaga.theoDoiUpdateTaskStatusSaga(),
        TaskSaga.theoDoiHandleChangePostApi(),
        TaskSaga.theoDoiInsertCommentSaga(),
        TaskSaga.theoDoiDeleteCommentSaga(),
        TaskSaga.theoDoiUpdateCommentSaga(),
        StatusSaga.theoDoiGetAllStatusSaga()
    ])
}