import {baseService} from './baseService'

export class UserService extends baseService{

    getUser = (keyWord) =>{
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }

    assignUserProject = (userProject) => {
        return this.post(`Project/assignUserProject`,userProject)
    }

    deleteUserFromProject = (userProject) => {
        return this.post('Project/removeUserFromProject',userProject)
    }

    getUserByProjectId = (idProject) =>{
        return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
    }

    signUpUser = (userSignUp) =>{
        return this.post('Users/signup',userSignUp)
    }

    getUserCyber = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }

    deleteUserCyber = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`)
    }

    editUserCyber = (userEdit) =>{
        return this.put('Users/editUser',userEdit)
    }

}

export const userService = new UserService()