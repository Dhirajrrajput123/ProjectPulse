import React,{useState,useEffect} from 'react'

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import globleData from '../globleVariable';

const ProjectList = () => {
    const navigate=useNavigate();

    if(globleData.status!='login'){
        alert('you need to login 1st');
        navigate('/');
    }

    const [project,setProject]=useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/project');
            const data = await response.json();
            setProject(data);
            // console.log(project);
        } catch (error) {
            alert('Error fetching data: ', error);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const deleteProject=async (pId)=>{
        // console.log(pId);
        try {
            const response = await fetch("http://127.0.0.1:5000/project/" + pId, {
                method: "DELETE"
            });
            const data = await response.json();
            alert("Project Delete Successfully...");
            fetchData();
        } catch (error) {
            alert('Error fetching data: ', error);
        }
    }

  return (
    <div>
        

        <div>
            {
                project.map((e,i)=>{
                    return (
                        <div key={e.projectId} className='project_child'>
                           <div>{e.projectId}</div>
                           <div>{e.p_name}</div>
                           <div>{e.p_status}</div>
                           <div>{e.start_date}</div>
                           <div>{e.end_date}</div>
                           <div>{e.managerId}</div>
                           <div><Link to={`/project/task/${e.projectId}`}> <button>Task</button> </Link></div>
                           <div> <Link to={`/project/update/${e.projectId}`}> <button>Update</button> </Link></div>
                           <div><button onClick={()=>deleteProject(e.projectId)}>Delete</button></div>

                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ProjectList