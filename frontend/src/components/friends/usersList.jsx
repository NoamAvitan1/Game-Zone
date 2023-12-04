import React from 'react'
import './usersList.css';
import useUser from '../../hooks/useUser';
import ProfileImgAndLevel from '../navBar/profileImgAndLevel';
export default function UsersList({users,handleClearInput,includeSelf, reRender}) {
    const {user:{friends,_id,requests},sendFriendRequest,acceptFriendRequest,removeFriendRequest} = useUser();

  return (
      <div className='UsersList'>
        {users && users.map((user,i) => ( (user._id != _id || includeSelf) && user.name != "Deleted Account") && (
            <div className='user' key={i}>
              
              <div className="user-profile">
                <ProfileImgAndLevel user={user} />
                <p>{user.name}</p>
              </div>
              
                
                { user._id != _id  &&
                  (friends.find(friend => friend._id === user._id) 
                  ?  <button onClick={()=>{
                        removeFriendRequest(user._id);
                        handleClearInput && handleClearInput();
                        reRender && reRender();
                      }} className='remove' >REMOVE</button>   
                  :  (requests.find(request => request._id == user._id) 
                  ? <button
                    onClick={()=>{
                      acceptFriendRequest(user._id);
                      handleClearInput && handleClearInput();
                      reRender && reRender();
                    }}
                    className='pending'>ACCEPT</button> 
                  : <button 
                  onClick={()=>
                    {
                      sendFriendRequest(user._id);
                      handleClearInput && handleClearInput();
                      reRender && reRender();
                    }
                  } 
                  className={user.requests && user.requests.find(request  => request === _id ) ? 'pending' : 'add'}
                  >{user.requests && user.requests.find(request  => request === _id ) ? 'PENDING' : 'ADD'}</button> ))
                  }

            </div>))} 
      </div>
  )
}
