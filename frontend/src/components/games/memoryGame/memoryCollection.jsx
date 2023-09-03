import React from 'react'
import { useNavigate } from 'react-router-dom'
import useMemoryGame from '../../../hooks/useMemoryGame'
import './memoryCollection.css'
import SkeletonElement from '../../reusfullComponents/skeletons/skeletonElement';


export default function MemoryCollection() {
  const {setMemoryGame , data:memorycategories ,loading ,error} = useMemoryGame();
  const navigate = useNavigate();
  const selectCollection = (m) => {
    setMemoryGame(m);
    navigate(`/memoryGame/${m.name}`);
  }
  return (
    <div className='MemoryCollection'>
      {memorycategories ? memorycategories.map((m,i)=>(
        <div className='MemoryCollection-option'
        key={i}
        onClick={()=>selectCollection(m)}
        style={{backgroundImage:`url(${m.img_url})`}}>
          <h2>{m.name}</h2>
        </div>
      )) :
      (loading 
        ? [1,2,3,4,5,6].map((k)=>(
          <div key={k} className="MemoryCollection-option" >
            <SkeletonElement type={"fit"} />
          </div>
          )) 
        : <p>{error}</p> )
      }
    </div>
  )
}
