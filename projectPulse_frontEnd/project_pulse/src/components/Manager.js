import React from 'react'
import ManagerList from './manager/managerList'

const Manager = () => {
  return (
    <div>
    <div className='manager_child'> 
            <div><h2>Id</h2></div>
            <div><h2>Name</h2></div>
            <div><h2>Job</h2></div>
            <div><h2>Role</h2></div>
            <div><h2>Start Date</h2></div>
            <div><h2>Status</h2></div>
            <div><h2>Update</h2></div>
            <div><h2>Delete</h2></div>
            </div>
    <ManagerList/>

    </div>
  )
}

export default Manager