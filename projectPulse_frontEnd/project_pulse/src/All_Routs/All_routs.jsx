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
const All_routs = () => {
  return (
    <div>
           <Header/>
          <Routes>
         

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
         </Routes>

    

    </div>
  )
}

export default All_routs