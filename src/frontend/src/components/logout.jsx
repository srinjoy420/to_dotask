import { useEffect, useState } from "react";
import apiclint from "../../service/apiClient";
import { useNavigate } from "react-router";
function Logout(){
    const navigate=useNavigate()
    
    useEffect(()=>{
        const logoutprofile=async()=>{
            try {
                console.log("logging out");
                const data=await apiclint.logout();
                console.log("logged out",data.message);
                navigate('/login');
                
                
            } catch (error) {
                console.log("logout failed",error);
                
            }
            
           }
           logoutprofile();
    },[navigate])

}
export default Logout