

const stateDefault={
    projectEdit:{
        id:0,
        projectName:'string',
        description:'string',
        categoryId:'2'
    }
}

export const ProjectReducer = (state=stateDefault,action) =>{
    switch(action.type){

        case 'EDIT_PROJECT':{
            state.projectEdit = action.projectEditModal
            return {...state}
        }

        default: return {...state}
    }
}