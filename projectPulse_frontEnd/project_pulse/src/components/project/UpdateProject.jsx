import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import Url from '../url'


const UpdateProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    password: '',
    status: '',
    role: '',
    bio: '',
    name:''
  });

  useEffect(() => {
    fetchProject();
    console.log(id);
  }, []);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${Url}/project/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Error fetching Project:', error);
    }
  };

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
    console.log(formData)
    try {
      const response = await fetch(`${Url}/project/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Project updated successfully!');
        navigate('/project');
      } else {
        alert('Error updating Project. Please try again.');
      }
    } catch (error) {
      console.error('Error updating Project:', error);
    }
  };

  return (
    <div>
      <h2>Update Project</h2>
      <form onSubmit={handleFormSubmit}  style={{display: 'flex', flexDirection: 'column'}}>
      <label> Name: <input type="text" name="p_name" value={formData.p_name} onChange={handleInputChange} /> </label>
        <label> Project Status: <input type="text" name="p_status" value={formData.p_status} onChange={handleInputChange} /> </label>
        <label> Starting Date: <input type="text" name="start_date" value={formData.start_date} onChange={handleInputChange} /> </label>
        <label> End Date: <input type="text" name="end_date" value={formData.end_date} onChange={handleInputChange} /> </label>
        <label> Manager Id: <input type="text" name="managerId" value={formData.managerId} onChange={handleInputChange} /> </label>

        <button type="submit">Update Project</button>
      </form>
    </div>
  );
}

export default UpdateProject