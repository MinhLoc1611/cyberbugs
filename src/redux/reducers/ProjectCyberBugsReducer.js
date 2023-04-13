import { GET_LIST_PROJECT } from "../constants/CyberBugs/CyberBugs"
import { GET_ALL_PROJECT } from "../constants/CyberBugs/ProjectConstants";


const stateDefault = {
    projectList:[],
    arrProject:[]
}


export const ProjectCyberBugsReducer = (state=stateDefault,action) =>{
    switch(action.type){
        case GET_LIST_PROJECT:{
            state.projectList = action.projectList;
            return {...state}
        }

        case GET_ALL_PROJECT:{
            return{...state, arrProject:action.arrProject}
        }
        default: return {...state}
    }
}