import { CHANGE_TASK_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_USER_ASSIGN } from "../constants/CyberBugs/TaskConstants";

const initialState = {
    taskDetailModal: {
        priorityTask: {
            priorityId: 2,
            priority: "Medium",
        },
        taskTypeDetail: {
            id: 2,
            taskType: "new task",
        },
        assigness: [
            {
                id: 3962,
                avatar: "https://ui-avatars.com/api/?name=Nga Ho",
                name: "Nga Ho",
                alias: "nga-ho",
            },
        ],
        lstComment: [],
        taskId: 8827,
        taskName: "task Saga 1",
        alias: "task-saga-1",
        description: "<p>fadfafaf</p>",
        statusId: "3",
        originalEstimate: 20,
        timeTrackingSpent: 10,
        timeTrackingRemaining: 10,
        typeId: 2,
        priorityId: 2,
        projectId: 11332,
    },
};

export const TaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_DETAIL:{
            return {...state,taskDetailModal:action.taskDetailModal}
        }

        case CHANGE_TASK_MODAL:{
            const{name,value} = action
            return {...state,taskDetailModal:{...state.taskDetailModal,[name]:value}}
        }

        case CHANGE_TASK_ASSIGNESS:{
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness,action.userSelected]
            return {...state}
        }
        
        case REMOVE_USER_ASSIGN:{
            state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter(us => us.id !== action.userId)]
            return {...state}
        }
        default:
            return state;
    }
};
