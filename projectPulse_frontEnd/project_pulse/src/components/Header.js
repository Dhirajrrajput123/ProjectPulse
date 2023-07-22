import React from 'react'
import globleData from './globleVariable'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = () => {
  const navigate=useNavigate();
  const changeGlobleVariable=()=>{
    if(globleData.status!='login'){
      alert('You are not login till now');
    }else{
    globleData.status='logOut';
    alert('Your account Log Out');
  }
    navigate('/');
  }
  return (
    <div className='header'>
         <div> <Link to={'/'}> <h3>Home</h3> </Link></div>
         <div className='header_div'>
         <Link to={'/manager'}> <h3>Manager</h3> </Link>
         <Link to={'/project'}> <h3>Project</h3> </Link>
         <Link to={'/task'}> <h3>Task</h3> </Link>
         <Link to={'/resource'}> <h3>Resource</h3> </Link>
         <h3> <button onClick={changeGlobleVariable} className='logout'>Log out</button> </h3>
         {/* <Link to={'/help'}> <h3>Help</h3> </Link> */}
         </div>
        {/* <h1>hwllo</h1> */}

    </div>
  )
}

export default Header