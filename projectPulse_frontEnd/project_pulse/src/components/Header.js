import React from 'react'

import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
         <div> <Link to={'/'}> <h3>Home</h3> </Link></div>
         <div className='header_div'>
         <Link to={'/manager'}> <h3>Manager</h3> </Link>
         <Link to={'/project'}> <h3>Project</h3> </Link>
         <Link to={'/task'}> <h3>Task</h3> </Link>
         <Link to={'/resource'}> <h3>Resource</h3> </Link>
         <Link to={'/help'}> <h3>Help</h3> </Link>
         </div>
        {/* <h1>hwllo</h1> */}

    </div>
  )
}

export default Header