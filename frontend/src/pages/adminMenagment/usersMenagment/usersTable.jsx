import React, { useEffect, useState } from 'react'
import './usersTable.css';
import {  AiOutlinePlus , AiFillEdit ,AiFillDelete} from 'react-icons/ai';
import { useModal } from '../../../hooks/useModal';
import EditUser from './editUser';
import useAdmin from '../../../hooks/useAdmin'
export default function UsersTable({users}) {
  //const [actions_menu,setActionsMenu] = useState(false);
    const {adminDeleteUsers} = useAdmin();
  const [show_actions_menu,setShowActionsMenu] = useState(-1);

  const [modal,setModal] = useState(null);
  const actions_menu = [
    {name:<AiFillEdit/>,action:(u)=>getModal(<EditUser user={u} closeModal={()=>{
      setModal(null);
    }}/>)},
    {name:<AiFillDelete/>,action:(u)=>deleteUser(u)}
  ]

  const deleteUser = (content) => {
    adminDeleteUsers(content._id);
  }

  const getModal = (content) => {
    const m = useModal(content,()=>setModal(null));
    setModal(m);
  }

  return (
<div className='UsersTable'>
  {modal && modal}
    <div className="wrapper">
      <div className="table" >
                  <div className="row header">
                    <div className="cell">Name</div>
                    <div className="cell">Email</div>
                    <div className="cell">Level</div>
                    <div className="cell">XP</div>
                    <div className="cell">_id</div>
                    <div className="cell">Edit</div>
                  </div>
        {users.map((u, i) => (

                  <div className="row" key={i}>
                    <div className="cell" data-title="Name">
                      {u.name}
                    </div>
                    <div className="cell" data-title="Email">
                      {u.email}
                    </div>
                    <div className="cell" data-title="Level">
                      {u.level}
                    </div>
                    <div className="cell" data-title="XP">
                      {u.xp}
                    </div>
                    <div className="cell" data-title="_id">
                      {u._id}
                    </div>
                    <div className={`cell edit-cell ${ (show_actions_menu > -1 ? "menu-opened" : "")}`} data-title="">
                        <AiOutlinePlus onClick={()=>setShowActionsMenu((i == show_actions_menu ? -1 : i))} className='edit-cell-icon'/>
                        {show_actions_menu == i && 
                        <div className="actions-container"> {  actions_menu.map((action,i)=>(
                            <div 
                              onClick={() => action.action(u)}
                              className={`action-item-${i}`} key={i}  >
                              {action.name}
                            </div>
                        ))} 
                        </div>}
                    </div>
                  </div>


        ))}
      </div>
    </div>
</div>
  )
}
