import {baseService} from './baseService'

export class UserService extends baseService{

    getUser = (keyWord) =>{
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }
}

export const userService = new UserService()