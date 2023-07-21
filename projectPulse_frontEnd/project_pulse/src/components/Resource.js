import React from 'react'
import ResourceList from './resource/ResourceList'
const Resource = () => {
  return (
    <div>
      <div><h2>Resource Management</h2></div>
      <div className='resource_child'>
        <div><h2>Document</h2></div>       
        <div><h2>Resource Link</h2></div>
        <div><h2>Task</h2></div>
        <div><h2>Update</h2></div>
        <div><h2>Delete</h2></div>

      </div>
      <ResourceList/>
    </div>
  )
}

export default Resource