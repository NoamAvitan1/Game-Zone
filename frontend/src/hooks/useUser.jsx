import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { acceptFriend, addFriends, login,signUp,stayLogin, updateUser,removeFriend,logout, setError} from '../redux/features/userSlice';
import { apiGet, apiPost } from '../services/apiRequests';
import { RESET_USER_PASSWORD, USERS_LIST } from '../constants/urls';



export default function useUser() {
    const {user,loading,error,} = useSelector(store=>store.userReducer);
    const dispatch  = useDispatch();
    const loginUser = (data) => {
        dispatch(login(data));
    }
    const signUpUser = (data) =>{
      dispatch(signUp(data));
    }
    const stayLoginUser = () =>{
      dispatch(stayLogin());
    }

    const sendFriendRequest = (id) => {
      dispatch(addFriends(id));
    }

    const userLogOut = () => {
      dispatch(logout());
    }

    const searchUser = async (name , query="") => {
      try {
        const {data} = await apiGet(USERS_LIST + name + query);
        return data;
      } catch (error) {
        console.log({error});
      }
    }



    const update = async (body) => {
      dispatch(updateUser(body));
    }

    const acceptFriendRequest = async (id) => {
      dispatch(acceptFriend(id));
    }


    const updateXp = (xp) => {
      let xp_riched = user.xp ;
      let i;
      for (i = 1; i <=user.level -1; i++) {
        xp_riched -= (100 * i);  
      }
      xp_riched += xp;
      if(xp_riched < 0){
        update({level: user.level - 1,xp:user.xp - xp});
      } else if(xp_riched >= (100 * i)){
        update({level: user.level + 1,xp: user.xp + xp});
      } else {
        update({xp:xp+user.xp});
      }
    }
    const removeFriendRequest = async (id) => {
      dispatch(removeFriend(id));

    }

    const resetError = (error) => {
      dispatch(setError(error));
    }





  return {
      loading,
      user,
      error,
      signUpUser,
      loginUser,
      stayLoginUser,
      searchUser,
      sendFriendRequest,
      update,
      acceptFriendRequest,
      updateXp,
      removeFriendRequest,
      userLogOut,
      resetError
    };
  }
