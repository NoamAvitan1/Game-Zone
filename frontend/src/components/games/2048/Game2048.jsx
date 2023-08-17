import React, { useState, useEffect } from "react";
import "./Game2048.css";
import EndedGameAllert from "../../reusfullComponents/endedGameAllert/endedGameAllert";
import useUser from "../../../hooks/useUser";
export const Game2048 = () => {
  const [board, setBoard] = useState(
    Array(4)
      .fill(null)
      .map(() => Array(4).fill(null))
  );
  const [score, setScore] = useState(0);
  const [winner, setWinner] = useState(false);
  const [failed, setFailed] = useState(false);
  const [gameDone, setGameDone] = useState(null);
  const { user, updateXp } = useUser();

  const points = () => {
    let max = score;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] > max) {
          setScore(board[i][j]);
        }
      }
    }
  };


  const checkFailed = () => {
    let flag = true;
    for(let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length-1; j++){
          if(!((board[j+1][i] != 0 && board[j][i] != null) && board[j][i] != board[j+1][i])){
              flag = false;
          }
          if(!((board[i][j+1] != 0 && board[i][j] != null) && board[i][j] != board[i][j+1])){
              flag = false;
          }
      }
  }
     return flag;
  } 

  const reset = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = null;
      }
    }
    setFailed(false);
    setScore(0);
    fillCells();
  };

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
    if (empty) b = rndCell(a);
    const newBoard = [...board];
    if (a) newBoard[a.row][a.col] = 2;
    if (empty && b) newBoard[b.row][b.col] = 2;
    setBoard(newBoard);
  };

  const checkWinner = () => {
    for (let i = 0; i < 4; i++) {
      if (board[i].includes(2048)) {
        return true;
      }
      return false;
    }
  };

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
            arr[k + index] = null;
          }
          index++;
        }
      }
      newArr.push(arr);
    }
    setBoard(newArr);
    fillCells(false);
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
    for (let i = 0; i < 4; i++) {
      for (let d = 0; d < 3; d++) {
        index = 0;
        for (let j = 0, k = 2 - d; j < d + 1; j++) {
          if (arr[k + 1 + index][i] == null && arr[k + index][i] != null) {
            arr[k + 1 + index][i] = arr[k + index][i];
            arr[k + index][i] = null;
          }
          if (
            arr[k + 1 + index][i] == arr[k + index][i] &&
            arr[k + index][i] != null
          ) {
            arr[k + 1 + index][i] = arr[k + index][i] + arr[k + index][i];
            arr[k + index][i] = null;
          }
          index++;
        }
      }
    }
    setBoard(arr);
    fillCells(false);
  };

  const moveUp = () => {
    let arr = [...board];
    let index;
    for (let i = 0; i < 4; i++) {
      for (let d = 0; d < 3; d++) {
        index = 0;
        for (let j = 0, k = 1 + d; j < d + 1; j++) {
          index = Math.abs(index);
          if (arr[k - 1 - index][i] == null && arr[k - index][i] != null) {
            arr[k - 1 - index][i] = arr[k - index][i];
            arr[k - index][i] = null;
          }
          if (
            arr[k - 1 - index][i] == arr[k - index][i] &&
            arr[k - index][i] != null
          ) {
            arr[k - 1 - index][i] = arr[k - index][i] + arr[k - index][i];
            arr[k - index][i] = null;
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
    if (winner) {
      return;
    }

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

  const handletouch = (start , end ) => {
    let moveX = start.x - end.x;
    let moveY = start.y - end.y;

    if (Math.abs(moveX) > Math.abs(moveY)) {
      return moveX > 0 ? moveLeft() : moveRight()
    } else {
      return moveY > 0 ? moveUp() : moveDown()
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyPress(event);
    };
    window.addEventListener("keydown", handleKeyDown);
    
    let start;
    window.addEventListener('touchstart' ,(e) => 
      start = {x:e.changedTouches[0].clientX , y:e.changedTouches[0].clientY}
    );
    window.addEventListener('touchend' ,(e) => {
      handletouch(start , {x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY});
    });


    return () => {
      //window.removeEventListener('touchend',)
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  useEffect(() => {
    fillCells();
  }, []);

  useEffect(() => {
    if (checkWinner()) {
      if (user) updateXp(score);
      setGameDone(
        <EndedGameAllert
          message={"Good Game"}
          xp={score}
          restart={() => {
            reset();
            setGameDone(null);
          }}
        />
      );
      setWinner(true);
    }

    if (failed)
      setGameDone(
        <EndedGameAllert
          message={"Good Game"}
          xp={score}
          restart={() => {
            reset();
            setGameDone(null);
          }}
        />
      );
  }, [score,failed]);


  useEffect(() => {
     if(checkFailed()){
      setFailed(true)
    }
      points();
  },[board])

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
            <div
              key={i}
              className="div"
              style={{
                backgroundColor: c
                  ? `hsl(${(c * 10) % 360},50%,50%)`
                  : "var(--light-bg)",
              }}
            >
              {c}
            </div>
          ))
        )}
      </section>
      <div>
        <button onClick={() => reset()} className="reset">
          Reset
        </button>
      </div>
    </div>
  );
};
