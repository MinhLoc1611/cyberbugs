import React, { useRef, useState } from "react";
import { useSpring, animated } from 'react-spring'
import './DemoDragDrop.css'

const defaultValue = [
    { id: 1, taskName: "Task 1" },
    { id: 2, taskName: "Task 2" },
    { id: 3, taskName: "Task 3" },
    { id: 4, taskName: "Task 4" },
    { id: 5, taskName: "Task 5" },
];

export default function DemoDragDrop(props) {

    const [taskList, setTaskList] = useState(defaultValue);
    const tagDrag = useRef({})
    const tagDragEnter = useRef({})

    const [propsSpring, set, stop] = useSpring(() => ({
        from: { bottom: -25 },
        to: { bottom: 0 },
        config: {
            duration: 250,
        },
        reset: true
    }))

    const handleDragStart = (e, task, index) => {
        tagDrag.current = task;
    };

    const handleDragEnter = (e, task, index) => {

        set({ from: { bottom: -25 },
            to: { bottom: 0 } })

        tagDragEnter.current = { ...task }

        let taskListUpdate = [...taskList]

        let indexDragTag = taskListUpdate.findIndex(item => item.id === tagDrag.current.id)

        let indexDragEnter = taskListUpdate.findIndex(item => item.id === task.id)

        let temp = taskListUpdate[indexDragTag];

        taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
        taskListUpdate[indexDragEnter] = temp

        setTaskList(taskListUpdate)
    };

    const handleDragEnd = (e) => {
        
    };

    const handleDrop = (e) => { };

    return (
        <div className="container" onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
        }}
            onDrop={(e) => {
                tagDrag.current = {};
                setTaskList([...taskList])
            }}>
            <div className="text-center display-4">Task List</div>
            <div className="row">
                <div className="bg-danger p-5 col-4"></div>
                <div className="bg-dark p-5 col-4">
                    {taskList.map((task, index) => {

                        let cssDragTag = task.id === tagDrag.current.id ? 'dragTag' : '';

                        if (task.id === tagDragEnter.current.id) {
                            return <animated.div
                                style={{
                                    position: 'relative',
                                    bottom: propsSpring.bottom.to(numBottom => `${numBottom}px`)
                                }}
                                onDragStart={(e) => {
                                    handleDragStart(e, task, index);
                                }}
                                onDragEnter={(e) => {
                                    handleDragEnter(e, task, index)
                                }}
                                onDragEnd={handleDragEnd}
                                draggable="true"
                                key={index}
                                className='bg-success text-white m-1 p-3'
                            >
                                {task.taskName}
                            </animated.div>
                        }

                        return (
                            <div
                                onDragStart={(e) => {
                                    handleDragStart(e, task, index);
                                }}
                                onDragEnter={(e) => {
                                    handleDragEnter(e, task, index)
                                }}
                                onDragEnd={handleDragEnd}
                                draggable="true"
                                key={index}
                                className={`bg-success text-white m-1 p-3 ${cssDragTag}`}
                            >
                                {task.taskName}
                            </div>
                        );
                    })}
                </div>
                <div
                    className="col-4 bg-primary p-5"
                // onDragOver={(e) => {
                //     e.preventDefault();
                //     e.stopPropagation();
                // }}
                // onDrop={handleDrop}
                ></div>
            </div>
        </div>
    );
}
