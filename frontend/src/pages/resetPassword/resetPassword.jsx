//react imports
import React,{ useEffect, useRef, useState } from "react";
import useSendEmail from '../../hooks/useSendEmail';
import ResetPasswordForm from "./resetPasswordForm";
import ResetPasswordValidation from "./resetPasswordValidation";
import NavBackButton from '../../components/reusfullComponents/navigateBackButton/navBackButton';
import {RESET_USER_PASSWORD} from '../../constants/urls';

//style
import './resetPassword.css';
import { apiPost } from "../../services/apiRequests";
import { useNavigate } from "react-router-dom";



export default function ResetPassword() {
    const [keyInput,setKeyInput] = useState(null);
    const [generatedKey,setGeneratedKey] = useState(0);
    const emailRef = useRef();
    const [emailSent,setEmailSent] = useState(false);
    const {sendEmail} = useSendEmail();
    const navigate = useNavigate();
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [validEmail,setValidEmail] = useState(false); 

    //functions
    const hundleSendEmail = async () => {
        try {
            const res = await sendEmail(generatedKey,emailRef.current.value,'code for verify email');
            if (res == "OK") setEmailSent(emailRef.current.value);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        setGeneratedKey((Math.random(0,9999)*10000).toFixed(0));
    },[])

    
    const resetPassword = async (password) => {
        try {
            const res = await apiPost(RESET_USER_PASSWORD,{password,email:emailSent});
            if (res.status >= 200 && res.status < 300) navigate("/");
        } catch (error) {
            console.log(error);
        }

      } 
  return (
    <div className="ResetPassword">
        <NavBackButton className="navBack" to={"/"} />
        {emailSent ? 
            (generatedKey == keyInput 
                ? <ResetPasswordForm resetPassword={resetPassword}/> 
                : <ResetPasswordValidation setKeyInput={setKeyInput} /> 
            ): 
            <div className="ResetPassword-email-container">
                <h2>Enter Email Address</h2>
                <input 
                    onChange={(e) => setValidEmail(pattern.test(e.target.value))}
                    pattern={pattern}
                    placeholder="your email address"
                    ref={emailRef}
                    type='email' />
                <button
                disabled={!validEmail}
                onClick={()=>hundleSendEmail()}
                >Send</button>
            </div>
        }
    </div>
  )
}

