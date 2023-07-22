import React from 'react'
import ProjectList from './project/projectList'
import { Link } from 'react-router-dom'
const Project = () => {
  return (
    <div>
      <Link to={`/project/create`}> <h2 className='create_link'>Add New Project</h2></Link>
      <div><h2>Project Management</h2></div>
      <div className='project_child'>
      <div><h2>Project Id</h2></div>
        <div><h2>Project Name</h2></div>
        <div><h2> Project Status </h2></div>
        <div><h2>Start Date</h2></div>
        <div><h2>End Date</h2></div>
        <div><h2>Manager Id</h2></div>
        <div><h2>Task</h2></div>
        <div><h2>Update</h2></div>
        <div><h2>Delete</h2></div>

      </div>
      <ProjectList />
    </div>
  )
}

export default Project