import React from "react";
import { Route } from "react-router-dom";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberBugs from "../../components/Cyberbugs/ModalCyberBugs/ModalCyberBugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";
import '../../index.css'


export const CyberbugsTemplate = (props) => {

    const { Component, ...restParam } = props;

    return <Route {...restParam} render={(propsRoute) => {
        return <>
            <div className="jira">

                {/* Sider Bar  */}
                <SidebarCyberbugs />
                {/* Menu */}
                <MenuCyberbugs />
                {/* {/* {/* Main Board * /} * /} */}
                <Component {...propsRoute}/>


            </div>

            <ModalCyberBugs/>

        </>
    }} />
}