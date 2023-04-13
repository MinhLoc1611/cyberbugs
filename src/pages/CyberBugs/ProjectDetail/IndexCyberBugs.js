import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain'

export default function IndexCyberBugs(props) {

    const projectDetail = useSelector(state=>state.ProjectReducer.projectDetail)

    const dispatch = useDispatch()

    useEffect(()=>{
        const projectId = props.match.params.projectId;
        dispatch({
            type:'GET_PROJECT_DETAIL',
            projectId: projectId
        })
    },[])
    
    return (
        
        <div className="main">
            <HeaderMain/>
            <InfoMain projectDetail={projectDetail}/>
            <ContentMain projectDetail={projectDetail}/>
        </div>
    )
}
