import React from 'react'
import LogInForm from "../../pages/logIn/logInForm";
//style
import './logInButton.css'

export default function LogInButton({updateModal,closeModal}) {

  return (
    <button
    onClick={()=>updateModal(<LogInForm closeModal={closeModal} updateModal={updateModal}/>)}
    className='LogInButton'
    >logIn</button>
  )
}
