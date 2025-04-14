import React from "react";
import { useDispatch } from "react-redux";
import auth from "../../appwrite/auth";
import logout from "../../appwrite/auth"

function LogoutBtn(){

    const dispatch =  useDispatch();
    const logoutHandler = ()=>{
        auth.logout().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button className="inline-block px-6 py-2 duration-150 hover:bg-amber-200 rounded-3xl"
        onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn;