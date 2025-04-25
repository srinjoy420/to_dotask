import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiclint from "../../service/apiClient";

function Getme() {
  const [profile, setProfile] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchprofile = async () => {
      try {
        console.log("fetching profile");
        const data = await apiclint.getprofile();
        console.log("profile fetched", data);
        setProfile(data.user);

        localStorage.setItem("isLoggedIn", "true");
        setSuccess(true); 

      }
      catch (err) {
        console.log("user not found", err)
      }
    }
    fetchprofile();


  }, [])
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
   
    navigate("/"); 
  };
  return (
    <div>
      <h1>Your profile</h1>
      <ul>
        <li><b>Fullname:</b> {profile?.fullname}</li>
        <li><b>Fullname:</b> {profile?.email}</li>
        <li><b>username:</b> {profile?.usename}</li>
      </ul>
      
    </div>
  )
}
export default Getme