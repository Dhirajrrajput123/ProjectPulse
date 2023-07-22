import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import globleData from '../globleVariable'
import { useNavigate } from 'react-router-dom';
const ResourceList = () => {

    const navigate=useNavigate();

    if(globleData.status!='login'){
        alert('you need to login 1st');
        navigate('/');
    }

  const [resource,setResource]=useState([]);

  const fetchData = async () => {
      try {
          const response = await fetch('http://127.0.0.1:5000/resource');
          const data = await response.json();
          setResource(data);
          console.log(resource);
      } catch (error) {
          alert('Error fetching data: ', error);
      }
  }

  useEffect(()=>{
      fetchData();
  },[]);

  const deleteResource=async (id)=>{
    try{
    const res=await fetch(`http://127.0.0.1:5000/resource/${id}`,{
        method:'DELETE'
    });
    if(res.status==200){
    const data=await res.json();
    alert('Resource Deleted Successfully...'); 
    fetchData();
    }
    else{
        alert('somthing went wrong...');
    }
}catch(error){
    alert("error Delete Resource... ");
}



  }

return (
  <div>
      

      <div>
          {
              resource.map((e,i)=>{
                  return (
                      <div key={e.resourceId} className='resource_child'>
                        <div>{e.resourceId}</div>
                         <div>{e.document}</div>
                         <div><a href={e.link} target="_blank">Link</a></div>    
                         {/* <div><button>Task</button></div> */}
                         <div> <Link to={`/resource/update/${e.resourceId}`}><button>Update</button></Link> </div>
                         <div><button onClick={()=>deleteResource(e.resourceId)}>Delete</button></div>

                      </div>
                  )
              })
          }
      </div>
  </div>
)
}

export default ResourceList