import { takeLatest, call, put } from 'redux-saga/effects'
import { cyberBugsService } from '../../../services/CyberBugsServices'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA } from '../../constants/CyberBugs/CyberBugs';
import { history } from '../../../util/libs/history'
import { projectService } from '../../../services/ProjectService';
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs';
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from '../../constants/CyberBugs/ProjectConstants';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../constants/CyberBugs/UserConstants';


function* createProjectSaga(action) {
    try {
        const { data, status } = yield call(() => cyberBugsService.createProjectAuthorization(action.newProject));

        if (status === STATUS_CODE.SUCCESS) {
            console.log('newProject', data)

            history.push('/projectmanagement')
            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

        }

    } catch (err) {
        console.log(err.response.data)
    }

}


export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga)
}


function* getListProjectSaga(action) {
    try {
        const { data, status } = yield call(() => cyberBugsService.getListProject());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT,
                projectList: data.content
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}


export function* theoDoiGetListProjectSaga() {
    yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga)
}

function* updateProjectSaga(action) {
    try {
        const { status } = yield call(() => cyberBugsService.updateProject(action.projectUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_LIST_PROJECT_SAGA
            })
            yield put({
                type: 'CLOSE_DRAWER'
            })
        }
        
    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiUpdateProjectSaga() {
    yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga)
}

function* deleteProjectSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.deleteProject(action.IdProject))
        if (status === STATUS_CODE.SUCCESS) {
            console.log('deleteProject', data)
            notifiFunction('success', 'Delete project successfully!')
        } else {
            notifiFunction('error', 'Delete project fail!')
        }
        yield put({
            type: GET_LIST_PROJECT_SAGA
        })
        yield put({
            type: 'CLOSE_DRAWER'
        })
    } catch (err) {
        notifiFunction('error', 'Delete project fail!')
        console.log(err.response.data)
    }
}

export function* theoDoiDeleteProject() {
    yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga)
}

function* getProjectDetailSaga(action) {
    try {
        const { data } = yield call(() => projectService.getProjectDetail(action.projectId))

        yield put({
            type: 'PUT_PROJECT_DETAIL',
            projectDetail: data.content
        })

    } catch (err) {
        console.log(err.response.data)
        history.push('/projectmagagement')
    }
}

export function* theoDoiGetProjectDetail() {
    yield takeLatest('GET_PROJECT_DETAIL', getProjectDetailSaga)
}

function* getProjectAllSaga(action) {
    try {
        const { data, status } = yield call(() => projectService.getAllProject());
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type:GET_ALL_PROJECT,
                arrProject:data.content
            })
            yield put({
                type:GET_USER_BY_PROJECT_ID_SAGA,
                idProject:data.content[0].id
            })
        }
    } catch (err) {
        console.log(err.response.data)
    }
}


export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga)
}