import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateTask = () => {

  const {id}=useParams();
  const navigate=useNavigate();

  const [formData,setFormData]=useState({
    't_name':'',
    't_status':'',
    'projectId':'',
    'resourceId':'',
    'developerId':''

  });

  useEffect(()=>{
    fetchPortfolioManager();
    console.log(id);
  },[]);

  const fetchPortfolioManager=async ()=>{
    try {
      const response = await fetch(`http://127.0.0.1:5000/task/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching Task:', error);
    }
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    delete formData._id;
    delete formData.taskId;
    console.log(formData)
    try {
      const response = await fetch(`http://127.0.0.1:5000/task/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status==200) {
        alert('Portfolio Manager updated successfully!');
        navigate('/task');
      } else {
        alert('Error updating Task. Please try again.');
      }
    } catch (error) {
      console.error('Error updating Task:', error);
    }
  };





  return (

    <div>
      <h2>Update Task</h2>
      <form onSubmit={handleFormSubmit}  style={{display: 'flex', flexDirection: 'column'}}>
      <label> Name: <input type="text" name="t_name" value={formData.t_name} onChange={handleInputChange} /> </label>
        <label> Status: <input type="text" name="t_status" value={formData.t_status} onChange={handleInputChange} /> </label>
        <label> Project Id: <input type="text" name="projectId" value={formData.projectId} onChange={handleInputChange} /> </label>
        <label> Developer Id: <input type="text" name="developerId" value={formData.developerId} onChange={handleInputChange} /> </label>
        <label> Resource Id: <input type="text" name="resourceId" value={formData.resourceId} onChange={handleInputChange} /> </label>

        <button type="submit">Update Task</button>
      </form>
    </div>
  );      
}

export default UpdateTask