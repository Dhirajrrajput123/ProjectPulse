import React from 'react'
import { Route,Routes } from 'react-router-dom'
import ManagerList from '../components/manager/managerList'
import CreateManager from '../components/manager/createManager'
import UpdateManager from '../components/manager/UpdateManager'
import Task from '../components/Task'
import Resource from '../components/Resource'
import Project from '../components/Project'
import Error from '../components/Error'
import Header from '../components/Header'
import Manager from '../components/Manager'
import Help from '../components/Help'
import Home from '../components/Home'

import UpdateProject from '../components/project/UpdateProject'
import CreateProject from '../components/project/createProject'
import GetTask from '../components/project/getTask'
import UpdateTask from '../components/task/UpdateTask'

import CreateTask from '../components/task/CreateTask'

import CreateResource from '../components/resource/CreateResource'

import GetResource from '../components/task/GetResource'
import UpdateResource from '../components/resource/UpdateResource'


const All_routs = () => {
  return (
    <div>
           <Header/>
          <Routes>
            {/* {Home} */}
          <Route path="/" element={<Home/>}/>

          {/* Manager */}
             <Route path="/manager" element={<Manager/>}/>

          {/* About   */}
             <Route path="/project" element={<Project/>} />

          {/* contect        */}
              <Route path="/task" element={<Task/>}/>

          {/* help      */}
              <Route path="/resource" element={<Resource/>}/>

          {/* Help */}
              <Route path="/help" element={<Help/>}/>
          {/* Error      */}
              <Route path="*" element={<Error/>}/>

              {/* Error      */}
              <Route path="/manager/update/:id" element={<UpdateManager/>}/>

              <Route path="/project/update/:id" element={<UpdateProject/>}/>

              <Route path="/task/update/:id" element={<UpdateTask/>}/>

              <Route path="/project/task/:id" element={<GetTask/>}/>

              <Route path="/project/create" element={<CreateProject/>}/>

              <Route path="/task/create" element={<CreateTask/>}/>

              <Route path="/task/resource/:id" element={<GetResource/>}/>

              <Route path="/resource/update/:id" element={<UpdateResource/>}/>
              <Route path="/resource/create" element={<CreateResource/>}/>
         </Routes>

    

    </div>
  )
}

export default All_routs