import React, { useState, useEffect } from "react";
import './Game.css'

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

  useEffect(() => {
    fillCells();
  }, []);

  return (
    <div className="Game">
      <section className="grid">
        {borad.map((r) => r.map((c) => <div className="div">{c}</div>))}
      </section>
</div>
);
};