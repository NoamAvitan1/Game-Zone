import React, { useEffect, useState } from "react";
import "./board.css";


export default function Board() {
  const [score, setScore] = useState(0);
  const [flag, setFlag] = useState(false);
  const [board, setBoard] = useState([]);
  const [result, setResult] = useState(false);
  let size = 4;

  const createBoard = () => {
    let newArr = [];
    for (let i = 0; i < size * size; i++) {
      let number = 0;
      newArr.push(number);
    }
    setBoard(newArr);
    generateRandomNumber(newArr);
    generateRandomNumber(newArr);
  };

  const generateRandomNumber = (newArr) => {
    let emptyIndices = [];
    
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] === 0) {
        emptyIndices.push(i);
      }
    }
    
    if (emptyIndices.length === 0) {
      // No empty spots left
      return;
    }
    
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    newArr[randomIndex] = 2;
    setBoard([...newArr]);
  };

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <div className="Board">
      <div className="score">
        <p>Score: </p>
        <p>{score}</p>
      </div>
      <div className="grid">
        {board.map((val, index) => (
          <div className="div" key={index}>
            {val}
          </div>
        ))}
      </div>
      {flag && <div className="result"></div>}
      <div style={{}}></div>
    </div>
  );
}
