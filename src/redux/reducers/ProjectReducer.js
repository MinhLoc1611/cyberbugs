

const stateDefault={
    projectEdit:{
        id:0,
        projectName:'string',
        description:'string',
        categoryId:'2'
    },
    projectDetail:{

    }
}

export const ProjectReducer = (state=stateDefault,action) =>{
    switch(action.type){

        case 'EDIT_PROJECT':{
            state.projectEdit = action.projectEditModal
            return {...state}
        }
        case 'PUT_PROJECT_DETAIL':{
            state.projectDetail = action.projectDetail
            return {...state}
        }

        default: return {...state}
    }
}