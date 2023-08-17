import React, { useState, useEffect } from "react";
import "./Game2048.css";
import EndedGameAllert from '../../reusfullComponents/endedGameAllert/endedGameAllert';
import useUser from '../../../hooks/useUser';
export const Game2048 = () => {
  const [board, setBoard] = useState(
    Array(4)
      .fill(null)
      .map(() => Array(4).fill(null))
  );
  const [score,setScore] = useState(0);
  const [winner,setWinner] = useState(false);
  const [gameDone , setGameDone ] = useState(null);
  const {user , updateXp} = useUser();

   const points = (p) => {
    setScore(prevScore => prevScore + p);
   };

   const reset = () => {
        for (let i = 0; i < board.length; i++){
          for (let j = 0; j < board[i].length; j++){
            board[i][j] = null;
          }
        }
        setScore(0);
        fillCells();
   }

  const rndCell = (cell) => {
    const nullz = [];
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (!board[i][j])
          if (!cell || i != cell.row || j != cell.col)
            nullz.push({ row: i, col: j });
      }
    if (!nullz.length) return;
    const rnd = Math.floor(Math.random() * nullz.length);
    return nullz[rnd];
  };

  const fillCells = (empty = true) => {
    const a = rndCell();
    let b = null;
    if(empty) b = rndCell(a);
    const newBoard = [...board];
    if (a) newBoard[a.row][a.col] = 2;
    if (empty && b) newBoard[b.row][b.col] = 2;
    setBoard(newBoard);
  };


  const checkWinner = () => {
    let failed = true;
    for (let i = 0; i < 4; i++) {
      if(board[i].includes(2048))
        return {winner , failed:false};
      if(failed && board[i].includes(null))
        failed = false;
    }
    return {winner:false , failed};
}
  

  // const checkEmpty = () => {
  //   for (let i = 0; i < 4; i++) if (board[i].includes(2)) return false;
  //   return true;
  // };

  const moveRight = () => {
    let newArr = [];
    for (let d = 0; d < 4; d++) {
      let arr = board[d];
      let i = 0;
      let index;
      for (i = 0; i < 3; i++) {
        index = 0;
        for (let j = 0, k = arr.length - i - 2; j < 1 + i; j++) {
          if (arr[k + 1 + index] == null && arr[k + index] != null) {
            arr[k + 1 + index] = arr[k + index];
            arr[k + index] = null;
          }
          if (arr[k + 1 + index] == arr[k + index] && arr[k + index] != null) {
            arr[k + 1 + index] = arr[k + index] + arr[k + index];
            points(arr[k + index] + arr[k + index])
            arr[k + index] = null;
          }
          index++;
        }
      }
      newArr.push(arr);
    }
    setBoard(newArr);
    fillCells(false)
  };


  const moveLeft = () => {
    let newArr = [];
    for (let d = 0; d < 4; d++) {
    let arr = board[d];
    let i = 0;
    let index;
    for (i = 0; i < 3; i++) {
      index = 0;
      for (let j = 0, k = i + 1; j < 1 + i; j++) {
        index = Math.abs(index);
        if (arr[k - 1 - index] == null && arr[k - index] != null) {
          arr[k - 1 - index] = arr[k - index];
          arr[k - index] = null;
        }
        if (arr[k - 1 - index] == arr[k - index] && arr[k - index] != null) {
          arr[k - 1 - index] = arr[k - index] + arr[k - index];
          points(arr[k - index] + arr[k - index])
          arr[k - index] = null;
        }
        index *= -1;
        index--;
      }
    }
    newArr.push(arr);
  }
  setBoard(newArr);
  fillCells(false);
  };

  const moveDown = () => {
        let arr = [...board];
        let index;
        for(let i=0; i<4;i++){
            for(let d =0; d<3;d++){
                index = 0;
                for(let j=0,k=2-d;j<d+1;j++){
                    if(arr[k+1+index][i] == null && arr[k+index][i]!= null){
                        arr[k+1+index][i] = arr[k+index][i];
                        arr[k+index][i] = null;
                    }
                    if(arr[k+1+index][i] == arr[k+index][i] && arr[k+index][i]!= null){
                        arr[k+1+index][i] = arr[k+index][i] + arr[k+index][i];
                        points(arr[k+index][i] + arr[k+index][i] )
                        arr[k+index][i] = null;
                    }
                    index++;
                }
            }
  }
  setBoard(arr);  
  fillCells(false);  
}

  const moveUp = () => {
    let arr = [...board];
    let index;
    for(let i=0; i<4;i++){
      for(let d =0; d<3;d++){
          index = 0;
         for(let j=0,k=1+d;j<d+1;j++){
              index = Math.abs(index);
              if(arr[k-1-index][i] == null && arr[k-index][i]!= null){
                  arr[k-1-index][i] = arr[k-index][i];
                  arr[k-index][i] = null;
              }
              if(arr[k-1-index][i] == arr[k-index][i] && arr[k-index][i]!= null){
                  arr[k-1-index][i] = arr[k-index][i] + arr[k-index][i];
                  points(arr[k-index][i] + arr[k-index][i])
                  arr[k-index][i] = null;
              }
              index *= -1;
              index--;
          }
      }
  }
  setBoard(arr);  
  fillCells(false);  
  };


  const handleKeyPress = (event) => { 
    // if(winner){
    //   return;
    // }
    if (event.key === "ArrowRight") {
      moveRight();
    }
    if (event.key === "ArrowDown") {
      moveDown();
    }
    if (event.key === "ArrowLeft") {
      moveLeft();
    }
    if (event.key === "ArrowUp") {
      moveUp();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(event);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  useEffect(() => {
    fillCells();
  }, []);


  useEffect(() => {
    
    let {winner , failed} = checkWinner();
    console.log({winner , failed});
    if (winner) {
      if(user)
        updateXp(score);
      setGameDone(
        <EndedGameAllert 
          message={"Good Game"} 
          xp={score} 
          restart={()=>{
            reset();
            setGameDone(null);
          }}/>)
      setWinner(true);
    }
      
    if (failed)
      setGameDone(
      <EndedGameAllert 
        message={"Good Game"} 
        xp={score} 
        restart={()=>{
          reset();
          setGameDone(null);
        }}/>)
  },[score])


  return (
    <div className="Game">
      {gameDone && gameDone}
      <div className="score-container">
        <div className="score">Score: {score}</div>
        <h1 className="title">2048</h1>
      </div>
      <section className="grid">
        {board.map((r) =>
          r.map((c, i) => (
            <div key={i} className="div" style={{backgroundColor:(c ? `hsl(${(c * 10)%360},50%,50%)` : 'var(--light-bg)')}}>
              {c}
            </div>
          ))
        )}
      </section>
       <div>
          <button onClick={()=>reset()} className="reset">Reset</button>
        </div>
    </div>
  );
};
