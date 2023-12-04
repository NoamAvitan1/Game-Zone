import React, { useEffect, useRef } from 'react'
import './breakOutGameBoard.css'
import breakOutData from './breakOutData';
import { BallMovement } from './ballMovement';
import paddle from './paddle';
import Brick from './brick';
import BrickCollision from './brickCollision';
import PaddleHit from './paddleHit';
import PlayerStats from './playerStats';
export default function BreakOutGameBoard({gameEnded , level}) {
    const canvasRef = useRef(null);
    let ballObj = {
        x: 20,
        y: 300,
        dx: 2,
        dy: 2,
        rad: 10,
        speed: 7,
      };
    let brickObj = {
        x: 0.5,
        y: 50,
        height: 20,
        density: 2,
        colors: ["red", `hsl(${Math.random() * 360},50%,50%)`],
      };
    let player = {
        lives: 5,
        score: 0,
        level: level,
      };
    let  paddleProps = {
        height: 20,
        width: 100,
        x: 100,
        color: "#1B93FA",
    };
    
    let bricks = [];
    
    const winningCheck = () =>{
        for (let index = 0; index < bricks.length ; index++)
            if (!bricks[index].broke)return false;
        
        return true;
    } 


    useEffect(()=>{
        const render = () => {
            const canvas =  canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight - 70;
            paddleProps.y = canvas.height - 30;
            
            //ballObj.speed = level * 2;
            // Assign Bricks
            let newBrickSet = Brick(level, bricks, canvas, brickObj);

            if (newBrickSet && newBrickSet.length > 0) {
                bricks = newBrickSet;
            }
            
            //draw circle
            ctx.clearRect(0 , 0 , canvas.width ,canvas.height);

            //draw player stats
            PlayerStats(ctx, player, canvas);
            

            // Display Bricks
            bricks.map((brick) => {
              return brick.draw(ctx);
            });

            // moving the ball in screen
            BallMovement(ctx,ballObj);

            //check if we won
            if (winningCheck()) gameEnded(player.score,"Good Game !");

            // check if losed
            if (player.lives <= 0){ 
              gameEnded(player.score,"Game Over");
            };


            //check if the ball touches the buttom 
            if (ballObj.y + ballObj.rad >= canvas.height){
                player.lives -= 1 ; 
                ballObj.dy *= -1 ;
                ballObj.y = canvas.height / 1.5;
                ballObj.x = canvas.width / 2 ;
            };


            //check if the ball arrived to the corners(collusion)
            if (ballObj.y - ballObj.rad <= 0)ballObj.dy *= -1;
            if (ballObj.x - ballObj.rad <= 0 || ballObj.x + ballObj.rad >= canvas.width)ballObj.dx *= -1;

            // Brick Collision
            let brickCollision;
            

            for (let i = 0; i < bricks.length; i++) {
              brickCollision = BrickCollision(ballObj, bricks[i]);
            
              if (brickCollision.hit && !bricks[i].broke) {
                if (brickCollision.axis === "X") {
                  ballObj.dx *= -1;
                  bricks[i].broke = true;
                } else if (brickCollision.axis === "Y") {
                  ballObj.dy *= -1;
                  bricks[i].broke = true;
                }
                player.score += 10;
              }
            }






            //drawing the player  
            paddle(ctx,canvas,paddleProps);

            // Paddle + Ball Collision
            PaddleHit(ballObj, paddleProps);
            


            if (player.lives > 0 && (bricks.length == 0 || !winningCheck())){
              requestAnimationFrame(render)
            }else{
              if (player.lives <= 0){ 
                gameEnded(player.score,"Game Over");
              };
              if (winningCheck()) gameEnded(player.score,"Good Game !");
            };

        }
        if (player.lives > 0 && (bricks.length == 0 || !winningCheck())){
          render()
        }else{
          if (player.lives <= 0){ 
            gameEnded(player.score,"Game Over");
          };
          if (winningCheck()) gameEnded(player.score,"Good Game !");
        };
        
      
    },[]);


  return (
    <canvas 
        ref={canvasRef} 
        onMouseMove={(event) =>
            (paddleProps.x =
              event.clientX - 50 )
        }
        onTouchMove={(event) =>
            (paddleProps.x =
              event.touches[0].clientX - 50 )}
        height={window.innerHeight - 70} 
        width={window.innerWidth} 
        className='BreakOutGameBoard' />)
}
