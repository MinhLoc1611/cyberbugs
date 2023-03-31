import { takeLatest, call, put } from 'redux-saga/effects'
import { cyberBugsService } from '../../../services/CyberBugsServices'
import { STATUS_CODE } from '../../../util/constants/settingSystem';
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../constants/CyberBugs/CyberBugs';


function* getAllProjectCategorySaga(action) {
    try {
        const { data, status } = yield call(() => cyberBugsService.getAllProjectCategory());

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                data: data.content
            })
        }

    } catch (err) {
        console.log(err.response.data)
    }

}


export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga)
}