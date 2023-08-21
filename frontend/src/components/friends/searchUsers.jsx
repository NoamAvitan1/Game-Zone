import React, { useEffect, useState, useRef } from 'react';
import './searchUsers.css';
import UsersList from './usersList';
import useUser from '../../hooks/useUser';

export default function SearchUsers() {
  const { searchUser } = useUser();
  const [users, setUsers] = useState(null);
  const searchInputRef = useRef(null);
 
  const handleInput = async () => {
    try {
      const usersSearched = await searchUser(`?name=${searchInputRef.current.value}`);
      console.log(usersSearched);
      setUsers(usersSearched);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (searchInputRef.current && searchInputRef.current.value.length > 2) {
      handleInput();
    } else {
      setUsers(null);
    }
  }, []);

  const handleClearInput = () => {
    searchInputRef.current.value = "";
    setUsers(null);
  };

  return (
    <div className='SearchUsers'>
      <h3>Search For Friends</h3>
      <input
        type="text"
        className='search-input'
        ref={searchInputRef}
        onChange={handleInput}
      />
      {users && <UsersList users={users} handleClearInput={handleClearInput}/>}
    </div>
  );
}
