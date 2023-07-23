import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import globleData from '../globleVariable'
import { useNavigate } from 'react-router-dom';
import Url from '../url'

const TaskList = () => {

    const navigate=useNavigate();

    if(globleData.status!='login'){
        alert('you need to login 1st');
        navigate('/');
    }

  const [task, setTask] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${Url}/task`);
      const data = await response.json();
      setTask(data);
      // console.log(task);
    } catch (error) {
      alert('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


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

    fetchData();
  }
  return (
    <div>
      <div>
        {
          task.map((e, i) => {
            return (
              <div key={e.taskId} className='task_child'>

                <div>{e.t_name}</div>
                <div>{e.t_status}</div>
                <div>{e.projectId}</div>
                <div>{e.resourceId}</div>
                <div> <Link to={`/task/resource/${e.resourceId}`}><button>Resource</button></Link> </div>
                <div><Link to={`/task/update/${e.taskId}`}><button>Update</button></Link></div>
                <div><button onClick={()=>deleteTask(e.taskId)}>Delete</button></div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default TaskList