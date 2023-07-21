import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';


const GetTask = () => {
    const { id } = useParams();
    const [taskdata,setTaskdata]=useState([]);

    
    useEffect(() => {
        fetchProject();
        console.log(id);
      }, []);

      const fetchProject = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:5000/task/project/${id}`);
          const data = await response.json();
          setTaskdata(data);
          
        } catch (error) {
          console.error('Error fetching Project:', error);
        }
      };


  return (
    <div>
        <h2>Task which is assign to the project Id:- {id}</h2>
        <div className='task_child'>
        <div><h2>Task Name</h2></div>
        <div><h2> Task Status</h2></div>
        <div><h2>Project Id</h2></div>
        <div><h2>Resource Id</h2></div>        
        <div><h2>Resource</h2></div>
        <div><h2>Update</h2></div>
        <div><h2>Delete</h2></div>

      </div>
        {
            taskdata.map((e,index)=>{
                return (
                    <div key={e.taskId} className='task_child'>

                <div>{e.t_name}</div>
                <div>{e.t_status}</div>
                <div>{e.projectId}</div>
                <div>{e.resourceId}</div>
                <div><button>Resource</button></div>
                <div><button>Update</button></div>
                <div><button>Delete</button></div>

              </div>
                )
            })
        }
    </div>
  )
}

export default GetTask