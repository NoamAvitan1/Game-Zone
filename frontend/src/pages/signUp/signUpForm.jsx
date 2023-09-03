import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LogInForm from "../logIn/logInForm";
import "./signUpForm.css";
import useUser from "../../hooks/useUser";
import {AiOutlineEyeInvisible,AiOutlineEye,AiFillLock,AiOutlineMail,AiOutlineUser} from 'react-icons/ai';


export default function SignUpForm({ updateModal,closeModal }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {user,error,loading,signUpUser} = useUser();
  const nameRegex = /^[a-zA-Z ]+$/;
  const emailAlphabet = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [show_password,setShowPassord] = useState(false);

  const hundleSignUp = (data) => {
    signUpUser(data);
    reset();
  };

  useEffect(() => {
    if(user){
      closeModal();
    }
  },[user]);

  return (
    <div className="SignUpForm">
      <div className="signUp-nav">
        SignUp
        <button
          onClick={() => updateModal(<LogInForm closeModal={closeModal} updateModal={updateModal} />)}
          className="log-in"
        >
          /LogIn
        </button>
      </div>
      <form onSubmit={handleSubmit(hundleSignUp)} className="signUp-form">

        
        <label>Name</label>
        <div className="input">
        <AiOutlineUser className="user-icon"/>
          <input
            {...register("name", {
              required: { value: true, message: "Name is Required..." },
              minLength: { value: 2, message: "min 2 chars.." },
              maxLength: { value: 40, message: "max 40 chars.." },
              pattern: {
                value: nameRegex,
                message: "only alphabet allowed",
              },
            })}
            placeholder="Type Your Name.."
            type="text"
          />
        </div>
        <div className="error-client">
        {errors.name && <p>{errors.name.message}</p>}
        </div>
        <label>Email</label>
        <div className="input">
        <AiOutlineMail className="email-icon" />
          <input
            {...register("email", {
              required: { value: true, message: "Email is Required..." },
              minLength: { value: 8, message: "min 8 chars.." },
              maxLength: { value: 40, message: "max 40 chars.." },
              pattern: {
                value: emailAlphabet,
                message: "only alphabet allowed",
              },
            })}
            placeholder="yourEmail@..."
            type="text"
          />
        </div>

        <div className="error-client">
        {errors.email && <p>{errors.email.message}</p>}
        </div>
        <label>Password</label>
        <div className="input">
        {show_password
          ? <AiOutlineEye className="eye-icon" onClick={() => setShowPassord(false)}   /> 
          : <AiOutlineEyeInvisible className="eye-icon" onClick={()=>setShowPassord(true)}  /> }
        
        <AiFillLock className="lock-icon" />
          <input
            {...register("password", {
              required: { value: true, message: "Password is Required..." },
              minLength: { value: 5, message: "min 5 chars.." },
              maxLength: { value: 40, message: "max 40 chars.." },
            })}
            type={show_password ? "text" : 'password'}
            placeholder="Type Password.."
          />
        </div>

        <div className="error-client">
        {errors.password && <p>{errors.password.message}</p>}
        </div>
        {<div className="error-server">
          <p>{error}</p>
        </div>}
        <button className="signUp-button">SignUp</button>
      </form>
    </div>
  );
}
