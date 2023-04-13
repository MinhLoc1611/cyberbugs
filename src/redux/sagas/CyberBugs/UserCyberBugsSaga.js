import { takeLatest, call, put } from 'redux-saga/effects'
import { cyberBugsService } from '../../../services/CyberBugsServices'
import { userService } from '../../../services/UserService'
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'
import { history } from '../../../util/libs/history'
import { GET_LIST_PROJECT_SAGA, USER_SIGNIN_API, USER_SIGNUP_API, USLOGIN } from '../../constants/CyberBugs/CyberBugs'
import { DELETE_USER_CYBER_API, EDIT_USER_CYBER_API, GET_USER_BY_PROJECT_ID, GET_USER_BY_PROJECT_ID_SAGA, GET_USER_CYBER, GET_USER_CYBER_API } from '../../constants/CyberBugs/UserConstants'
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";

function* signinSaga(action) {
    try {
        const { data, status } = yield call(() => cyberBugsService.signinCyberBugs(action.userLogin))

        if (status === STATUS_CODE.SUCCESS) {

            localStorage.setItem(TOKEN, data.content.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

            yield put({
                type: USLOGIN
            })

            yield put({
                type: GET_LIST_PROJECT_SAGA
            })

            history.push('/home')
        }

    } catch (err) {
        notifiFunction("warning", "email or password is incorrect!");
    }
}

export function* theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function* signUpSaga(action) {
    try {
        const { status } = yield call(() => userService.signUpUser(action.userSignUp))

        if (status === STATUS_CODE.SUCCESS) {
            history.push('/login')
            notifiFunction("success", "Sign Up successfully!");
        }

    } catch (err) {
        console.log(err.response.data)
        notifiFunction("warning", "Sign Up fail!");
    }
}

export function* theoDoiSignUp() {
    yield takeLatest(USER_SIGNUP_API, signUpSaga);
}

function* getUserSaga(action) {
    try {
        const { data } = yield call(() => userService.getUser(action.keyWord))

        yield put({
            type: 'GET_USER_SEARCH',
            listUserSearch: data.content
        })

    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiGetUser() {
    yield takeLatest('GET_USER_API', getUserSaga);
}

function* addUserProjectSaga(action) {
    try {
        yield call(() => userService.assignUserProject(action.userProject))

        yield put({
            type: GET_LIST_PROJECT_SAGA
        })

    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiAddUserProject() {
    yield takeLatest('ADD_USER_PROJECT_API', addUserProjectSaga);
}

function* removeUserProjectSaga(action) {
    try {
        yield call(() => userService.deleteUserFromProject(action.userProject))

        yield put({
            type: GET_LIST_PROJECT_SAGA
        })

    } catch (err) {
        console.log(err.response.data)
    }
}

export function* theoDoiRemoveUserProject() {
    yield takeLatest('REMOVE_USER_PROJECT_API', removeUserProjectSaga);
}

function* getUserByProjectIdSaga(action) {

    try {
        const { data, status } = yield call(() => userService.getUserByProjectId(action.idProject))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: data.content
            })
        }
    } catch (err) {
        if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
            yield put({
                type: GET_USER_BY_PROJECT_ID,
                arrUser: []
            })
        }
    }

}

export function* theoDoiGetUserByProjectIdSaga() {
    yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga)
}

function* getUserCyberSaga(action) {

    try{
        const {data,status} = yield call(()=> userService.getUserCyber(action.keyWord))

        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type:GET_USER_CYBER,
                listUserCyber:data.content
            })
        }
    }catch(err){
        console.log(err)
    }
}

export function* theoDoiGetUserCyberSaga(){
    yield takeLatest(GET_USER_CYBER_API,getUserCyberSaga)
}

function* deleteUserCyberSaga(action){

    try{
        const {status} = yield call(()=>userService.deleteUserCyber(action.userId))

        if(status===STATUS_CODE.SUCCESS){
            yield put({
                type:GET_USER_CYBER_API,
                keyWord:''
            })
            notifiFunction("success", "Delete User Cyber successfully!");
        }

    }catch(err){
        console.log(err)
        notifiFunction("warning", "Delete User Cyber fail!");
    }
}

export function* theoDoiDeleteUserCyberSaga(){
    yield takeLatest(DELETE_USER_CYBER_API,deleteUserCyberSaga)
}

function* editUserCyberSaga(action) {
    try {
        const { status } = yield call(() => userService.editUserCyber(action.userEdit))
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_USER_CYBER_API,
                keyWord:''
            })
            yield put({
                type: 'CLOSE_DRAWER'
            })
            notifiFunction("success", "Edit User Cyber successfully!");
        }
        
    } catch (err) {
        console.log(err.response.data)
        notifiFunction("warning", "Edit User Cyber fail!");
    }
}

export function* theoDoiEditUserCyberSaga() {
    yield takeLatest(EDIT_USER_CYBER_API, editUserCyberSaga)
}