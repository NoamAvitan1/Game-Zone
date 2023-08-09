import React, { useState ,useContext} from "react";
import { Outlet } from "react-router-dom";

//hooks
import { useModal } from "../../hooks/useModal";
import useUser from "../../hooks/useUser";

//components
import Logo from './logo'
import ProfileImgAndLevel from "./profileImgAndLevel";
import LogInButton from "./logInButton";
import UserDropDownMenu from "./userDropDownMenu";

//style
import "./navBar.css";
import { ThemeContext } from "../../routes/appRoutes";
import SwichTheme from "./swichTheme";





export default function NavBar() {
  const [open_user_menu,setOpenUserMenu] = useState(false);
  const {user , resetError} = useUser(); 
  const [modal,setModal] = useState(null);
  const { theme, changeTheme } = useContext(ThemeContext);

  const closeModal = () => {
      setModal(null);
      resetError(null);
  }
  const getModal = (content) => {
    const modalContent = useModal(content,closeModal);
    setModal(modalContent);
  }

  return (
    <div className="NavBar" >
      {modal && modal}
      <div className="header">
        <Logo/>
        <div className="right-nav">
          <SwichTheme changeTheme={changeTheme}/>
        {user
          ? 
          <div>
            <ProfileImgAndLevel user={user} openUserMenu={()=>setOpenUserMenu(!open_user_menu)} />
            { open_user_menu && 
                <div className="account-dropdown">
                  <UserDropDownMenu closeMenu={()=>setOpenUserMenu(false)} getModal={getModal} user={user}/>
                </div>
            }
          </div> 
          : <LogInButton closeModal={closeModal} updateModal={getModal}/> }
        </div>
      </div>
      <main>
        <Outlet /> 
        
      </main>
    </div>
  );
}
