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
    if (a) newBoard[a.row][a.col] = 2;
    if (b) newBoard[b.row][b.col] = 2;
    setBoard(newBoard);
  };

  const checkEmpty = () => {
    for (let i = 0; i < 4; i++) if (borad[i].includes(2)) return false;
    return true;
  };

  const moveRight = () => {
    let newArr = [];
    for (let d = 0; d < 4; d++) {
      let arr = [...borad[d]];
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
            arr[k + index] = null;
          }
          index++;
        }
      }
      newArr.push(arr);
    }
    console.log(newArr);
    const a = rndCell();
    const newBoard = [...newArr];
    if (a) newBoard[a.row][a.col] = 2;
    console.log(newBoard);
    setBoard(newBoard);
  };

  const moveLeft = () => {};

  const moveDown = () => {};

  const moveUp = () => {};

  const handleKeyPress = (event) => {
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
