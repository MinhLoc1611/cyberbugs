import React from "react"
import { OPEN_FORM_EDIT, SET_SUBMIT_EDIT } from "../constants/CyberBugs/CyberBugs"

const initialState = {
    setOpen:false,
    title:'',
    ComponentContentDrawer:<p>default</p>,
    callBackSubmit:(propsValue)=>{alert('click demo!')}
}

export const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'OPEN_DRAWER':
            return { ...state, setOpen: true }
        case 'CLOSE_DRAWER':
            return { ...state, setOpen: false }
        case OPEN_FORM_EDIT: {
            state.setOpen = true
            state.ComponentContentDrawer = action.Component
            state.title = action.title
            return {...state}
        }
        case SET_SUBMIT_EDIT:{
            state.callBackSubmit = action.submitFunction
            return {...state}
        }

        case 'SET_SUBMIT_CREATE_TASK':{
            return{...state,callBackSubmit:action.submitFunction}
        }

        default:
            return { ...state }
    }
}
