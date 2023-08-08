import React, { useEffect, useState } from "react";
import "./CandyCrush.css";

export default function Candy() {
  const [boardColor, setBoardColor] = useState([]);
  const [squareDrugged, setSquareDrugged] = useState(null);
  const [squareReplace, setSquareReplace] = useState(null);
  const [score,setScore] = useState(0);

  const colors = ["blue", "green", "orange", "purple", "red", "yellow"];

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
      if (isFirst && boardColor[i] === "") {
        let randomNumber = Math.floor(Math.random() * colors.length);
        boardColor[i] = colors[randomNumber];
      }
      if (boardColor[i + 8] === "") {
        boardColor[i + 8] = boardColor[i];
        boardColor[i] = "";
      }
    }
  };

  function checkForColumnOfThree() {
    for (let i = 0; i <= 47; i++) {
      let column = [i, i + 8, i + 8 * 2];
      let decideColor = boardColor[i];
      if (column.every((square) => boardColor[square] === decideColor)) {
        column.forEach((square) => (boardColor[square] = ""));
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
      if (notValid.includes(i)) continue;
      if (row.every((square) => boardColor[square] === decideColor)) {
        row.forEach((square) => (boardColor[square] = ""));
        setScore((score) => score + 3)
        return true;
      }
    }
  }

  function checkForColumnOfFour() {
    for (let i = 0; i <= 39; i++) {
      let column = [i, i + 8, i + 8 * 2, i + 8 * 3];
      let decideColor = boardColor[i];
      if (column.every((square) => boardColor[square] === decideColor)) {
        column.forEach((square) => (boardColor[square] = ""));
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
      if (notValid.includes(i)) continue;
      if (row.every((square) => boardColor[square] === decideColor)) {
        row.forEach((square) => (boardColor[square] = ""));
        setScore((score) => score + 4)
        return true;
      }
    }
  }

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
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForColumnOfThree,
    checkForRowOfFour,
    checkForRowOfThree,
    moveIntoSquare,
    boardColor,
  ]);

  const dragStart = (e) => {
    setSquareDrugged(e.target);
  };

  const dragDrop = (e) => {
    setSquareReplace(e.target);
  };

  const dragEnd = (e) => {
    const squareBeingDraggedId = parseInt(
      squareDrugged.getAttribute('data-id')
    );
    const squareBeingReplacedId = parseInt(
      squareReplace.getAttribute('data-id')
    );

    boardColor[squareBeingReplacedId] = squareDrugged.style.backgroundColor;
    boardColor[squareBeingDraggedId] = squareReplace.style.backgroundColor;

    const valid = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + 8,
      squareBeingDraggedId - 8,
    ];

    const validMove = valid.includes(squareBeingReplacedId);

    const colOfFour = checkForColumnOfFour();
    const rowOfFour = checkForRowOfFour();
    const colOfThree = checkForColumnOfThree();
    const rowOfThree = checkForRowOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (rowOfFour || rowOfThree || colOfFour || colOfThree)
    ) {
      setSquareDrugged(null);
      setSquareReplace(null);
    } else {
      alert("Impossible move")
      boardColor[squareBeingReplacedId] = squareReplace.style.backgroundColor;
      boardColor[squareBeingDraggedId] = squareDrugged.style.backgroundColor;
      setBoardColor([...boardColor]);
    }
  };

  return (
    <div className="CandyCrush">
      <div className="game">
        {boardColor.map((color, index) => (
          <img
            className="img"
            key={index}
            style={{ backgroundColor: color }}
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
      </div>
      <h2 className="score">Score:{score}</h2>
    </div>
  );
}
