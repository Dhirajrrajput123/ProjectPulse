import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Url from '../url'

const GetResource = () => {

  const {id}=useParams();

  const [responceData,setResponceData]=useState({});

  useEffect(()=>{
    fetchProject();
    console.log(id);
  },[]);

  const fetchProject = async () => {
    try {
      const response = await fetch(`${Url}/resource/${id}`);
      const data = await response.json();
      setResponceData(data);
      console.log(data);
      
    } catch (error) {
      console.error('Error fetching Project:', error);
    }
  };



  return (
    <div>
      <h2>You can get Resource below</h2>

      {
       
            <div>
              <h2>Resource Id:- {responceData.resourceId}</h2>
              <div><a href={responceData.link}>Document Link</a></div>
              <div><p>{responceData.document}</p></div>
            </div>
 
         
      }
    </div>
  )
}

export default GetResource