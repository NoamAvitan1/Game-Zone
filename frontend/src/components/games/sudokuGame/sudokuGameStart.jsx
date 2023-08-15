import React, { useEffect, useState } from 'react'
import useSudoku from '../../../hooks/useSudoku';
import {useParams} from 'react-router-dom'
import './sudokuGameStart.css'
import useUser from '../../../hooks/useUser';
import NavBackButton from '../../reusfullComponents/navigateBackButton/navBackButton';
import EndedGameAllert from '../../reusfullComponents/endedGameAllert/endedGameAllert'

export default function SudokuGameStart() {
    const {currentSudoku , sudokuLevels} = useSudoku();
    const [template,setTemplete] = useState(null);
    const [wrongNumber,setWrongNumber] = useState(null);
    const [disable,setDisable] = useState(false);
    const {level} = useParams();
    const {user,updateXp} = useUser();
    const [gameDone,setGameDone] = useState(null);

    const checkRow = (row , col)=>{
        for(let i=0;i<row.length;i++)
            if(row[i] == row[col] && col != i)
                return false;
        return true;
    }

    const checkCol = (template,col , row) => {
        for(let i=0;i < template[0].length;i++)
            if(template[i][col] == template[row][col] && row != i)
                return false;
        return true;
    }

    const checkBox = (template , row , col) => {
        let startRow = row - (row % 3);
        let startCol = col - (col % 3);
        //check Box
        for(let i = startRow ; i <= startRow + 2 ; i++)
            for(let j = startCol; j <= startCol + 2 ; j++)
                if(template[i][j] == template[row][col] && (i != row && j != col ))
                    return false;
        return true;
    }

    const checkSudoku = (template,row,col) => {
        return checkRow(template[row],col) && checkCol(template,col,row) && checkBox(template,row,col);     
    }

    const checkWinningSudoku = () => {
        for (let i = 0; i < 9 ; i++) 
            if(template[i].includes(0)) return false;
        
        return true;
    }

    
    const hundleChange = (row,col,val) => {
        // disable the user from continue play
        setDisable(true);
        const newTmp = [...template.map((rowArr) => [...rowArr])];
        newTmp[row][col] = val;
        setTemplete(newTmp);
        if (checkSudoku(newTmp,row,col)) {
            if(checkWinningSudoku()){
                let revard ;
                let message ;
                for (const levelObj of sudokuLevels)
                    if(levelObj.level == level) revard = levelObj.revard;
                
                if (user) { 
                    updateXp(revard);
                    message = "Good Solve!";
                } else {
                    message = "Good Solve! log in to get the revard";
                }

                setGameDone(
                    <EndedGameAllert 
                    message={message} 
                    xp={revard} 
                    restart={()=>{
                        setTemplete(currentSudoku);
                        setWrongNumber(null);
                        setDisable(false);
                        setGameDone(null);
                }} />);
            }
            setDisable(false);
        } else {
            setWrongNumber(val);
        }
    }

    useEffect(()=>{
        if (currentSudoku) {
            setTemplete(currentSudoku);
        }
    },[currentSudoku])



  return ( 
    <div className='SudokuGameStart'>
        <NavBackButton className="navBack"/>
        <h2>sudokuGame</h2>
        <div className="sudoku-grid" >
        {template && template.map((row,i)=>( 
            row.map((col,j)=>
                (
                <input 
                    disabled={disable || col > 0} 
                    value={col > 0 ? col : ''}
                    className={`
                    ${(j % 3) == 2 ? "border-right" : ""}
                    ${(i % 3) == 2 ? "border-bottom" : ""}
                    ${wrongNumber == col ? "wrong-number" : "" }
                    ${currentSudoku[i][j] == col && col > 0 ? `exist-${level}` : ""}`}
                    onChange={(e)=>hundleChange(i,j,parseInt(e.target.value))}
                    type="text" 
                    key={j}  />)
            )
        ))}
        </div>
        <button 
            onClick={()=>{
                setTemplete(currentSudoku);
                setWrongNumber(null);
                setDisable(false);
            }}
            className='reset-sudoku'
            > Reset
        </button>
        {gameDone && gameDone}
    </div>
  )
}
