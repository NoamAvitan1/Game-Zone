
import React from "react";
export default function UseSendEmail () {

    
    const sendEmail = async (body,to,title) => await window.Email.send({
    SecureToken :'ffaeb2c1-8541-48ff-96e3-d06c1588db42',
    To : `${to}`,
    From : "yohaireactblogsproject@gmail.com",
    Subject : `${title}`,
    Body : `${body}`
    }).then((message) => {
            return message;
        }
    ).catch((err)=>{
        console.log(err);
        throw Error({err});
    });
    
    return{
        sendEmail
    }
};


/*
back up elastic 974337
*/