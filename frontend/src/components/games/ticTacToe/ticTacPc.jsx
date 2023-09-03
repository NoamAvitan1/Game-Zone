import React, { useEffect, useState } from "react";
import "./ticTacPc.css";
import useUser from "../../../hooks/useUser";
import SelectLevel from "../../reusfullComponents/selectLevel/selectLevel";
import NavBackButton from "../../reusfullComponents/navigateBackButton/navBackButton";
import EndedGameAllert from "../../reusfullComponents/endedGameAllert/endedGameAllert";

export default function TicTacPc() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [move, setMove] = useState("X");
  const [round, setRound] = useState(0);
  const [winner, setWinner] = useState(null);
  const [toggle, setToggle] = useState(true);
  const { user, updateXp } = useUser();
  const [level, setLevel] = useState(null);
  const [gameDone,setGameDone] = useState(null);
  const revards = {
    easy:100,
    medium:200,
    hard:300
  }

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setToggle(true);
    setRound(0);
    setMove("X"); // Reset the move to "X"
  };

  const [winConditions] = useState([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]);

  const opposite = () => {
    return move === "X" ? "O" : "X";
  };

  const checkWinner = () => {
    let check = "O";
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (board[a] === check && board[b] === check && board[c] === check) {
          setWinner(check);
          
            if (check === "X") {
              if (user) {
                updateXp(revards[level]);
                setGameDone(<EndedGameAllert message={"Good Game!"} xp={revards[level]} restart={()=>{reset(); setGameDone(null);}} />);
            } else {
              setGameDone(<EndedGameAllert message={"Good Game! log in to get the revard"} xp={revards[level]} restart={()=>{reset(); setGameDone(null);}} />);
            }
          }
          setToggle(false);
          return true;
        }
      }
      check = "X";
    }
    if (board.every((cell) => cell !== null)) {
      setWinner("draw");
      setToggle(false);
      return true;
      
    }
    return false;
  };

  const starterMove = () => {
    const indexes = board.filter((square, i) => square !== null);
    let rnd = Math.floor(Math.random() * 9);

    if (indexes.length === 0) {
      setBoard((prev) => prev.map((square, i) => (i === rnd ? move : square)));
      return true;
    }

    if (indexes.length === 1) {
      while (board[rnd] !== null) {
        rnd = Math.floor(Math.random() * 9);
      }
      setBoard((prev) => prev.map((square, i) => (i === rnd ? move : square)));
      return true;
    }

    return false;
  };

  const win = () => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        (board[a] === move && board[b] === move && board[c] === null) ||
        (board[a] === move && board[b] === null && board[c] === move) ||
        (board[a] === null && board[b] === move && board[c] === move)
      ) {
        setBoard((prev) =>
          prev.map((x, i) => (i === a || i === b || i === c ? move : x))
        );
        return true;
      }
    }
    return false;
  };

  const blockUser = () => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (
        board[a] === opposite() &&
        board[b] === opposite() &&
        board[c] === null
      ) {
        setBoard((prev) => prev.map((x, i) => (i === c ? move : x)));
        return true;
      } else if (
        board[a] === opposite() &&
        board[b] === null &&
        board[c] === opposite()
      ) {
        setBoard((prev) => prev.map((x, i) => (i === b ? move : x)));
        return true;
      } else if (
        board[a] === null &&
        board[b] === opposite() &&
        board[c] === opposite()
      ) {
        setBoard((prev) => prev.map((x, i) => (i === a ? move : x)));
        return true;
      }
    }
    return false;
  };

  const advance = () => {
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      const line = [board[a], board[b], board[c]];
  
      // Count 'X' and 'O' occurrences
      const xCount = line.filter((cell) => cell === 'X').length;
      const oCount = line.filter((cell) => cell === 'O').length;
  
      // If there are 2 'X' and 1 'O', find the empty cell and place 'O'
      if (xCount === 2 && oCount === 1) {
        const emptyCellIndex = line.indexOf(null);
        if (emptyCellIndex !== -1) {
          const [newA, newB, newC] = winConditions[i];
          setBoard((prev) =>
            prev.map((x, index) => {
              if (index === newA || index === newB || index === newC) {
                return move;
              }
              return x;
            })
          );
          return true;
        }
      }
    }
    return false;
  };
  

  const randomMove = () => {
    let emptyCells = board.reduce(
      (cells, cell, index) => (cell === null ? cells.concat(index) : cells),
      []
    );

    if (emptyCells.length > 0) {
      let rnd = Math.floor(Math.random() * emptyCells.length);
      let randomIndex = emptyCells[rnd];
      setBoard((prev) =>
        prev.map((x, i) => (i === randomIndex && x === null ? move : x))
      );
    }
  };

  const makeComputerMove = () => {
    if (!toggle) return;
    setTimeout(() => {
      if (level === "hard") {
        if (!toggle) return;
        if (!starterMove())
        if (!win())
        if (!blockUser())
        if (!advance())
         randomMove();
      }
      if(level === "medium") {
        if (!toggle) return;
        if (!starterMove())
        if (!win())
        if (!advance())
        randomMove();
      }
      if (level === "easy") {
        if (!toggle) return;
        if (!starterMove())
         randomMove();
      }
      setMove(opposite());
      setRound(round + 1);
    }, 1000);
  };

  useEffect(() => {
    if (!checkWinner()) {
      if (move === "O" && toggle) { 
        makeComputerMove();
      }
    } else {
      setRound(0);
    }
  }, [board, move, round, toggle]);

  
  const doMove = (index) => {
    if (winner !== null || board[index] !== null || move !== "X") return; 
  
    setBoard((prev) => prev.map((x, i) => (i === index ? move : x)));
    setMove((prev) => (prev === "X" ? "O" : "X"));
    setRound(round + 1);
  };
  return (
    <div className="TicTacPc">
      <div style={{fontSize:'40px'}} className="icon">
      <NavBackButton className="navBack" />
      </div>
      {level ? (
        <div className="game">
          <div className={`board ${toggle ? "" : "disabled"}`}>
            {board.map((cell, index) => (
              <div key={index} className="cell" onClick={() => doMove(index)}>
                {cell}
              </div>
            ))}
          </div>
          {winner && <div className="winner">Winner: {winner}</div>}
          <button onClick={() => reset()} className="button">
            reset
          </button>
        </div>
      ) : (
        <div className="choose-level">
        <SelectLevel
          options={["easy", "medium", "hard"]}
          handleChoice={(option) => setLevel(option)}
        />
        </div>
      )}
      {gameDone && gameDone}
    </div>
  );
}
