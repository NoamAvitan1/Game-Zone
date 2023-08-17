import React from "react";
import { Link } from "react-router-dom";
//style
import "./gameCollection.css";



 
export default function GameCollection() {
  const games_collection = [
    {name:"Memory Game",link:"/memoryGame",className:"memory-game"},
    {name:"Tic Tac Toe",link:"/ticTacGame",className:"ticTac-game"},
    {name:"Roulette",link:"/rouletteGame",className:"roulette-game"},
    {name:"Sudoko",link:"/sudokuGame",className:"sudoko-game"},
    {name:"Slide Puzzle",link:"/slidePuzzleGame",className:"slide-puzzle-game"},
    {name:"Puzzle",link:"/puzzleGame",className:"puzzle-game"},
    {name:"Circles Fight",link:"/circlesFight",className:"circles-fight-game"},
    {name:"BreakOut",link:"/breakOutGame",className:"break-out-game"},
    {name:"2048 Game",link:"/2048Game",className:"game2048"},
  ];

  return (
    <div>
      <div className="GameCollection">
        {games_collection.map((game,i) => (
          <Link 
            key={i}
            to={game.link} 
            className={game.className}>
            <p>{game.name}</p>
          </Link>
        ))}
      </div>    
    </div>
  );
}
