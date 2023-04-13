import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import { GET_ALL_STATUS_SAGA } from '../../../redux/constants/CyberBugs/StatusConstants'
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/constants/CyberBugs/PriorityConstants'
import { CHANGE_TASK_ASSIGNESS, CHANGE_TASK_MODAL, DELETE_COMMENT_TASK_SAGA, HANDLE_CHANGE_POST_API_SAGA, INSERT_COMMENT_TASK_SAGA, REMOVE_USER_ASSIGN, UPDATE_COMMENT_TASK_SAGA } from '../../../redux/constants/CyberBugs/TaskConstants'
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/constants/CyberBugs/TaskTypeConstants'
import { Editor } from '@tinymce/tinymce-react'
import { Select } from 'antd';

export default function ModalCyberBugs(props) {

    const userLogin = useSelector(state=>state.UserCyberBugReducer.userLogin);
    const { taskDetailModal } = useSelector(state => state.TaskReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer)
    const [visibleEditor, setVisibleEditor] = useState(false)
    const [visibleComment, setVisibleComment] = useState({idComment:''});
    const [content, setContent] = useState(taskDetailModal.description);
    const [comment, setComment] = useState({
        contentComment: ''
    })
    const [updateComment, setupdateComment] = useState({
        contentComment: ''
    })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA })
        dispatch({ type: GET_ALL_PRIORITY_SAGA })
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
    }, [])

    const editorRef = useRef();

    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        return <div>
            {visibleEditor ? <div> <Editor
                onEditorChange={(content) => {
                    setContent(content)
                }}
                tagName='description'
                apiKey='your-api-key'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={taskDetailModal.description}
                init={{
                    height: 300,
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
                <button className='btn btn-primary m-2' onClick={() => {

                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })

                    // dispatch({
                    //     type: CHANGE_TASK_MODAL,
                    //     name: 'description',
                    //     value: content
                    // })
                    setVisibleEditor(false)
                }}>Save</button>
                <button className='btn btn-danger m-2' onClick={() => {
                    setVisibleEditor(false)
                }}>Close</button>
            </div> : <div className='my-2' style={{ cursor: 'pointer' }} onClick={() => {
                setVisibleEditor(true)
            }}> {jsxDescription} </div>}

        </div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })

        // dispatch({
        //     type: CHANGE_TASK_MODAL,
        //     name,
        //     value
        // })
    }

    const renderTimeTracking = () => {

        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining)
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h estimated</p>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-6">
                    <input type='number' className='form-control' name='timeTrackingSpent' onChange={handleChange} />
                </div>
                <div className='col-6'>
                    <input type='number' className='form-control' name='timeTrackingRemaining' onChange={handleChange} />
                </div>
            </div>
        </div>
    }

    return (
        <>

            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title">
                                <select name='typeId' value={taskDetailModal.typeId} onChange={handleChange}>
                                    {arrTaskType?.map((taskType, index) => {
                                        return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                                    })}
                                </select>
                                <br />
                                <i className="fa fa-bookmark mt-2" />
                                <span>{taskDetailModal.taskName}</span>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue">This is an issue of type: Task.</p>
                                        <div className="description">
                                            <p>Description</p>
                                            {renderDescription()}
                                        </div>
                                        <div className="comment">
                                            <h6>Comment</h6>
                                            <div className="block-comment mb-3" style={{ display: 'flex' }}>
                                                <div className="avatar">
                                                    <img src={userLogin?.avatar} alt={userLogin?.avatar} />
                                                </div>
                                                <div>
                                                    <Editor
                                                        onEditorChange={(content) => {
                                                            setComment({
                                                                contentComment: content
                                                            })
                                                        }}
                                                        tagName='comment'
                                                        apiKey='your-api-key'
                                                        onInit={(evt, editor) => editorRef.current = editor}
                                                        value={comment.contentComment}
                                                        init={{
                                                            height: 150,
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
                                                    <div className='my-2'>
                                                        <button onClick={() => {

                                                            const action = {
                                                                type: INSERT_COMMENT_TASK_SAGA,
                                                                taskComment: {
                                                                    taskId: taskDetailModal.taskId,
                                                                    contentComment: comment.contentComment
                                                                },
                                                                projectId: taskDetailModal.projectId
                                                            }
                                                            dispatch(action)
                                                            setComment({
                                                                contentComment: ''
                                                            })                                                     
                                                        }} className='btn btn-primary mr-2'>Comment</button>
                                                        <button onClick={() => {
                                                            setComment({
                                                                contentComment: ''
                                                            })
                                                        }} className='btn btn-secondary'>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="lastest-comment">
                                                <div className="comment-item">
                                                    {taskDetailModal.lstComment?.map((item, index) => {
                                                        const jsxCommentContent = ReactHtmlParser(item.commentContent)
                                        
                                                        return <div key={index} className="display-comment" style={{ display: 'flex' }}>
                                                            <div className="avatar">
                                                                <img src={item.avatar} alt={item.avatar} />
                                                            </div>
                                                            <div>
                                                                {visibleComment.idComment === item.id ? <div> <Editor
                                                                    onEditorChange={(content) => {
                                                                        setupdateComment({
                                                                            contentComment: content
                                                                        })
                                                                    }}
                                                                    tagName='updateComment'
                                                                    apiKey='your-api-key'
                                                                    onInit={(evt, editor) => editorRef.current = editor}
                                                                    initialValue={item.commentContent}
                                                                    init={{
                                                                        height: 150,
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
                                                                    <button className='btn btn-primary m-2' onClick={() => {
                                                                        const action = {
                                                                            type: UPDATE_COMMENT_TASK_SAGA,
                                                                            commentUpdate: {
                                                                                id: item.id,
                                                                                contentComment: updateComment.contentComment
                                                                            },
                                                                            taskId: taskDetailModal.taskId,
                                                                            projectId: taskDetailModal.projectId
                                                                        }
                                                                        dispatch(action)
                                                                        setVisibleComment({idComment:''})
                                                                    }}>Save</button>
                                                                    <button className='btn btn-secondary' onClick={() => {
                                                                        setVisibleComment({idComment:''})
                                                                    }}>Cancel</button>
                                                                </div> : <div>
                                                                    <p style={{ marginBottom: 5 }}>
                                                                        {jsxCommentContent}
                                                                    </p>
                                                                    <div>
                                                                        <span onClick={() => {
                                                                            setVisibleComment({idComment:item.id})
                                                                            
                                                                        }} style={{ cursor: 'pointer' }} className='text-info mr-1'>Edit</span>
                                                                        •
                                                                        <span onClick={() => {
                                                                            const action = {
                                                                                type: DELETE_COMMENT_TASK_SAGA,
                                                                                idComment: item.id,
                                                                                taskId: taskDetailModal.taskId,
                                                                                projectId: taskDetailModal.projectId
                                                                            }
                                                                            dispatch(action)
                                                                        }} style={{ cursor: 'pointer' }} className='text-danger ml-1'>Delete</span>
                                                                    </div>
                                                                </div>}
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select name='statusId' value={taskDetailModal.statusId} onChange={(e) => {
                                                handleChange(e)
                                            }} className="custom-select">
                                                {arrStatus.map((statusItem, index) => {
                                                    return <option key={index} value={statusItem.statusId}>
                                                        {statusItem.statusName}
                                                    </option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div className='row my-2'>
                                                {taskDetailModal.assigness.map((user, index) => {
                                                    return <div key={index} className='col-6 my-1'>
                                                        <div style={{ display: 'flex' }} className="item">
                                                            <div className="avatar">
                                                                <img src={user.avatar} alt={user.avatar} />
                                                            </div>
                                                            <p className="name mt-1 ml-1">
                                                                {user.name}
                                                                <i onClick={() => {
                                                                    dispatch({
                                                                        type: HANDLE_CHANGE_POST_API_SAGA,
                                                                        actionType: REMOVE_USER_ASSIGN,
                                                                        userId: user.id
                                                                    })

                                                                    // dispatch({
                                                                    //     type:REMOVE_USER_ASSIGN,
                                                                    //     userId:user.id
                                                                    // })
                                                                }} className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                })}
                                                <div className='col-6 my-1'>
                                                    <Select
                                                        options={projectDetail.members?.filter(mem => {
                                                            let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId)
                                                            if (index !== -1) {
                                                                return false
                                                            }
                                                            return true
                                                        }).map((mem, index) => {
                                                            return { value: mem.userId, label: mem.name }
                                                        })}
                                                        optionFilterProp='label'
                                                        value='+ Add more'
                                                        style={{ width: '100%' }}
                                                        name='lstUser'
                                                        onSelect={(value) => {

                                                            // eslint-disable-next-line eqeqeq
                                                            let userSelected = projectDetail.members.find(mem => mem.userId == value);
                                                            userSelected = { ...userSelected, id: userSelected.userId }

                                                            dispatch({
                                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                                actionType: CHANGE_TASK_ASSIGNESS,
                                                                userSelected
                                                            })

                                                            // dispatch({
                                                            //     type: CHANGE_TASK_ASSIGNESS,
                                                            //     userSelected
                                                            // })
                                                        }}>

                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="priority" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select name='priorityId' className='form-control' value={taskDetailModal.priorityId} onChange={(e) => {
                                                handleChange(e)
                                            }}>
                                                {arrPriority?.map((priority, index) => {
                                                    return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input name='originalEstimate' type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} onChange={(e) => {
                                                handleChange(e)
                                            }} />
                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {
                                                renderTimeTracking()
                                            }

                                        </div>
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}


