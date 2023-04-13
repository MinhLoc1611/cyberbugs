import { priorityService } from "../../../services/PriorityService"
import { takeLatest, call, put } from 'redux-saga/effects'
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../../constants/CyberBugs/PriorityConstants"

function * getAllPrioritySaga(action){

    try{
        const {data} = yield call(()=> priorityService.getAllPriority())

        yield put({
            type:GET_ALL_PRIORITY,
            arrPriority:data.content
        })

    } catch(err){
        console.log(err)
    }

}

export function * theoDoiGetAllPrioritySaga(){
    yield takeLatest(GET_ALL_PRIORITY_SAGA,getAllPrioritySaga)
}