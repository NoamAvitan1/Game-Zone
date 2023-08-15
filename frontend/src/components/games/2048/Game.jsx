import React, { useState, useEffect } from "react";
import "./Game.css";

export const Game = () => {
  const [borad, setBoard] = useState(
    Array(4)
      .fill(null)
      .map(() => Array(4).fill(null))
  );

  const rndCell = (cell) => {
    const nullz = [];
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) {
        if (!borad[i][j])
          if (!cell || i != cell.row || j != cell.col)
            nullz.push({ row: i, col: j });
      }
    if (!nullz.length) return;
    const rnd = Math.floor(Math.random() * nullz.length);
    return nullz[rnd];
  };

  const fillCells = () => {
    const a = rndCell();
    const b = rndCell(a);
    const newBoard = [...borad];
    if (a) newBoard[a.row][a.col] = "2";
    if (b) newBoard[b.row][b.col] = "2";
    setBoard(newBoard);
  };

  const checkEmpty = () => {
    for (let i = 0; i < 4; i++) if (borad[i].includes("2")) return false;
    return true;
  };


  const moveRight = () => {
        let newArr = [];
      for(let i = 0; i < 4; i++){
        let array = [...borad[i]]
        for(let j = 2; j >=0 ; j--){
          if(j == 2){
              if(array[j+1] == null){
                array[j+1] = array[j];
                array[j] = null;
              }
              else if(array[j+1] == array[j]){
                array[j+1] = array[j] + array[j];
              }
              else{
                continue;
              }
          }
          if(j == 1){
            if(array[j+1] == null){
              array[j+1] = array[j];
              array[j] = null;
              if(array[j+2] == null){
                array[j+2] = array[j+1];
                array[j+1] = null;
                continue;
              }
             if(array[j+2] == array[j+1]){
                array[j+2] == array[j+1] + array[j+1];
                array[j+1] = null;
                continue;
              }
            }
            if(array[j+1] == array[j]){
              array[j+1] = array[j] + array[j];
              array[j] = null;
              if(array[j+2] == null){
                array[j+2] = array[j+1];
                array[j+1] = null;
                continue;
              }
             if(array[j+2] == array[j+1]){
                array[j+2] == array[j+1] + array[j+1];
                array[j+1] = null;
                continue;
              }
            }
          }
          if(j == 0){
              
          }
        }
        newArr.push(arr)
      }
      setBoard([...newArr]);
  }

  const moveLeft = () => {

  }

  const moveDown = () => {

  }

  const moveUp = () => {

  }

  const handleKeyPress = (event) => {
    if (event.key === "ArrowRight") {
      moveRight()
      console.log("Key pressed:", event.key);
    }
    if (event.key === "ArrowDown") {
      moveDown()
      console.log("Key pressed:", event.key);
    }
    if (event.key === "ArrowLeft") {
      moveLeft()
      console.log("Key pressed:", event.key);
    }
    if (event.key === "ArrowUp") {
      moveUp()
      console.log("Key pressed:", event.key);
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
    if (checkEmpty()) fillCells();
  }, []);


  return (
    <div className="Game">
      <section className="grid">
        {borad.map((r) =>
          r.map((c, i) => (
            <div key={i} className="div">
              {c}
            </div>
          ))
        )}
      </section>
    </div>
  );
};
