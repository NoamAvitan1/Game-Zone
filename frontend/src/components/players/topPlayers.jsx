import React, { useEffect, useState } from 'react'
import './topPlayers.css';
import UsersList from '../friends/usersList';
import useUser from '../../hooks/useUser';
export default function TopPlayers() {
    const [ topAmount ,  setTopAmount ] = useState(10);
    const [ players , setPlayers ] = useState(null);
    const {searchUser} = useUser();
    const getTopPlayers = async () => {
        try {
            const players = await searchUser("",`?limit=${topAmount}&sort=xp`);
            setPlayers(players);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getTopPlayers();
    },[topAmount]);
    console.log(players);
  return (
    <div className='TopPlayers'>
        <h2 className='TopPlayers-title'>Top Players</h2>
        <div className="TopPlayers-nav">
            {[10,30,50].map((amount,key)=>(
                <button
                    key={key}
                    className={`TopPlayers-nav-button${topAmount == amount ? " selectedA" : ""}`}
                    > {amount}
                </button>
            ))}
        </div>
        {players ? 
            <div className="playersList">
                <div className="places">
                    {Array(players.length).fill(0).map((_,place)=>(
                        <div className="place">{place}</div>
                    ))}
                </div>
                <UsersList users={players} />
            </div>
            : <div className="">loading</div>
        }
        
    </div>
  )
}
