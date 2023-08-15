import React, { useEffect, useState } from "react";
import "./CandyCrush.css";
import blueCandy from '../../../assets/images/games/blue-candy.png'
import greenCandy from '../../../assets/images/games/green-candy.png'
import orangeCandy from '../../../assets/images/games/orange-candy.png'
import purpleCandy from '../../../assets/images/games/purple-candy.png'
import redCandy from '../../../assets/images/games/red-candy.png'
import yellowCandy from '../../../assets/images/games/yellow-candy.png'
import blank from '../../../assets/images/games/blank.png'
import Timer from "./Timer";


export default function Candy() {
  const [boardColor, setBoardColor] = useState([]);
  const [squareDrugged, setSquareDrugged] = useState(null);
  const [squareReplace, setSquareReplace] = useState(null);
  const [score,setScore] = useState(0);
  const [toggle,setToggle] = useState(true);
  const [isRotated, setIsRotated] = useState(true);

  const colors = [blueCandy, greenCandy, orangeCandy, purpleCandy, redCandy, yellowCandy];

  const createBoard = () => {
    let newArray = [];
    for (let i = 0; i < 64; i++) {
      let random = colors[Math.floor(Math.random() * colors.length)];
      newArray.push(random);
    }
    setBoardColor(newArray);
  };

  const moveIntoSquare = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirst = firstRow.includes(i);
      if (isFirst && boardColor[i] === blank) {
        let randomNumber = Math.floor(Math.random() * colors.length);
        boardColor[i] = colors[randomNumber];
      }
      if (boardColor[i + 8] === blank) {
        boardColor[i + 8] = boardColor[i];
        boardColor[i] = blank;
      }
    }
  };

  function checkForColumnOfThree() {
    for (let i = 0; i <= 47; i++) {
      let column = [i, i + 8, i + 8 * 2];
      let decideColor = boardColor[i];
      let isBlank  = boardColor[i] === blank
      if (column.every((square) => boardColor[square] === decideColor && !isBlank)) {
        column.forEach((square) => (boardColor[square] = blank));
        setScore((score) => score + 3)
        return true;
      }
    }
  }

  function checkForRowOfThree() {
    for (let i = 0; i < 64; i++) {
      let row = [i, i + 1, i + 2];
      let decideColor = boardColor[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 30, 38, 39, 46, 47, 54, 63, 64,
      ];
      let isBlank  = boardColor[i] === blank
      if (notValid.includes(i)) continue;
      if (row.every((square) => boardColor[square] === decideColor && !isBlank)) {
        row.forEach((square) => (boardColor[square] = blank));
        setScore((score) => score + 3)
        return true;
      }
    }
  }

  function checkForColumnOfFour() {
    for (let i = 0; i <= 39; i++) {
      let column = [i, i + 8, i + 8 * 2, i + 8 * 3];
      let decideColor = boardColor[i];
      let isBlank  = boardColor[i] === blank
      if (column.every((square) => boardColor[square] === decideColor && !isBlank)) {
        column.forEach((square) => (boardColor[square] = blank));
        setScore((score) => score + 4)
        return true;
      }
    }
  }

  function checkForRowOfFour() {
    for (let i = 0; i < 64; i++) {
      let row = [i, i + 1, i + 2, i + 3];
      let decideColor = boardColor[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      let isBlank  = boardColor[i] === blank
      if (notValid.includes(i)) continue;
      if (row.every((square) => boardColor[square] === decideColor && !isBlank)) {
        row.forEach((square) => (boardColor[square] = blank));
        setScore((score) => score + 4)
        return true;
      }
    }
  }

  const dragStart = (e) => {
    setSquareDrugged(e.target);
  };

  const dragDrop = (e) => {
    setSquareReplace(e.target);
  };

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(
      squareDrugged.getAttribute('data-id')
    );
    const squareBeingReplacedId = parseInt(
      squareReplace.getAttribute('data-id')
    );

    boardColor[squareBeingReplacedId] = squareDrugged.getAttribute('src');
    boardColor[squareBeingDraggedId] = squareReplace.getAttribute('src');

    const valid = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + 8,
      squareBeingDraggedId - 8,
    ];

    const validMove = valid.includes(squareBeingReplacedId);
    if(!validMove){
      boardColor[squareBeingReplacedId] = squareReplace.getAttribute('src');
      boardColor[squareBeingDraggedId] = squareDrugged.getAttribute('src');
      setBoardColor([...boardColor]);
     return alert("Impossible move")
    }

    const colOfFour = checkForColumnOfFour();
    const rowOfFour = checkForRowOfFour();
    const colOfThree = checkForColumnOfThree();
    const rowOfThree = checkForRowOfThree();

    if (rowOfFour || rowOfThree || colOfFour || colOfThree) {
      setSquareDrugged(null);
      setSquareReplace(null);
    } else {
      alert("Impossible move")
      boardColor[squareBeingReplacedId] = squareReplace.getAttribute('src');
      boardColor[squareBeingDraggedId] = squareDrugged.getAttribute('src');
      setBoardColor([...boardColor]);
    }
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquare();
      setBoardColor([...boardColor]);
    }, 100);
    if(toggle){
      setTimeout(() => {
        setScore(0);
        setToggle(false);
      }, 800);
    }
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfFour,
    checkForRowOfThree,
    moveIntoSquare,
    boardColor,
  ]);


  useEffect(() => {
    if(isRotated){
      setTimeout(() => {
        setIsRotated(false);
      }, 10000);
    }
  },[])

  return (
    <div className="CandyCrush">
      <section className="section">
      <Timer/>
      <h2 className="score">Score:{score}</h2>
      </section>
      <section className="game">
        {boardColor.map((color, index) => (
          <img
            className="img"
            src={color}
            key={index}
            alt={color}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDragEnd={dragEnd}
            onDrop={dragDrop}
          />
        ))}
      </section> 
    </div>
  );
}
