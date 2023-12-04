import React, { useEffect, useState } from 'react'
import useUser from '../../../hooks/useUser';
//style
import './slidePuzzleStartGame.css';
import SelectLevel from '../../reusfullComponents/selectLevel/selectLevel';
import EndedGameAllert from '../../reusfullComponents/endedGameAllert/endedGameAllert';



export default function SlidePuzzleStartGame({image,box_size}) {
    const [initial,setInitial] = useState(null); 
    const [imagesArr,setImagesArr] = useState(null);
    const [empty,setEmpty] = useState(null);
    const {user,updateXp} = useUser();
    const [level,setLevel] = useState();
    const [gameDone,setGameDone] = useState(null);
    const templates = {
      easy:{
        positions:[
        "top left","top center","top right",
        "center left","center","center right",
        "bottom left","bottom center"],
        revard:200,
        pices:9,
      },
      medium:{
        positions:[
        "0% 0%","34% 0%","67% 0%","100% 0%",
        "0% 34%","34% 34%","67% 34%","100% 34%",
        "0% 67%","34% 67%","67% 67%","100% 67%",
        "0% 100%","34% 100%","67% 100%"],
        revard:400,
        pices:15,
      },
      hard:{
        positions:[
        "0% 0%","25% 0%","50% 0%","75% 0%","100% 0%",
        "0% 25%","25% 25%","50% 25%","75% 25%","100% 25%",
        "0% 50%","25% 50%","50% 50%","75% 50%","100% 50%",
        "0% 75%","25% 75%","50% 75%","75% 75%","100% 75%",
        "0% 100%","25% 100%","50% 100%","75% 100%"],
        revard:600,
        pices:24,
      }
    }

    
    useEffect(()=>{
      if(!level)return;
      setInitial(templates[level].positions);
      setEmpty(templates[level].pices -1);
    },[level]);
  
    //initialize the images array after shuffle
    useEffect(()=>{
      if (!initial) 
        return;
      
      let startArray = [...initial.sort(()=> Math.random() - 0.5 )];
      startArray.push("empty");
      setImagesArr(startArray);
      
    },[initial]);

    //check if user has won
    const checkWinning = () => {
        const checkArr = [...templates[level].positions,"empty"];
        for (let i = 0; i < checkArr.length ; i++) {
          if (checkArr[i] != imagesArr[i]) {
            return false;
          }      
        }
        return true;
      }

    // move image
    const moveImage = (n,i) => {
        if (i + 1 == empty || i-1 == empty || i + Math.sqrt(imagesArr.length) == empty || i-Math.sqrt(imagesArr.length) == empty) {
          let arr = [...imagesArr];
          arr[i] = arr[empty];
          arr[empty] = n;
          setEmpty(i);
          setImagesArr(arr);
        } else {
          alert("impossible move")
        }
      }

      //check if user won after move
      useEffect(()=>{
        if (!imagesArr) return;
        if (checkWinning()) {
          if (user) 
            updateXp(templates[level].revard);

          setGameDone(
            <EndedGameAllert 
              message={"Good Game!"} 
              xp={templates[level].revard} 
              restart={()=>{
                setLevel(null);
                setGameDone(null);
              }} />);
        }
      },[empty])

  return (
    <div className="SlidePuzzleStartGame">
      {level ?
      <div 
          className="slide-grid"
          style={{height:box_size,width:box_size}}>

        {imagesArr && [...imagesArr].map((position,i)=> 
        (
          <button 
          key={i}
          onClick={()=>moveImage(position,i)}
          disabled={i == empty}
          
          style={
              i == empty 
              ?   {height:box_size/Math.sqrt(imagesArr.length),width:box_size/Math.sqrt(imagesArr.length)}
              :   {height:box_size/Math.sqrt(imagesArr.length),width:box_size/Math.sqrt(imagesArr.length),backgroundImage:`url(${image})`,backgroundPosition:position}
          }
          className="slide-image"></button>
          ))} 
           <img src={image} alt="bg-image" className='bg-image' />
      </div>
      : <SelectLevel options={["easy","medium","hard"]} handleChoice={(c)=>setLevel(c)} /> }
      {gameDone && gameDone}
    </div>
  )
}
