import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
     const navigate = useNavigate();

     const [formData,setFormData]=useState({
      't_name':'',
      't_status':'',
      'projectId':'',
      'resourceId':'',
      'developerId':''  
    });
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };


    
const handleFormSubmit = async (event) => {
  event.preventDefault();

  console.log(formData)
  try {
    const response = await fetch(`http://127.0.0.1:5000/task`, {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status==200) {
      alert('Task added successfully!');
      navigate('/task');
    } else {
      const res=await response.json();
      alert('Error adding Task. Please try again.');
      console.log(res);
    }
  } catch (error) {
    console.error('Error adding Task:', error);
  }
};


  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleFormSubmit}  style={{display: 'flex', flexDirection: 'column'}}>
      <label> Name: <input type="text" name="t_name" value={formData.t_name} onChange={handleInputChange} /> </label>
        <label> Status: <input type="text" name="t_status" value={formData.t_status} onChange={handleInputChange} /> </label>
        <label> Project Id: <input type="text" name="projectId" value={formData.projectId} onChange={handleInputChange} /> </label>
        <label> Developer Id: <input type="text" name="developerId" value={formData.developerId} onChange={handleInputChange} /> </label>
        <label> Resource Id: <input type="text" name="resourceId" value={formData.resourceId} onChange={handleInputChange} /> </label>

        <button type="submit">Create Task</button>
      </form>
    </div>
  )
}

export default CreateTask