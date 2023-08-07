import React, { useEffect, useRef, useState } from 'react'
import Draggable, {DraggableCore} from 'react-draggable';

//  Assets
import topLeft from '../../../assets/images/puzzle9x9/pieces/topLeft.png';
import topCenter from '../../../assets/images/puzzle9x9/pieces/topCenter.png';
import topRight from '../../../assets/images/puzzle9x9/pieces/topRight.png'; 
import centerLeft from '../../../assets/images/puzzle9x9/pieces/centerLeft.png';
import center from '../../../assets/images/puzzle9x9/pieces/center.png';
import centerRight from '../../../assets/images/puzzle9x9/pieces/centerRight.png';
import bottomLeft from '../../../assets/images/puzzle9x9/pieces/bottomLeft.png';
import bottomCenter from '../../../assets/images/puzzle9x9/pieces/bottomCenter.png';
import bottomRight from '../../../assets/images/puzzle9x9/pieces/bottomRight.png';
import gameImage from '../../../assets/images/puzzle9x9/images/demo.jpg';
//  Style
import './puzzleGameStart.css';
//  Components
import EndedGameAllert from '../../reusfullComponents/endedGameAllert/endedGameAllert';
//  HOOKS
import useUser from '../../../hooks/useUser';


export default function PuzzleGameStart({level,image,box_size}) {
    const [piecesArr, setPiecesArr] = useState([
            {found:false,piece:topLeft,position:"0% 0%",height:"100px",width:"100px",top:0,left:0},
            {found:false,piece:topCenter,position:"41% 0%",height:"100px",width:"130px",top:0,left:30},
            {found:false,piece:topRight,position:"100% 0%",height:"100px",width:"130px",top:0,left:30},
            {found:false,piece:centerLeft,position:"0% 41%",height:"130px",width:"130px",top:30,left:0},
            {found:false,piece:center,position:"59% 41%",height:"130px",width:"130px",top:30,left:30},
            {found:false,piece:centerRight,position:"100% 50%",height:"160px",width:"100px",top:30,left:30},
            {found:false,piece:bottomLeft,position:"0% 100%",height:"130px",width:"100px",top:60,left:0},
            {found:false,piece:bottomCenter,position:"50% 100%",height:"130px",width:"160px",top:60,left:30},
            {found:false,piece:bottomRight,position:"100% 100%",height:"100px",width:"100px",top:30,left:30}
        ]);
    const [gameDone,setGameDone] = useState(null);
    const {user , updateXp} = useUser();

    const piecesRefs = [useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef(),useRef()];

    const checkPiece = (event,i) => {
        const tx = piecesRefs[i].current.getBoundingClientRect().left + piecesArr[i].left;
        const ty = piecesRefs[i].current.getBoundingClientRect().top + piecesArr[i].top ;
        if ((event.clientX > tx - 70 && event.clientX < tx + 70 )
         && (event.clientY > ty - 70 && event.clientY < ty + 70 )) {
            setTimeout(()=>{
                let newPiecesArr = [...piecesArr];
                piecesArr[i].found = true;
                setPiecesArr(newPiecesArr);
            },500);
        }
    }

    const checkWining = () => {
        let won = true;
        for (let i = 0; i < 9; i++) {  
            if (!piecesArr[i].found){
                won = false; 
                break; 
            }
        }
        if (won) {
        setGameDone(
            <EndedGameAllert 
                xp={level == "easy" ? 100 : 200} 
                message={"GOOD GAME"} 
                restart={()=>{
                    setGameDone(null);
                    setPiecesArr([...piecesArr.map((p) => ({...p,found:false}))]);
                }} />);
            if(user) updateXp(level == "easy" ? 100 : 200);
        }
    }

    useEffect(()=>checkWining(),[piecesArr]);
  return (
        
        <div className='PuzzleGame'>
            {gameDone && gameDone}
            <div className="slice-images">
                {piecesArr && piecesArr.map((p,i)=>(
                    <Draggable 
                        key={i}
                        onDrag={(e)=>checkPiece(e,i)}>

                        <div className='slice' 
                        style={{
                            opacity:(p.found ? 0 : 1),
                            WebkitMaskImage:`url(${p.piece})`,
                            WebkitMaskRepeat:'no-repeat',
                            maskImage:`url(${p.piece})`,
                            maskRepeat:'no-repeat',
                            zIndex:'3',
                            }} >
                                <div 
                                    style={{
                                        backgroundImage:`url(${image})`,
                                        height:p.height,
                                        width:p.width,
                                        backgroundPosition:p.position
                                        }}>
                                </div>
                        </div> 
                </Draggable>
                ))}
            </div>

            <div className='full-image'>
            
                <div className='slice-image'>
                    {piecesRefs.map((ref,i)=>
                        <div 
                        ref={ref}
                        className='sliced' 
                        style={{
                            opacity:(piecesArr[i].found ? 1 : (level == "easy" ? 0.4 : 0)),
                            WebkitMaskImage:`url(${piecesArr[i].piece})`,
                            WebkitMaskRepeat:'no-repeat',
                            maskImage:`url(${piecesArr[i].piece})`,
                            maskRepeat:'no-repeat',
                            marginLeft:`${-piecesArr[i].left}px`,
                            marginTop:`${-piecesArr[i].top}px`,
                            zIndex:'2',
                            }} >
                                <div 
                                    style={{
                                        backgroundImage:`url(${image})`,
                                        height:piecesArr[i].height,
                                        width:piecesArr[i].width,
                                        backgroundPosition:piecesArr[i].position
                                        }}>
                                </div>
                        </div> 
                    )}
                </div>
            </div>
        </div>
  )
}


