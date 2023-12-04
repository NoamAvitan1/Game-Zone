import React, { useState } from 'react'
import SudokuInputTemplate from './sudokuInputTemplate'
import './addSudokuTemplate.css'
import useSudoku from '../../../../hooks/useSudoku';
import DefineSudokuLevel from './defineSudokuLevel';
export default function AddSudokuTemplate({closeModal}) {
  const [template,setTemplate] = useState([
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ]);
  const [level,setLevel] = useState(null);
  const [error,setError] = useState(null);
  const {addSudokuTemplate,getSudokuTemolates} = useSudoku();
  const handleAddTemplate = async () =>{
    try {
      if (!level) {throw Error("level is required !")}
      const {data} = await addSudokuTemplate({
        template,
        level
      });
      if (data) {
        closeModal();
        getSudokuTemolates();
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    
    <div className='AddSudokuTemplate'>
        <h2>ADD Sudoku Template</h2>
        <div className="level-options">
          <DefineSudokuLevel setLevel={setLevel} level={level} />
        </div>
        {error && <p className='error'>{error}</p> }
        <SudokuInputTemplate template={template} handleClick={(template)=>setTemplate(template)} />
        <div className="add-button">
          <button onClick={()=>{
            handleAddTemplate();
          }}>ADD</button>
        </div>
    </div>
  )
}
