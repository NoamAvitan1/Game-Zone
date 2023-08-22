import React, { useEffect, useState } from 'react'
import './profileImgAndLevel.css'
import {IoLogoGameControllerB} from 'react-icons/io'

export default function ProfileImgAndLevel({user,openUserMenu}) {
  const [xp_progress,setXpProgress] = useState(null);
  const {image,level,xp} = user;
  useEffect(()=>{
    if (level) {
      let expected_xp = 0;
      let xp_riched = xp;
      let i;
      for (i = 1; i <=user.level -1; i++) {
        xp_riched -= (100 * i);  
      }
      expected_xp = (100 * i);
      setXpProgress((xp_riched/expected_xp)*100 * 1.45);
    }
  },[level,xp])
  
  return (
    <div className="ProfileImgAndLevel" onClick={()=>(openUserMenu && openUserMenu())}>
              <div className="profile-img-border">
                <img src={image} className="profile-img"/>
              </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
         <defs>
            <linearGradient id="GradientColor">
               <stop offset="0%" stopColor="#01faff" />
               <stop offset="100%" stopColor="#258fff" />
            </linearGradient>
         </defs>
         <circle 
          cx="50%" 
          cy="50%" 
          r="47%"  
          strokeLinecap="round"
          strokeDasharray={1000}
          strokeDashoffset={1000 - xp_progress} />
        </svg>
        <div className="level-container">
            <IoLogoGameControllerB/>
            <div className="level">{level}</div>
        </div>
    </div>
  )
}
/*
               <svg xmlns="http://www.w3.org/2000/svg" version="1.1" >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#01faff" />
                    <stop offset="100%" stopColor="#258fff" />
                  </linearGradient>
                 </defs>
                <circle 
                  cx="25" 
                  cy="25" 
                  r="22" 
                  strokeLinecap="round" />
              </svg> */