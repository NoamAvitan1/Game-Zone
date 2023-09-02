import React, { useEffect, useState } from 'react'
//components
import MemoryCard from './memoryCard';
import SelectLevel from '../../reusfullComponents/selectLevel/selectLevel';
import NavBackButton from '../../reusfullComponents/navigateBackButton/navBackButton';
import EndedGameAllert from "../../reusfullComponents/endedGameAllert/endedGameAllert";
//hooks & services
import useUser from '../../../hooks/useUser';
import useMemoryGame from '../../../hooks/useMemoryGame'
import { apiGet } from '../../../services/apiRequests';

import SkeletonElement from '../../reusfullComponents/skeletons/skeletonElement';

//style
import './memoryGameStart.css';


export default function MemoryGameStart() {
    const [level,setLevel] = useState(null);
    const {currentGame,memoryLevels } = useMemoryGame();
    const [memoryCards,setMemoryCards]=useState(null); 
    const {user,updateXp} = useUser();
    const [gameDone,setGameDone] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [turns,setTurns] = useState(0);
    const [firstCard,setFirstCard] = useState(null);
    const [secondCard,setSecondCard] = useState(null);
    const [disabled,setDisabled] =  useState(false);
    console.log({currentGame,memoryCards});
    

    const updateMemoryCards = (data) => {
      const shuffledCardsArray = [...data,...data]
        .sort(()=>Math.random() - 0.5)
        .map((card,i)=>({src:card,mached:false,id:i}));
      
      setMemoryCards(shuffledCardsArray);

    }
    

    const getMemoryCards = async () => {
      try {

        let {data} = await apiGet(`${currentGame.api}${level}`,currentGame.headers);
        //getting tha image array
        for (let i = 0; i < currentGame.keys.length ; i++) {
          data = data[currentGame.keys[i]]; 
        }
        //gerring only the image needed
        if (currentGame.img_keys.length > 0) {
          let imgs = [];
          for (let j = 0; j < currentGame.img_keys.length; j++) {
            for (let i = 0; i < data.length ; i++) {
              imgs.push(data[i][currentGame.img_keys[j]]);
            }
            data = [...imgs];
            imgs = [];
          }
        }
        updateMemoryCards(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    }



    const choiseCard = (card) => {
      if (firstCard) {
        setDisabled(true);
        setSecondCard(card);
      } else {
        setFirstCard(card);
      } 
    }


    const checkIfWon = () => {
      for (let i = 0; i < memoryCards.length ; i++) {
        if (!memoryCards[i].mached) {
          return false;
        }        
      }
      return true;
    }



    useEffect(()=>{
      if (currentGame && level) {
        getMemoryCards();
      }
    },[level,currentGame])





    useEffect(()=>{
      if (firstCard && secondCard) {
        if (firstCard.src == secondCard.src) {
          setMemoryCards([...memoryCards.map((card)=>(
            card.src == firstCard.src 
            ? {...card,mached:true}
            : card
          ))]);
        }
        setTimeout(() => {
          setFirstCard(null);
          setSecondCard(null);
          setTurns(turns + 1);
          setDisabled(false);
        }, 1000);
      }
    },[firstCard,secondCard])

   



    useEffect(()=>{
      if (memoryCards) {

        if (checkIfWon()) {
          if (user) {
            updateXp(Math.ceil(level * 100 / turns));
            setGameDone(
              <EndedGameAllert 
                message={"Well Done!"} 
                xp={Math.ceil(level * 100 / turns)} 
                restart={()=>{
                  getMemoryCards();
                  setGameDone(false);
                  setTurns(0);
                  setFirstCard(null);
                  setSecondCard(null);
                  setDisabled(false);
                }}/>);
          }
          setGameDone(
            <EndedGameAllert 
              message={"Well Done!"} 
              xp={Math.ceil(level * 100 / turns)} 
              restart={()=>{
                getMemoryCards();
                setGameDone(false);
                setTurns(0);
                setFirstCard(null);
                setSecondCard(null);
                setDisabled(false);
              }}/>);
        }
      }
    },[memoryCards])

    console.log(loading);
    console.log(level);

  return (
    <div className='MemoryGameStart'>
      <NavBackButton className="navBack" />
      { level ? 
        <div className="memory-game-start">
          <p className='turnes'>Turns: {turns}</p>
          <div className="memory-cards-container">
          {memoryCards ? 
            memoryCards.map((card,i)=>(
              <MemoryCard 
                flipped={card == firstCard || card == secondCard}
                choiseCard={choiseCard} 
                card={card}
                disabled={disabled} 
                key={i} />
            ))      
            : (loading 

                ?  Array(level * 2).fill().map((_,k) => (
                  <div className="MemoryCard" key={k}>
                    <SkeletonElement  type={"fit"} />
                  </div>
                  ))

                : <p>{error}</p> )
          }
          </div>
        </div>
        : <SelectLevel 
            options={memoryLevels.map((l)=>l.name)} 
            handleChoice={(name)=>{
              const {level} = memoryLevels.find((l)=>l.name === name);
              setLevel(level);
            }} /> }
          {gameDone && gameDone}
    </div>
  )
}
