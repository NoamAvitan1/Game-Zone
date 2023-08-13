import React from 'react'
import UseMemoryGame from '../../../../hooks/useMemoryGame'
//style
import './memoryGameMenagmentCollection.css';
//components
import EditMemoryGame from './editMemoryGame';
//assets
import {AiOutlineEdit} from 'react-icons/ai' 
import SkeletonElement from '../../../../components/reusfullComponents/skeletons/skeletonElement';

export default function MemoryGameMenagmentCollection({closeModal,openModal}) {
    const {data,setMemoryGame , loading , error} = UseMemoryGame();
  return (
    <div className='MemoryGameMenagmentCollection'>
        {data ? data.map((memory,i)=>(
          <div className="memory-details-container" key={i} >
            <AiOutlineEdit onClick={()=>{
              setMemoryGame(memory);
              openModal(<EditMemoryGame closeModal={closeModal} />);
            }} className='edit-icon' />
            <h1>{memory.name}</h1>
            <div className="details-container">
              <div className="keys-details">
              <h3>Main Keys:</h3>
              <div className="">
                {memory.keys.map((k)=>( <p>{k}</p> ))}
              </div>
              <h3>Image Keys:</h3>
              <div className="imgKeys">
                {memory.img_keys.map((k)=>( <p>{k}</p> ))}
              </div>
              <div className="desk">
                <div className='headers'><span>Headers:</span>{"{"}
                {memory.headers && Object.keys(memory.headers).map((key,value) => (
                    <p key={value}>
                      {key} : {memory.headers[key]},
                    </p>
                  ))}{"}"}</div>
                <p className='api'><span>API:</span> {memory.api }</p>
              </div> 
              </div>
              <img src={memory.img_url} alt="memory image" height="100px" width="100px" />
            </div>

           <div className="mobile">
           <div className='headers'><span>Headers:</span>{"{"}
              {memory.headers && Object.keys(memory.headers).map((key,value) => (
                  <p key={value}>
                    {key} : {memory.headers[key]},
                  </p>
                ))}{"}"}</div>
            <p className='api'><span>API:</span> {memory.api }</p>
          </div> 

          </div>
        ))
        : loading
          ? Array(8).fill(0).map((_,i)=>(
          <div 
            key={i}
            className="memory-details-skeleton">
            <SkeletonElement type={"fit"} />
          </div>
          ))
          : <div className="">{error}</div>
      }
    </div>
  )
}
