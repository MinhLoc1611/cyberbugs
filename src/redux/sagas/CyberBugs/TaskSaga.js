import { taskService } from "../../../services/TaskService";
import { takeLatest, call, put, select } from "redux-saga/effects";
import { notifiFunction } from "../../../util/Notification/notificationCyberbugs";
import {
    CHANGE_TASK_ASSIGNESS,
    CHANGE_TASK_MODAL,
    CREATE_TASK_SAGA,
    DELETE_COMMENT_TASK_SAGA,
    GET_TASK_DETAIL,
    GET_TASK_DETAIL_SAGA,
    HANDLE_CHANGE_POST_API_SAGA,
    INSERT_COMMENT_TASK_SAGA,
    REMOVE_USER_ASSIGN,
    UPDATE_COMMENT_TASK_SAGA,
    UPDATE_STATUS_TASK_SAGA,
} from "../../constants/CyberBugs/TaskConstants";
import { STATUS_CODE } from "../../../util/constants/settingSystem";

function* createTaskSaga(action) {
    try {
        yield call(() => taskService.createTask(action.taskObject));
       
        yield put({
            type: "CLOSE_DRAWER",
        });
        yield put({
            type: "GET_PROJECT_DETAIL",
            projectId: action.taskObject.projectId,
        });
        notifiFunction("success", "Create task successfully!");
    } catch (err) {
        notifiFunction("warning", "Create task fail!");
    }
}

export function* theoDoiCreateTaskSaga() {
    yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

function* getTaskDetailSaga(action) {
    try {
        const { data, status } = yield call(() =>
            taskService.getTaskDetail(action.taskId)
        );

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL,
                taskDetailModal: data.content,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiGetTaskDetailSaga() {
    yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function* updateTaskStatusSaga(action) {
    try {
        const { status } = yield call(() =>
            taskService.updateStatusTask(action.taskStatusUpdate)
        );
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskStatusUpdate.taskId,
            });
            yield put({
                type: "GET_PROJECT_DETAIL",
                projectId: action.taskStatusUpdate.projectId,
            });
        }
    } catch (err) {
        console.log(err);
    }
}

export function* theoDoiUpdateTaskStatusSaga() {
    yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

function* handleChangePostApi(action) {
    
    // eslint-disable-next-line default-case
    switch (action.actionType) {
        case CHANGE_TASK_MODAL: {
            const { value, name } = action;
            yield put({
                type: CHANGE_TASK_MODAL,
                name,
                value,
            });
        } break;
        
        case CHANGE_TASK_ASSIGNESS: {
            const { userSelected } = action;
            yield put({
                type: CHANGE_TASK_ASSIGNESS,
                userSelected,
            });
        } break;
        
        case REMOVE_USER_ASSIGN: {
            const { userId } = action;
            yield put({
                type: REMOVE_USER_ASSIGN,
                userId,
            });
        } break;
    }

    let { taskDetailModal } = yield select((state) => state.TaskReducer);
    const lstUserAssign = taskDetailModal.assigness?.map((user, index) => {
        return user.id;
    });
    const taskUpdateApi = { ...taskDetailModal, lstUserAssign };

    try {
        const { status } = yield call(() => taskService.updateTask(taskUpdateApi))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskUpdateApi.taskId,
            });
            yield put({
                type: "GET_PROJECT_DETAIL",
                projectId: taskUpdateApi.projectId,
            });
        }
    }catch(err){
        console.log(err)
    }
    
}

export function* theoDoiHandleChangePostApi() {
    yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostApi);
}

function* insertCommentSaga(action){
    const {taskComment, projectId} = action
    try {
        const { status } = yield call(() => taskService.insertComment(taskComment))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: taskComment.taskId,
            });
            yield put({
                type: "GET_PROJECT_DETAIL",
                projectId
            });
            notifiFunction("success", "Comment successfully!");
        }
    }catch(err){
        console.log(err)
        notifiFunction("warning", "Comment fail!");
    }
}

export function* theoDoiInsertCommentSaga(){
    yield takeLatest(INSERT_COMMENT_TASK_SAGA,insertCommentSaga)
}

function* deleteCommentSaga(action){
    
    try {
        const { status } = yield call(() => taskService.deleteComment(action.idComment))

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskId,
            });
            yield put({
                type: "GET_PROJECT_DETAIL",
                projectId: action.projectId,
            });
            notifiFunction("success", "Delete Comment successfully!");
        }

    }catch(err){
        console.log(err)
        notifiFunction("warning", "Delete Comment fail!");
    }
}

export function* theoDoiDeleteCommentSaga(){
    yield takeLatest(DELETE_COMMENT_TASK_SAGA,deleteCommentSaga)
}

function* updateCommentSaga(action){
    try {
        const { status } = yield call(() => taskService.updateComment(action.commentUpdate))
        
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_DETAIL_SAGA,
                taskId: action.taskId,
            });
            yield put({
                type: "GET_PROJECT_DETAIL",
                projectId: action.projectId,
            });
            notifiFunction("success", "Update Comment successfully!");
        }

    }catch(err){
        console.log(err)
        notifiFunction("warning", "Update Comment fail!");
    }
}

export function* theoDoiUpdateCommentSaga(){
    yield takeLatest(UPDATE_COMMENT_TASK_SAGA,updateCommentSaga)
}