import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Space, Table, Tag, Popconfirm, Avatar, Popover, AutoComplete } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, UserAddOutlined, CloseOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';
import { useSelector, useDispatch } from 'react-redux';
import { GET_LIST_PROJECT_SAGA, OPEN_FORM_EDIT } from '../../../redux/constants/CyberBugs/CyberBugs';
import FormEditProject from '../../../components/Forms/FormEditProject/FormEditProject';
import { NavLink } from 'react-router-dom';


export default function ProjectManagement() {

    const projectList = useSelector(state => state.ProjectCyberBugsReducer.projectList);
    const userSearch = useSelector(state => state.UserCyberBugReducer.userSearch);
    const [value, setValue] = useState();

    const searchRef = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_LIST_PROJECT_SAGA })
    },[])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend'],
            ...getColumnSearchProps('id'),
        },
        {
            title: 'ProjectName',
            dataIndex: 'projectName',
            key: 'projectName',
            render:(text,record,index)=>{
                return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
            ...getColumnSearchProps('categoryName'),
        },
        {
            title: 'Creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color="green">{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator.name?.trim().toLowerCase();
                let creator2 = item2.creator.name?.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
        },
        {
            title: 'Members',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return <Popover key={index} placement='top' title={'Members'} content={() => {
                            return <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Avatar</th>
                                        <th>name</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members?.map((item, index) => {
                                      return  <tr key={index}>
                                            <th>{item.userId}</th>
                                            <th><img src={item.avatar} alt={item.id} width='30' height='30' style={{borderRadius:'50%'}}/></th>
                                            <th>{item.name}</th>
                                            <th>
                                            <Button onClick={()=>{
                                                dispatch({
                                                    type:'REMOVE_USER_PROJECT_API',
                                                    userProject:{
                                                        userId:item.userId,
                                                        projectId:record.id
                                                    }
                                                })
                                            }} type="primary" shape='circle' danger icon={<CloseOutlined />} size='large' />
                                            </th>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}>
                            <Avatar src={member.avatar} key={index} />
                        </Popover>
                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
                    <Popover placement="leftTop" title={'Add user'} content={() => {
                        return <AutoComplete
                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}
                            value={value}
                            onChange={(text) => {
                                setValue(text)
                            }}
                            onSelect={(valueSelect, option) => {
                                setValue(option.label)
                                dispatch({
                                    type: 'ADD_USER_PROJECT_API',
                                    userProject: {
                                        projectId: record.id,
                                        userId: valueSelect
                                    }
                                })
                            }}
                            style={{ width: '100%' }} onSearch={(value) => {
                                if(searchRef.current){
                                    clearTimeout(searchRef.current);
                                }
                                searchRef.current = setTimeout(()=>{
                                    dispatch({
                                        type: 'GET_USER_API',
                                        keyWord: value
                                    })
                                },300)
                                
                            }} />
                    }} trigger="click">
                        <Button className='btn-success' shape='circle' icon={<UserAddOutlined />}></Button>
                    </Popover>
                </div>
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space size="middle">
                    <Button onClick={() => {
                        const action = {
                            type: OPEN_FORM_EDIT,
                            title:'Edit Project',
                            Component: <FormEditProject />
                        }
                        dispatch(action)
                        const actionEditProject = {
                            type: 'EDIT_PROJECT',
                            projectEditModal: record
                        }
                        dispatch(actionEditProject)
                    }} type="primary" icon={<EditOutlined />} size='large' />
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => {
                            dispatch({ type: 'DELETE_PROJECT_SAGA', IdProject: record.id })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />} size='large' />
                    </Popconfirm>

                </Space>
            ),
        },
    ];
    return <div className='container-fluid mt-5'>
        <h3>Project Management</h3>
        <Table columns={columns} rowKey={'id'} dataSource={projectList} />
    </div>

}
