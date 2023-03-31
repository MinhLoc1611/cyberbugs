import { takeLatest, call, put } from 'redux-saga/effects'
import { cyberBugsService } from '../../../services/CyberBugsServices'
import { userService } from '../../../services/UserService'
import { TOKEN, USER_LOGIN } from '../../../util/constants/settingSystem'
import { history } from '../../../util/libs/history'
import { USER_SIGNIN_API, USLOGIN } from '../../constants/CyberBugs/CyberBugs'

function * signinSaga(action) {
    try {
        const { data } = yield call(()=>cyberBugsService.signinCyberBugs(action.userLogin)) 
        
        localStorage.setItem(TOKEN,data.content.accessToken)
        localStorage.setItem(USER_LOGIN,JSON.stringify(data.content))

        yield put({
            type:USLOGIN
        })
        
        history.push('/home')

    } catch (err) {
        console.log(err.response.data)
    }
}

export function * theoDoiSignin() {
    yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function * getUserSaga(action) {
    try {
        const { data } = yield call(()=>userService.getUser(action.keyWord)) 

        yield put({
            type:'GET_USER_SEARCH',
            listUserSearch:data.content
        })

    } catch (err) {
        console.log(err.response.data)
    }
}

export function * theoDoiGetUser() {
    yield takeLatest('GET_USER_API', getUserSaga);
}