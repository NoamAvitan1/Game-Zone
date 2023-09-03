import React, { useEffect, useState } from "react";
import "./usersMenagment.css";
import useAdmin from "../../../hooks/useAdmin";
import UsersTable from "./usersTable";
import UsersSortNav from "./usersSortNav";
import SkeletonElement from '../../../components/reusfullComponents/skeletons/skeletonElement';

export default function UsersMenagment() {
  const [users, setUsers] = useState(null);
  const [loading , setLoading] = useState(true);
  const [error , setError] = useState(null);
  const { adminGetUsers} = useAdmin();
  const getUsers = async (sortObj) => {
    try {
      const data = await adminGetUsers(sortObj);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="UsersMenagment">
      { users  &&  <UsersSortNav handleSort={getUsers} />}
      { users 
        ? <UsersTable users={users} />
        : 
          <div className="UsersMenagment-skeleton">
            { loading 
                ? <SkeletonElement type={"fit"} />
                : <p>{error}</p>
            }
          </div>
        } 
    </div>
  );
}

/*
              <div className="mobile-table-container" key={i}>
                <h3>
                  {u.name}{""}
                  {u.role == "admin" && <span className="role">(admin)</span>}
                </h3>
                <h5>{u._id}</h5>
                <div className="mobile-table-item">
                  <p className="field">Email:</p>
                  <p>{u.email}</p>
                </div>
                <div className="mobile-table-item">
                  <p className="field">Level:</p>
                  <p>{u.level}</p>
                </div>
                <div className="mobile-table-item">
                  <p className="field">Total XP:</p>
                  <p>{u.xp}</p>
                </div>
              </div>
*/