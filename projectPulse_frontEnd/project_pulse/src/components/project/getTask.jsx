import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import Url from '../url'
import { Link } from 'react-router-dom';

const GetTask = () => {
    const { id } = useParams();
    const [taskdata,setTaskdata]=useState([]);

    
    useEffect(() => {
        fetchProject();
        console.log(id);
      }, []);

      const fetchProject = async () => {
        try {
          console.log(typeof(id));
          const response = await fetch(`${Url}/task/project/${id}`);
          const data = await response.json();
          setTaskdata(data);
          
        } catch (error) {
          console.error('Error fetching Project:', error);
        }
      };
    const deleteTask=async (id)=>{

    try {
      const response = await fetch(`${Url}/task/${id}`,{
        method:'DELETE'
      });
      const data = await response.json();
      alert(`Task deleted Successfully...`);
    } catch (error) {
      alert('Error Delete data: ', error);
    }

    fetchProject();
  }

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
                <div><Link to={`/task/resource/${e.resourceId}`}><button>Resource</button></Link> </div>
                <div><Link to={`/task/update/${e.taskId}`}><button>Update</button></Link></div>
                <div><button onClick={()=>deleteTask(e.taskId)}>Delete</button></div>

              </div>
                )
            })
        }
    </div>
  )
}

export default GetTask