import React from 'react'
import { Button, Drawer, Space } from 'antd';
import {useSelector,useDispatch} from 'react-redux'

export default function DrawerCyberbugs(props) {

    const {setOpen,ComponentContentDrawer,callBackSubmit} = useSelector(state=>state.DrawerReducer)

    const dispatch = useDispatch();

      const onClose = () => {
        dispatch({
            type:'CLOSE_DRAWER'
        })
      };

    return (
        <>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={setOpen}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {ComponentContentDrawer}
            </Drawer>
        </>
    );
}
