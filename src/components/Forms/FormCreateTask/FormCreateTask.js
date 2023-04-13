import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux'
import { GET_ALL_PROJECT_SAGA } from '../../../redux/constants/CyberBugs/ProjectConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/CyberBugs/TaskTypeConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/CyberBugs/PriorityConstants';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { CREATE_TASK_SAGA } from '../../../redux/constants/CyberBugs/TaskConstants';
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/CyberBugs/StatusConstants';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../../redux/constants/CyberBugs/UserConstants';


function FormCreateTask(props) {

    const { arrProject } = useSelector(state => state.ProjectCyberBugsReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrUser } = useSelector(state => state.UserCyberBugReducer);
    const {arrStatus} = useSelector(state=>state.StatusReducer)
    const userOption = arrUser.map((item, index) => {
        return { value: item.userId, label: item.name }
    })

    const dispatch = useDispatch();

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 5,
        timeTrackingRemaining: 5
    })

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA })
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
        dispatch({ type: GET_ALL_PRIORITY_SAGA })
        dispatch({ type: 'GET_USER_API', keyWord: '' })
        dispatch({ type:GET_ALL_STATUS_SAGA})
        dispatch({ type:'SET_SUBMIT_CREATE_TASK', submitFunction:handleSubmit })
    }, [])

    const {
        handleChange,
        // values,
        handleSubmit,
        setFieldValue
    } = props;

    const editorRef = useRef();
    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>Project</p>
                <select onChange={(e)=>{
                    let { value } = e.target;
                    dispatch({
                        type:GET_USER_BY_PROJECT_ID_SAGA,
                        idProject:value
                    })
                    setFieldValue('projectId',e.target.value)
                }} name="projectId" className='form-control'>
                    {arrProject?.map((project, index) => {
                        return <option value={project.id} key={index}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p>Task Name</p>
                <input name='taskName' className='form-control' onChange={handleChange}/>      
            </div>
            <div className='form-group'>
                <p>Status</p>
                <select name='statusId' className='form-control' onChange={handleChange}>
                    {arrStatus?.map((statusItem,index)=>{
                        return <option key={index} value={statusItem.statusId}>
                            {statusItem.statusName}
                        </option>
                    })}
                </select>

            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Priority</p>
                        <select onChange={handleChange} className='form-control' name='priorityId'>
                            {arrPriority?.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select onChange={handleChange} className='form-control' name='typeId'>
                            {arrTaskType?.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>

                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assigness</p>
                        <Select
                            mode="multiple"
                            size='middle'
                            placeholder="Please select"
                            onChange={(values)=>{
                                setFieldValue('listUserAsign',values)
                            }}
                            optionFilterProp='label'
                            style={{
                                width: '100%',
                            }}
                            options={userOption}
                        />
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <p>Original Estimate</p>
                                <input onChange={handleChange} type='number' min='0' name='originalEstimate' defaultValue='0' className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <p>Time Tracking</p>
                        <Slider
                            value={timeTracking.timeTrackingSpent}
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                        />
                        <div className='row'>
                            <div className='col-6 text-left font-weight-bold'>{timeTracking.timeTrackingSpent}h logged</div>
                            <div className='col-6 text-right font-weight-bold'>{timeTracking.timeTrackingRemaining}h logged</div>
                        </div>
                        <div className='row mt-1'>
                            <div className='col-6'>
                                <p>Time Spent</p>
                                <input onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });
                                    setFieldValue('timeTrackingSpent',e.target.value)
                                }} name='timeTrackingSpent' min='0' defaultValue='0' type='number' className='form-control' />
                            </div>
                            <div className='col-6'>
                                <p>Time Remaining</p>
                                <input onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
                                    setFieldValue('timeTrackingRemaining',e.target.value)
                                }} name='timeTrackingRemaining' min='0' defaultValue='0' type='number' className='form-control' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <p>Description</p>
                <Editor
                    onEditorChange={(content) => {
                        setFieldValue('description', content)
                    }}
                    tagName='description'
                    apiKey='your-api-key'
                    onInit={(evt, editor) => editorRef.current = editor}
                    // initialValue={values.description}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
        </form>
    )
}

const formCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {

        const {arrProject,arrStatus,arrPriority,arrTaskType} = props
        
        return {
            taskName: '',
            description: '',
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign:[]
        }
    },
    validationSchema: Yup.object().shape({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({type:CREATE_TASK_SAGA,taskObject:values})
    },
    displayName: 'createTaskForm'
})(FormCreateTask);


const mapStateToProps = (state) => ({
    arrProject: state.ProjectCyberBugsReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus
})

export default connect(mapStateToProps)(formCreateTask);
