import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const CreateResource = () => {

  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    "document":"",
    "link":""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit=async (event)=>{
    event.preventDefault();

    console.log(formData)
    try {
      const response = await fetch(`http://127.0.0.1:5000/resource`, {
        method: 'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status==200) {
        alert('resource added successfully!');
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
      <h2>Create Resource</h2>
      <form onSubmit={handleFormSubmit}  style={{display: 'flex', flexDirection: 'column'}} className='create_new'>
        <label> Documents: <input type="text" name="document" value={formData.document} onChange={handleInputChange} /> </label>
        <label> Link: <input type="text" name="link" value={formData.link} onChange={handleInputChange} /> </label>
        
        <button type="submit">Create Resource</button>
      </form>
    </div>
  )
}

export default CreateResource