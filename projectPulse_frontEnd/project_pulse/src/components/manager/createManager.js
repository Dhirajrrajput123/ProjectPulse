import React,{useState} from 'react'

const CreateManager = (props) => {
    const [name,setName]=useState("");
    const [role,setRole]=useState("");
    const [bio,setBio]=useState("");
    
    const createManager=async ()=>{
        const mang={name,role,bio}
        try{
            const response=await fetch('http://127.0.0.1:5000/manager',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(mang)
            });
            const data=await response.json();   
            alert("Manager added Successfully");
            setName("");
            setBio("");
            setRole("")   
            props.fetchData();         
        }catch(error){
            alert('Error fetching data: ',error);
        }
        

    }
  return (
    <div>
        <h2>Create Manager</h2>
        <div className='create_new'>
       <div><label htmlFor="">Name:- </label><input type="text" required value={name} onChange={(e)=>{setName(e.target.value)}} /> </div>
       <div><label htmlFor="">Role:- </label><input type="text" required value={role} onChange={(e)=>{setRole(e.target.value)}} /> </div>
       <div><label htmlFor="">Bio:-</label><input type="text" required value={bio} onChange={(e)=>{setBio(e.target.value)}} /> </div>
        <button onClick={createManager}>Submit</button>
        </div>
    </div>
  )
}

export default CreateManager