import React,{useState,useEffect} from 'react'

const ResourceList = () => {
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

return (
  <div>
      

      <div>
          {
              resource.map((e,i)=>{
                  return (
                      <div key={e.resourceId} className='resource_child'>

                         <div>{e.document}</div>
                         <div><a href="{e.link}">Link</a></div>    
                         <div><button>Task</button></div>
                         <div><button>Update</button></div>
                         <div><button>Delete</button></div>

                      </div>
                  )
              })
          }
      </div>
  </div>
)
}

export default ResourceList