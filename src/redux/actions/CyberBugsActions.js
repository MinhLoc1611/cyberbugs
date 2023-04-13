import { USER_SIGNIN_API, USER_SIGNUP_API } from "../constants/CyberBugs/CyberBugs"

export const siginCyberBugsAction = (email,password)=>{
    return {
        type: USER_SIGNIN_API,
        userLogin:{
            email,
            password
        }
    }
}

export const signUpCyberBugsAction = (email,password, name, phoneNumber) => {
    return {
        type: USER_SIGNUP_API,
        userSignUp:{
            email,
            password,
            name,
            phoneNumber
        }
    }
}