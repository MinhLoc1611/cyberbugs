import  Axios  from "axios"
import {DOMAIN_CYBERBUGS, TOKEN} from '../util/constants/settingSystem'


export const cyberBugsService = {
    signinCyberBugs:(userLogin)=>{
        return Axios({
            url:`${DOMAIN_CYBERBUGS}/users/signin`,
            method:'POST',
            data:userLogin
        })
    },
    getAllProjectCategory:() => {
        return Axios({
            url:`${DOMAIN_CYBERBUGS}/ProjectCategory`,
            method:'GET'
        })
    },
    createProject:(newProject)=>{
        return Axios({
            url:`${DOMAIN_CYBERBUGS}/Project/createProject`,
            method:'POST',
            data:newProject
        })
    },
    createProjectAuthorization: (newProject) =>{
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProjectAuthorize`,
            method:'POST',
            data:newProject,
            headers:{'Authorization':'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    getListProject:()=>{
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/Project/getAllProject`,
            method:'GET',
            headers:{'Authorization':'Bearer ' + localStorage.getItem(TOKEN)}
        })
    },
    updateProject:(projectUpdate)=>{
        return Axios({
            url:`${DOMAIN_CYBERBUGS}/Project/updateProject?projectId=${projectUpdate.id}`,
            method:'PUT',
            data:projectUpdate,
            headers:{'Authorization':'Bearer ' + localStorage.getItem(TOKEN)}
        })
    }
}
