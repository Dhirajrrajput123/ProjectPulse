import React from 'react'
import TaskList from './task/TaskList'
import { Link } from 'react-router-dom'

const Task = () => {
  return (
    <div>
      <div><h2>Task Management</h2></div>
      <div><Link to={'/task/create'}><h2>Create new Task</h2></Link></div>

      <div className='task_child'>
        <div><h2>Task Name</h2></div>
        <div><h2> Task Status</h2></div>
        <div><h2>Project Id</h2></div>
        <div><h2>Resource Id</h2></div>        
        <div><h2>Resource</h2></div>
        <div><h2>Update</h2></div>
        <div><h2>Delete</h2></div>

      </div>
      <TaskList />
    </div>
  )
}

export default Task