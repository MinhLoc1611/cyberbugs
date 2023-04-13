import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Space, Table, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { DELETE_USER_CYBER_API, GET_USER_CYBER_API, GET_USER_EDIT_CYBER } from '../../../redux/constants/CyberBugs/UserConstants';
import { OPEN_FORM_EDIT } from '../../../redux/constants/CyberBugs/CyberBugs';
import FormEditUserCyber from '../../../components/Forms/FormEditUserCyber/FormEditUserCyber';

export default function UserManagement() {

    const { listUserCyber } = useSelector(state => state.UserCyberBugReducer)

    const [searchKeyWord, setSearchKeyWord] = useState({
        keyWord:''
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: GET_USER_CYBER_API,
            keyWord: ''
        })
    }, [])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'userId',
            key: 'userId',
            sorter: (item2, item1) => {
                return item2.userId - item1.userId;
            },
            sortDirections: ['descend']
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',

        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button onClick={() => {
                        const action ={
                            type:OPEN_FORM_EDIT,
                            title:'Edit User Cyber',
                            Component:<FormEditUserCyber/>
                        }
                        dispatch(action)
                        const actionUser={
                            type:GET_USER_EDIT_CYBER,
                            userEdit:record
                        }
                        dispatch(actionUser)
                    }} type="primary" icon={<EditOutlined />} size='large' />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                            dispatch({
                                type: DELETE_USER_CYBER_API,
                                userId:record.userId
                            })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} size='large' />
                    </Popconfirm>

                </Space>
            ),
        }
    ];
    return (
        <div className='container mt-4'>
            <NavLink style={{ fontSize: '24px' }} className="nav-link" to="/signup">Create User</NavLink>
            <div className='row my-4'>
                <div className='col-10'>
                    <input onChange={(e)=>{
                        setSearchKeyWord({
                            keyWord:e.target.value
                        })
                    }} name='keyWord' value={searchKeyWord.keyWord} placeholder='search...' className='form-control' />
                </div>
                <div className='col-2'>
                    <button onClick={()=>{
                        dispatch({
                            type:GET_USER_CYBER_API,
                            keyWord:searchKeyWord.keyWord
                        })
                        setSearchKeyWord({
                            keyWord:''
                        })
                    }} className='btn btn-primary'>Search</button>
                </div>
            </div>

            <Table columns={columns} rowKey={'userId'} dataSource={listUserCyber} />
        </div>
    )
}
