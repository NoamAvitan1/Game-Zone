import React, {useEffect, useState } from 'react'

//components
import MemoryCollection from './memoryCollection'
import useMemoryGame from '../../../hooks/useMemoryGame';
import NavBackButton from '../../reusfullComponents/navigateBackButton/navBackButton'

//style
import './memoryGame.css';
import MemoryInputSearch from './memoryInputSearch';




export default function MemoryGame() {
  const {getMemory} = useMemoryGame(); 

  useEffect(()=>{
    getMemory();
  },[])

  return (
    <div className='MemoryGame'>
      <NavBackButton className="navBack" to={"/"}/>
      <h1>Memory Game</h1>
      <MemoryInputSearch/>
      <MemoryCollection  /> 
    </div>
  )
}


