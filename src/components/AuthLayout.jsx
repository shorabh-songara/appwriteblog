import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AuthLayout({children , authentication=true}){

    const navigate = useNavigate();
    const [loader , setLoader] = useState(true);
    const authstatus = useSelector((state) => state.auth.status);

    useEffect(()=>{
        if (authentication && authstatus !== authentication ) {
            navigate("/Login")
        }else if(!authentication && authstatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authstatus , authentication , navigate])
    return(
        <div>

        </div>
    )
}
export default AuthLayout;