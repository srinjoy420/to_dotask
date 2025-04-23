import { useState } from "react";
import apiclint from "../../service/apiClient";
import { useNavigate } from "react-router";

function Singup() {
    const [fullname, setfullName] = useState("")
    const [usename, setuselName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const [loading, setLoading] = useState(false)
    const [error, SetError] = useState("")
    //for navigation(one url to another url)
    const navigate=useNavigate()

    const handelSubmit= async (e)=>{
        e.preventDefault();
        setLoading(true);
        SetError('');

        try{
            console.log("trying to do a singup");
           const data=await apiclint.singup(fullname,usename,email,password)
           console.log("singup response:",data);
           //for navigation
           if(data.success){
            navigate('/login')

           }
           else{
            SetError(data.message || "singup failed")
           }
           
           
            
        }
        catch(error){
            // SetError(error)
            console.log("dont singup the response");
            

        }
        finally{
            setLoading(false)
        }

        //make an API call to backend with data
        //get response from backend
        //take action based on response


    }
    return (
        <div className="singup">
            <h1>Welcome to singup page</h1>
            <form onSubmit={handelSubmit}>
                <div className="from-group">
                    <label htmlFor="fullname">fullName:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={fullname}
                        onChange={(e) => setfullName(e.target.value)}
                        required
                    />
                </div>
                {/* usename */}
                <div className="from-group">
                    <label htmlFor="usename">usename:</label>
                    <input
                        type="text"
                        name="name"
                        id="ename"
                        value={usename}
                        onChange={(e) => setuselName(e.target.value)}
                        required
                    />
                </div>
                {/* email */}
                <div className="from-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* password */}
                <div className="from-group">
                    <label htmlFor="password">password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}> {loading ? 'Singup...' : 'Singup'}</button> 
               {error && <p style={{color:"red"}}>sorry dont register </p>}
            </form>
        </div>
    )
}

export default Singup;