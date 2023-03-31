import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import { Layout } from 'antd';


export const UserLoginTemplate = (props) =>{

    const [{width,height},setSize] = useState({width:Math.round(window.innerWidth),height:Math.round(window.innerHeight)})

    useEffect(()=>{
        window.onresize = ()=>{
            setSize({
                width:Math.round(window.innerWidth),
                height:Math.round(window.innerHeight)
            })
        }
    })

    let {Component,...restRoute} = props;

    const { Sider, Content } = Layout;

    return <Route {...restRoute} render={(propsRoute)=>{
        return <>
            <Layout>
                <Sider width={width/2} style={{height:height,backgroundImage:`url(https://picsum.photos/${Math.round(width/2)}/${height})`, backgroundSize:'cover'}}>
                </Sider>
                <Content>
                    <Component {...propsRoute}/>
                </Content>
        </Layout>
        </>
    }}/>
}