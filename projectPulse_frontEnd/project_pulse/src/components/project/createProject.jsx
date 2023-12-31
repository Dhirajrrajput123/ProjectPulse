import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Url from '../url'

const CreateProject = () => {
  const navigate = useNavigate();
 

  const [formData, setFormData] = useState({
    p_name: '',
    p_status: '',
    start_date: '',
    end_date: '',
    managerId:0
  });

  // useEffect(() => {
  //   fetchProject();
  //   console.log(id);
  // }, []);

 
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
  delete formData.projectId;
  formData.managerId=+(formData.managerId);
  console.log(formData)
  try {
    const response = await fetch(`${Url}/project`, {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status==200) {
      alert('Project added successfully!');
      navigate('/project');
    } else {
      alert('Error adding Project. Please try again.');
    }
  } catch (error) {
    console.error('Error adding Project:', error);
  }
};



  return (
    <div>
      <h2>Add new Project</h2>
      <form onSubmit={handleFormSubmit}  style={{display: 'flex', flexDirection: 'column'}} className='create_new'>
      <label> Name: <input required type="text" name="p_name" value={formData.p_name} onChange={handleInputChange} /> </label>
        <label> Project Status: <input required type="text" name="p_status" value={formData.p_status} onChange={handleInputChange} /> </label>
        <label> Starting Date: <input required type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} /> </label>
        <label> End Date: <input required type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} /> </label>
        <label> Manager Id: <input required type="number" name="managerId" value={formData.managerId} onChange={handleInputChange} /> </label>

        <button type="submit">Update Project</button>
      </form>
    </div>
  )
}

export default CreateProject