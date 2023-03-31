import { USER_SIGNIN_API } from "../constants/CyberBugs/CyberBugs"

export const siginCyberBugsAction = (email,password)=>{
    return {
        type: USER_SIGNIN_API,
        userLogin:{
            email,
            password
        }
    }
}