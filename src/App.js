import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import ModalCyberBugs from "./components/Cyberbugs/ModalCyberBugs/ModalCyberBugs";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/DrawerCyberbugs";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Todolist from "./pages/Todolist/Todolist";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import IndexCyberBugs from "./redux/sagas/CyberBugs/IndexCyberBugs";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";

function App() {

    const history = useHistory();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({
            type:'ADD_HISTORY',
            history
        })
    },)

  return (
    <>
        <ModalCyberBugs/>
        <DrawerCyberbugs/>
        
      <Switch>
        <HomeTemplate exact path='/home' Component={Home}/>
        <HomeTemplate exact path='/contact' Component={Contact}/>
        <HomeTemplate exact path='/about' Component={About}/>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs}/>
        <HomeTemplate exact path="/detail/:id" Component={Detail}/>
        <Route exact path="/todolistrcc" component={Todolist}/>
        <Route exact path="/todolistrfc" component={TodolistRFC}/>
        <HomeTemplate exact path="/demohocmodal" Component={DemoHOCModal}/>
        <CyberbugsTemplate exact path='/cyberbugs' Component={IndexCyberBugs}/>
        <CyberbugsTemplate exact path='/createproject' Component={CreateProject}/>
        <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement}/>
        <HomeTemplate exact path="/" Component={Home}/>
        <HomeTemplate path="*" Component={Home}/>
      </Switch>
    </>
  );
}

export default App;
