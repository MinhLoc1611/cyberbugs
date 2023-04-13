import { USER_LOGIN } from "../../util/constants/settingSystem";
import { USLOGIN } from "../constants/CyberBugs/CyberBugs";
import { GET_USER_BY_PROJECT_ID, GET_USER_CYBER, GET_USER_EDIT_CYBER } from "../constants/CyberBugs/UserConstants";

let usLogin = {};

if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: usLogin,
    userSearch:[],
    arrUser:[],
    listUserCyber:[],
    userEdit:{

    }
}

export const UserCyberBugReducer = (state = stateDefault,action)=>{
    switch(action.type){
        case USLOGIN:{
            state.userLogin = action.userLogin;
            return {...state}
        }
        case 'GET_USER_SEARCH':{
            state.userSearch = action.listUserSearch
            return {...state}
        }

        case GET_USER_BY_PROJECT_ID:{
            return {...state,arrUser:action.arrUser}
        }

        case GET_USER_CYBER:{
            return {...state,listUserCyber: action.listUserCyber}
        }

        case GET_USER_EDIT_CYBER:{
            return {...state,userEdit:action.userEdit}
        }
        default : return {...state}
    }
}