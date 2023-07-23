import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import globleData from './globleVariable'

import Url from './url'

const Home = () => {
  // console.log(Url);
  const navigate=useNavigate();
  const [name,setName]=useState('');
  const [pass,setPass]=useState('');
  const [auth,setAuth]=useState('');
  const handleSubmitbtn=(e)=>{
    
    if(globleData.status=='login'){
      alert('You are already logIn');
    }
    else if(name=='Admin' && pass=='Admin'){
      alert("Wecome Admin...");
      globleData.status='login';
      navigate('/manager');
    }
    else{
      alert("wrong Credential");
      navigate('/');
    }
   

  }
  return (
    <div>
        <h1>Enter your Credential</h1>
        <div className='create_new'>
          <div> <label > UserName:- <input required type="text" onChange={(e)=>setName(e.target.value)} /> </label></div>
          <div><label > Password:- <input required type="password" onChange={(e)=>setPass(e.target.value)} /> </label></div>
          <div><label > Select Authorization <select required name="" id="" onChange={(e)=>setAuth(e.target.value)} > 
          <option value="">Select Option</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          </select> </label></div>
                   
          
           <button onClick={(e)=>handleSubmitbtn(e)}> Submit</button>
        </div>

    </div>
  )
}

export default Home