import React from 'react'
import {useNavigate } from 'react-router-dom';
//components

//style
import './userDropDownMenu.css';
import SearchUsers from '../friends/searchUsers';
import useUser from "../../hooks/useUser";
import TopPlayers from '../players/topPlayers';


export default function UserDropDownMenu({user:{email,name,role},getModal,closeMenu}) {
  const {userLogOut} = useUser();
  const navigate = useNavigate();
    const user_menu = [
        {name:"Account",to:"/account",function:()=>{
          navigate("/account");
          closeMenu();
        }},
        {name:"Payment",to:"/account",function:()=>{
          navigate("/payment");
          closeMenu();
        }},
        {name:"Friends",to:"/account",function:()=>{
          getModal(<SearchUsers />);
          closeMenu();
        }},
        {name:"Top Players",to:"/topPlayers",function:()=>{
          getModal( <TopPlayers /> )
          closeMenu();
        }},
        {name:"LogOut",to:"/logout",function:()=>{
          userLogOut();
          closeMenu();
        }}
      ];


      return (
    <div className="UserDropDownMenu">
    <div className="profile-details">
      <p>{name}</p>
      <p className="email">
        {email}
      </p>
    </div>
      {role === "admin" && 
              <button 
              className="dropdown-option"
              onClick={()=>{
                navigate("/admin");
                closeMenu();}}>Managment</button>
      }
      {user_menu.map((link,i)=>(
        <button 
          key={i}
          className="dropdown-option"
          onClick={link.function}>{link.name}</button>
      ))}
    </div>
  )
}
