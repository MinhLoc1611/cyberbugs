import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, useHistory } from "react-router-dom";
import ModalCyberBugs from "./components/Cyberbugs/ModalCyberBugs/ModalCyberBugs";
import DrawerCyberbugs from "./HOC/CyberbugsHOC/DrawerCyberbugs";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import IndexCyberBugs from "./pages/CyberBugs/ProjectDetail/IndexCyberBugs";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import SignUpCyberBugs from "./pages/CyberBugs/SignUpCyberBugs/SignUpCyberBugs";
import UserManagement from "./pages/CyberBugs/UserManagement/UserManagement";

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
        <HomeTemplate exact path='/dragdrop' Component={DemoDragDrop}/>
        <HomeTemplate exact path='/dragdropdnd' Component={DragAndDropDnD}/>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs}/>
        <UserLoginTemplate exact path="/signup" Component={SignUpCyberBugs}/>
        <HomeTemplate exact path="/detail/:id" Component={Detail}/>
        <HomeTemplate exact path="/demohocmodal" Component={DemoHOCModal}/>
        <CyberbugsTemplate exact path='/cyberbugs' Component={IndexCyberBugs}/>
        <CyberbugsTemplate exact path='/createproject' Component={CreateProject}/>
        <CyberbugsTemplate exact path='/projectmanagement' Component={ProjectManagement}/>
        <CyberbugsTemplate exact path='/usermanagement' Component={UserManagement}/>
        <CyberbugsTemplate exact path='/projectdetail/:projectId' Component={IndexCyberBugs}/>
        <HomeTemplate exact path="/" Component={Home}/>
        <HomeTemplate path="*" Component={Home}/>
      </Switch>
    </>
  );
}

export default App;
