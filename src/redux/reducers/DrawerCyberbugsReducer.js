import React from "react"

const initialState = {
    setOpen:false,
    ComponentContentDrawer:<p>default</p>,
    callBackSubmit:(propsValue)=>{alert('click demo!')}
}

export const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'OPEN_DRAWER':
            return { ...state, setOpen: true }
        case 'CLOSE_DRAWER':
            return { ...state, setOpen: false }
        case 'OPEN_FORM_EDIT_PROJECT': {
            return {...state, setOpen:true, ComponentContentDrawer:action.Component}
        }
        case'SET_SUBMIT_EDIT_PROJECT':{
            state.callBackSubmit = action.submitFunction
            return {...state}
        }
        default:
            return { ...state }
    }
}
