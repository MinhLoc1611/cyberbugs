import { DOMAIN_CYBERBUGS, TOKEN } from '../util/constants/settingSystem'
import {baseService} from './baseService'
import Axios from "axios"

export class TaskService extends baseService {

    createTask = (taskObject) =>{
        return this.post('Project/createTask',taskObject)
    }

    getTaskDetail = (taskId) =>{
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }

    updateStatusTask = (taskStatusUpdate) =>{
        return this.put('Project/updateStatus',taskStatusUpdate)
    }

    updateTask = (taskUpdate) => {
        return this.post('Project/updateTask',taskUpdate)
    }

    insertComment = (taskComment) =>{
        return this.post('Comment/insertComment',taskComment)
    }

    deleteComment = (idComment) =>{
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }

    updateComment = (commentUpdate) =>{
        return Axios ({
            url:`${DOMAIN_CYBERBUGS}/Comment/updateComment?id=${commentUpdate.id}&contentComment=${commentUpdate.contentComment}`,
            method:'PUT',
            headers:{'Authorization':'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}

export const taskService = new TaskService()