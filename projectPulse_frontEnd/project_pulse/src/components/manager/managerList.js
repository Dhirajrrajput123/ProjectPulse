import React from 'react'
import { useState, useEffect, } from 'react'
import UpdateManager from './UpdateManager'
import CreateManager from './createManager'
import { Link, useSearchParams } from 'react-router-dom'



const ManagerList = () => {
    // const [serachParam,setSearchParam]=useSearchParams();
    const [manager, setManager] = useState([]);
    // const [ele, setEle] = useState({});
    
    // const [name, setName] = useState("");
    // const [role, setRole] = useState("");
    // const [bio, setBio] = useState("");
    // const [status, setStatus] = useState("");
    // const [date, setdate] = useState("");
    
    const [flag,setFlag]=useState(false);
    const [dis,setDis]=useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/manager');
            const data = await response.json();
            setManager(data);
        } catch (error) {
            alert('Error fetching data: ', error);
        }

    }
    useEffect(() => {
        fetchData();
    }, [flag]);

    const deleteManager = async (id) => {
        console.log(id);
        try {
            const response = await fetch("http://127.0.0.1:5000/manager/" + id, {
                method: "DELETE"
            });
            const data = await response.json();
            console.log(data);
            fetchData();
        } catch (error) {
            alert('Error fetching data: ', error);
        }
    }

    const updateManager = (element) => {
        setDis(!dis)
        localStorage.setItem("manager",JSON.stringify(element));
    }

    return (
        <div>
            <div>
                {
                    manager.map((element, index) => {
                        return (

                            <div key={element.managerId} className='manager_child'>
                                <div>{element.managerId}</div>
                                <div>{element.name}</div>
                                <div>{element.role}</div>
                                <div>{element.bio}</div>
                                <div>{element.start_data}</div>
                                <div>{element.status ? "Active" : "InActive"}</div>
                                <div>   <Link to={`/manager/update/${element.managerId}`}> <button>Update</button> </Link></div>
                                <div> <button onClick={() => deleteManager(element.managerId)}>Delete</button></div>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <CreateManager fetchData={fetchData} />

            </div>

            {/* <div className='update_manager' style={{display:dis?"inline":"none"}}>
               <UpdateManager/>
            </div> */}

        </div>
    )
}

export default ManagerList