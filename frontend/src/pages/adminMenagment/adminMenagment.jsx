import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import useUser from '../../hooks/useUser'
import './adminMenagment.css';
import AdminMenagmentNav from './adminMenagmentNav';
import UsersMenagment from './usersMenagment/usersMenagment';
import GamesMenagment from './gamesMenagment/gamesMenagment';

export default function AdminMenagment() {
    const {user,error} = useUser();
    const [option, setOption] = useState("Users");
    const menagment_options = ["Users","Games"];
    const navigate = useNavigate();
    useEffect(()=>{
      if(error || !user){
        navigate("/");
      }
    },[error,user]);
    console.log(error);
  return (<>
    {user && user.role == "admin" ? 
      <div className='AdminMenagment'>
        <AdminMenagmentNav 
          selected={option}
          options={menagment_options} 
          setOption={setOption} />
        {   option == "Users" && <UsersMenagment/>  }
        {   option == "Games" && <GamesMenagment/>  }
    </div>
    : <p>loading</p> }
    </>
  )
}
