import React from 'react'
import { useDispatch } from 'react-redux';
import { GET_TASK_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../../../redux/constants/CyberBugs/TaskConstants';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

export default function ContentMain(props) {

    const dispatch = useDispatch()

    const { projectDetail } = props;

    const handleDragEnd = (result) => {
        let {projectId,taskId} = JSON.parse(result.draggableId) 
        let {destination,source} = result

        if(!destination){
            return
        }
        
        if(destination.index === source.index && destination.droppableId === source.droppableId){
            return
        }

        dispatch({
            type:UPDATE_STATUS_TASK_SAGA,
            taskStatusUpdate:{
                taskId,
                statusId:destination.droppableId,
                projectId
            }
        })
    }

    const renderCardTaskList = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {
                projectDetail.lstTask?.map((taskListDetail, index) => {
                    return <Droppable key={index} droppableId={taskListDetail.statusId}>
                        {(provided) => {
                            return <div
                                className="card pb-2" style={{ width: '17rem', height: 'auto' }}>
                                <div className="card-header">
                                    {taskListDetail.statusName}
                                </div>
                                <div ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    key={index} className="list-group list-group-flush"
                                    style={{height:'100%'}}>
                                    {taskListDetail.lstTaskDeTail.map((task, index) => {
                                        return <Draggable
                                            key={task.taskId.toString()}
                                            index={index}
                                            draggableId={JSON.stringify({projectId:task.projectId,taskId:task.taskId})}
                                        >
                                            {(provided) => {
                                                return <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    onClick={() => {
                                                        dispatch({
                                                            type: GET_TASK_DETAIL_SAGA,
                                                            taskId: task.taskId
                                                        })
                                                    }} key={index} className="list-group-item" data-toggle="modal" data-target="#infoModal">
                                                    <p>
                                                        {task.taskName}
                                                    </p>
                                                    <div className="block" style={{ display: 'flex' }}>
                                                        <div className="block-left">
                                                            <p className='text-danger'>
                                                                {task.priorityTask.priority}
                                                            </p>
                                                        </div>
                                                        <div className="block-right">
                                                            <div className="avatar-group" style={{ display: 'flex' }}>
                                                                {task.assigness.map((mem, index) => {
                                                                    return <div className='avatar' key={index}>
                                                                        <img src={mem.avatar} alt={mem.avatar} />
                                                                    </div>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }}
                                        </Draggable>
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>
                        }}

                    </Droppable>
                })
            }
        </DragDropContext>
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderCardTaskList()}
        </div>
    )
}

