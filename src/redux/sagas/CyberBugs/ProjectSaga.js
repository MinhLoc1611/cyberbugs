import { takeLatest, call, put } from 'redux-saga/effects'
import { cyberBugsService } from '../../../services/CyberBugsServices'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_LIST_PROJECT, GET_LIST_PROJECT_SAGA } from '../../constants/CyberBugs/CyberBugs';
import { history } from '../../../util/libs/history'
import { projectService } from '../../../services/ProjectService';
import { notifiFunction } from '../../../util/Notification/notificationCyberbugs';


function* createProjectSaga(action) {
    try {
        const { data, status } = yield call(() => cyberBugsService.createProjectAuthorization(action.newProject));

        if (status === STATUS_CODE.SUCCESS) {
            console.log('newProject',data)

            history.push('/projectmanagement')
        }

    } catch (err) {
        console.log(err.response.data)
    }

}


export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga)
}


function* getListProjectSaga(action){
    try{
        const{data,status} = yield call(()=> cyberBugsService.getListProject());
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type:GET_LIST_PROJECT,
                projectList:data.content
            })
        }
    }catch(err){
        console.log(err.response.date)
    }
}


export function* theoDoiGetListProjectSaga(){
    yield takeLatest(GET_LIST_PROJECT_SAGA,getListProjectSaga)
}

function* updateProjectSaga(action){
    try{
        const{data,status} = yield call(()=> cyberBugsService.updateProject(action.projectUpdate))
        if (status === STATUS_CODE.SUCCESS) {
            console.log('updateProject', data)
        }
        yield put({
            type:GET_LIST_PROJECT_SAGA
        })
        yield put({
            type:'CLOSE_DRAWER'
        })
    }catch(err){
        console.log(err.response.date)
    }
}

export function* theoDoiUpdateProjectSaga(){
    yield takeLatest('UPDATE_PROJECT_SAGA',updateProjectSaga)
}

function* deleteProjectSaga(action){
    try{
        const{data,status} = yield call(()=> projectService.deleteProject(action.IdProject))
        if (status === STATUS_CODE.SUCCESS) {
            console.log('deleteProject', data)
            notifiFunction('success','Delete project successfully!')
        } else{
            notifiFunction('error','Delete project fail!')
        }
        yield put({
            type:GET_LIST_PROJECT_SAGA
        })
        yield put({
            type:'CLOSE_DRAWER'
        })
    }catch(err){
        notifiFunction('error','Delete project fail!')
        console.log(err.response.date)
    }
}

export function* theoDoiDeleteProject(){
    yield takeLatest('DELETE_PROJECT_SAGA',deleteProjectSaga)
}