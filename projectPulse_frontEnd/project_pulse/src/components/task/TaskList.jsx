import React, { useState, useEffect } from 'react'

import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'


const TaskList = () => {

  const [task, setTask] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/task');
      const data = await response.json();
      setTask(data);
      console.log(task);
    } catch (error) {
      alert('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
                <div><button>Resource</button></div>
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

export default TaskList