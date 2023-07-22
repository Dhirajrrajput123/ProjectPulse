import React,{useEffect,useState} from 'react'
import { useNavigate,useParams } from 'react-router-dom'


const UpdateResource = () => {
  const navigate=useNavigate();
  const {id}=useParams();

  const [formData,setFormData]=useState({
    "document":"",
    "link":""
  });

  useEffect(() => {
    fetchProject();
    console.log(id);
  }, []);
  
  const fetchProject = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/resource/${id}`);
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
    delete formData.resourceId;
    console.log(formData)
    try {
      const response = await fetch(`http://127.0.0.1:5000/resource/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Resource updated successfully!');
        navigate('/resource');
      } else {
        alert('Error resource Project. Please try again.');
      }
    } catch (error) {
      console.error('Error resource Project:', error);
    }
  };

  return (
    <div>
      <h2>Update Resource</h2>
      <form onSubmit={handleFormSubmit}  style={{display: 'flex', flexDirection: 'column'}}>
        <label> Documents: <input type="text" name="document" value={formData.document} onChange={handleInputChange} /> </label>
        <label> Link: <input type="text" name="link" value={formData.link} onChange={handleInputChange} /> </label>
        
        <button type="submit">Update Resource</button>
      </form>
    </div>
  )
}

export default UpdateResource