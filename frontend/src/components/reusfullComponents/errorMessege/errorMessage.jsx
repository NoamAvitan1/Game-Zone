import React from 'react'


export default function ErrorMessage({message}) {
  return (
    <div style={{color:"red" , backgroundColor:"white" , height:"300px"}}>
        <h1>{message}</h1>
    </div>
  )
}
