//react router dom
import {createBrowserRouter , RouterProvider ,Route ,createRoutesFromElements} from 'react-router-dom'
//component routes
import React, { createContext, useEffect, useState } from 'react'
import Home from '../pages/homePage/home';
import MemoryGame from '../components/games/memoryGame/memoryGame';
import MemoryGameStart from '../components/games/memoryGame/memoryGameStart';
import NavBar from '../components/navBar/navBar';
import TicTacPc from '../components/games/ticTacToe/ticTacPc';
import SudokuGame from '../components/games/sudokuGame/sudokuGame';
import SudokuGameStart from '../components/games/sudokuGame/sudokuGameStart';
import RouletteGame from '../components/games/roulette/rouletteGame';
import SlidePuzzleGame from '../components/games/slidePuzzleGame/slidePuzzleGame';
import PuzzleGame from '../components/games/puzzleGame/puzzleGame';
import CirclesFight from '../components/games/circlesFight/circlesFight';
import useUser from '../hooks/useUser';
import Account from '../pages/account/account';
import AdminMenagment from '../pages/adminMenagment/adminMenagment';
import NotFound404 from '../pages/notFound404/NotFound404';
import ResetPassword from '../pages/resetPassword/resetPassword';
import Payment from '../pages/payment/payment';
import BreakOutGame from '../components/games/breakOutGame/breakOutGame';
import Candy from '../components/games/CandyCrush/Candy';


export const ThemeContext = createContext(null);
 
export const AppRoutes = () => {
  const { user , stayLoginUser} = useUser();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar/>}>
        <Route index element={<Home/>}/>
        <Route path='/memoryGame' element={<MemoryGame/>} />
        <Route path='/memoryGame/:name' element={<MemoryGameStart/>} />
        <Route path='/ticTacGame' element={<TicTacPc/>}/>
        <Route path='/sudokuGame' element={<SudokuGame/>} />
        <Route path='/sudokuGame/:level' element={<SudokuGameStart/>} />
        <Route path='/rouletteGame' element={<RouletteGame/>} />
        <Route path='/slidePuzzleGame' element={<SlidePuzzleGame/>} />
        <Route path='/puzzleGame' element={<PuzzleGame/>}/>
        <Route path='/circlesFight' element={<CirclesFight/>}/>
        <Route path='/breakOutGame' element={<BreakOutGame/>}/>
        <Route path='/candyCrushGame' element={<Candy/>}/> 

        <Route path='/account' element={<Account/>}/>
        <Route path='/admin' element={<AdminMenagment/>}/>
        <Route path='/resetPassword' element={<ResetPassword/>} />
        <Route path='*' element={<NotFound404/>}/>
        <Route path='payment' element={<Payment/>}/>
      </Route>
    )
  )

  useEffect(() => {
  if(!user)
    stayLoginUser();
  },[user]);


  
  const [theme, setTheme] = useState((localStorage.getItem("theme") || "light"));

  const changeTheme = () => {
    let newTheme = (theme == "light" ? "dark" : "light"); 
    localStorage.setItem("theme",newTheme);
    setTheme(newTheme);
  }



  return (
    <ThemeContext.Provider value={{theme,changeTheme}}>
      <div className='app-provider' data-theme={theme} >
          <RouterProvider router={router}/>
      </div>
    </ThemeContext.Provider>
)
}
