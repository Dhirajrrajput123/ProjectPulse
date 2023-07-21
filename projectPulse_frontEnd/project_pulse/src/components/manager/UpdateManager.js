import React, {useEffect, useState} from 'react'
// import axios from axios;
import Manager from '../Manager';

const initialData={"bio":"", "managerId":0,"name":"", "role":"", "start_data":"","status":true};

const UpdateManager = (props) => {
    const [update_manager,setUpdate_manager]=useState(initialData);
    const [flag,setFlag]=useState(false);
    useEffect(()=>{
      const manager=JSON.parse(localStorage.getItem('manager')) || initialData;
      // console.log(manager);
      setUpdate_manager(manager);
    },[flag]);
    // <input defaultValue={manager.role} type="text" required  />
const handleSubmit=(e)=>{
   e.preventDefault()
   console.log(update_manager)
    //  axios.put(`http://127.0.0.1:5000/manager/${update_manager.managerId}`,{update_manager},{ headers:{
    //   "Accept":"application/json",
    //   "Content-Type":'application/json'
    // }}).then((res)=>{console.log(res)});
    function putManager(){

    fetch(`http://127.0.0.1:5000/manager/${update_manager.managerId}`,{
      method:'PUT',
      headers:{
        "Accept":"application/json",
        "Content-Type":'application/json'
      },
      body:JSON.stringify(update_manager)
    }).then((res)=>{console.log(res.status); res.json()}).then((data)=>{console.log(data)});
    
    alert("successfully");
   }
   putManager();
}

const handleCHange=(e)=>{
      const {name,value}=e.target;
      setUpdate_manager((pre)=>({...pre,[name]:value}));
     
}
const handlecheckbox=(e)=>{
  console.log(e.target.checked);
      setUpdate_manager((pre)=>({...pre,status:e.target.checked}));
      setFlag(!flag);
}

  return (
    <div>
        <h2>Update Manager</h2>
        <form onSubmit={handleSubmit}>
       <div><label htmlFor="">Manager Id:- </label><input onChange={handleCHange} value={update_manager.managerId} type="number" required disabled /> </div>
       <div><label htmlFor="">Name:- </label><input name="name" onChange={handleCHange} defaultValue={update_manager.name} type="text" required  /> </div>
       <div><label htmlFor="">Role:- </label> 
       <select  onChange={handleCHange} name="role" id="role" defaultValue={update_manager.role}>
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        </select></div>
       <div><label htmlFor="">Bio:-</label><input name="bio" onChange={handleCHange} defaultValue={update_manager.bio} type="text" required   /> </div>
       <div><label htmlFor="">Start-Date:- </label><input name="start_data" onChange={handleCHange} defaultValue={update_manager.start_data} type="date" required/> </div>
       <div><label htmlFor="">Status:-</label><input type='checkbox' ischecked={update_manager.status} onChange={handlecheckbox}  /> </div>
       <div><label htmlFor=""></label> <input type="submit"/></div>
        </form>
    </div>
  )
}

export default UpdateManager