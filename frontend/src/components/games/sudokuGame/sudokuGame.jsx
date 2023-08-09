import React from 'react'
import { useNavigate } from 'react-router-dom';

import useSudoku from '../../../hooks/useSudoku';

import SudokuGameNav from './sudokuGameNav';
import SudokuCollection from './sudokuCollection';
import NavBackButton from '../../reusfullComponents/navigateBackButton/navBackButton'

import './sudokuGame.css'
import Pagination from '../../reusfullComponents/pagination/pagination';

export default function SudokuGame() {
    const {setSudokuTemplate,pages,page,selectPage} = useSudoku();
    const navigate = useNavigate();

  return ( 
    <div className='SudokuGame'>
      <NavBackButton className="navBack" />
        <h2>sudokuGame</h2>
        <SudokuGameNav />
        <SudokuCollection
          handleClick={(sudoku)=>{
            setSudokuTemplate(sudoku.template);
            navigate(`/sudokuGame/${sudoku.level}`);
        }} />
        {pages && <div className='pagination'>
        <Pagination page={page} setPage={selectPage} pages={pages} /> </div>}

    </div>
  )
}
