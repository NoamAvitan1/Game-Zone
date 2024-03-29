import React,{useState} from 'react'
import Roulette from './roulette'
import './rouletteGame.css'
import RouletteSpin from './rouletteSpin'
import RouletteBoard from './rouletteBoard';
import useUser from '../../../hooks/useUser';
import NavBackButton from '../../reusfullComponents/navigateBackButton/navBackButton'
import EndedGameAllert from '../../reusfullComponents/endedGameAllert/endedGameAllert';

export default function RouletteGame() {
    const [revard,setRevard] = useState(null);
    const [chice,setChoice] = useState(null);
    const [ballPosition,setBallPosition] = useState(0);
    const [round,setRound] = useState(1);
    const [disable,setDisable] = useState(false);
    const [price,setPrice] = useState(100);
    const {updateXp,user} =  useUser();
    const [gameDone , setGameDone] = useState(null);

    const revardsOptions = [
      0,28,9,26,30,11,7,20,32,17,5,22,34,15,3,24,36,13,1,
      0,27,10,25,29,12,8,19,31,18,6,21,33,16,4,23,35,14,2
    ];
    
    const hundleSelectPrice = (event) => {
      if(checkPrice(event.target.value)){
        setPrice(event.target.value)
      }
    }
  
    const checkPrice = (p) => {
      if(user){
        if (user.xp < p) {
          alert("You dont have enough xp");
          return false;
        }
      }
      return true;
    }
    
  
    const spinBall = () => {
      setDisable(true);
      const randomNumber = Math.floor(Math.random() * 37);
      setBallPosition(randomNumber * (360/38) + (1080 * round));
      setRound(round + 1);
      setTimeout(()=>{
        if (chice.includes(revardsOptions[randomNumber])) {
          if(user){
            updateXp(price * revard);
            setGameDone(
              <EndedGameAllert 
              styled={{alignSelf:'center'}}
                message={"Good Spin !"} 
                xp={price * revard} 
                restart={()=>setGameDone(null)} />);
          } else {
            setGameDone(
              <EndedGameAllert 
              styled={{alignSelf:'center'}}
                message={"Good Spin !"} 
                xp={price * revard} 
                restart={()=>setGameDone(null)} />);
          }
          
        } else {
          if (user) {
            updateXp(-price);
            setGameDone(
              <EndedGameAllert 
              styled={{alignSelf:'center'}}
                message={"Try Again..."} 
                xpMessage={`You lossed ${price} xp`} 
                restart={()=>setGameDone(null)} />);
          } else {
            setGameDone(
              <EndedGameAllert 
              styled={{alignSelf:'center'}}
                message={"Try Again..."} 
                xpMessage={`You lossed ${price} xp`} 
                restart={()=>setGameDone(null)} />);
          }
        }
        setDisable(false);
      },3500)
  
    }
  return (
    <div 
      className='RouletteGame'>
        <NavBackButton className="navBack"/>
        <Roulette 
          ballPosition={ballPosition}/>
        <RouletteSpin 
            spinBall={spinBall} 
            price={price} 
            hundleSelectPrice={hundleSelectPrice}
            chice={chice}
            checkPrice={checkPrice}
            disable={disable} />
        <RouletteBoard setChoice={setChoice} setRevard={setRevard} chice={chice}/>
        {gameDone && gameDone}
    </div>
  )
}
