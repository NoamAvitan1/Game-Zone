import React from 'react'
//style
import './selectLevel.css';

export default function SelectLevel({handleChoice,options,aditionalStyle}) {
    
  return (
    <div 
      style={aditionalStyle ? aditionalStyle : {}}
      className='SelectLevel'>
        <h2>Pick Level</h2>
        <div className="level-options">
            {options && options.map((option,i)=>(
                <button 
                    key={i}
                    onClick={()=> handleChoice(option)}
                    >{option}</button>
            ))}
        </div>
    </div>
  )
}
